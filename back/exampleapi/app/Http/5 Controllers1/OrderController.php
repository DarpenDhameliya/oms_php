<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Website;
use App\Models\Courier;
use App\Models\Product;
use App\Models\OrderEntry;
use App\Models\Wallet_transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Session;
use Illuminate\Support\Facades\DB;
use App\Imports\OrderImport;
use Maatwebsite\Excel\Facades\Excel;
use File;




class OrderController extends Controller
{
	public function orderentry(Request $request){
		if(Auth::check()){
			session()->put('mainmenu',"Order_Entry");
			$website_list = Website::select()->where('user_id', Auth::user()->id)->get();
			$courier_list = Courier::select()->where('user_id', Auth::user()->id)->get();
			$product_list = Product::select('gst.gst_no','unit.unit','product.*')->join('gst', 'gst.id', '=', 'product.gst_id')->join('unit', 'unit.id', '=', 'product.unit_id')->where('user_id',Auth::user()->id)->get();
			$order_status = \Config::get('data.order_status');
			$order_type = \Config::get('data.order_type');

		 	return view('fronted.order-entry',compact('website_list','courier_list','product_list','order_status','order_type'));
		}
        return redirect("login");
	}

	public function insert_orderentry(Request $request){
		if(Auth::check()){
			session()->put('mainmenu',"Order_Entry");
			$request->validate([
	            'website' =>'required',
	            'order_id' =>'required|unique:order',
	            'product' =>'required',
	            'qty' =>'required', 
	            'order_amount'=>'required'   
	        ]);

	        $order = new OrderEntry;
	        $order->website_id = $request->input('website');  
	        $order->order_id = $request->input('order_id');    
	        $order->product_id = $request->input('product');  
	        $order->qty = $request->input('qty'); 
	        $order->courier_id = $request->input('courier');  
	        $order->awb_no = $request->input('awb');  
	        $order->order_amount = $request->input('order_amount');    
	        $order->order_type = $request->input('order_type');  
	        $order->order_status = $request->input('order_status');      
	        $order->upload_type = 'manual'; 
	        $order->note = $request->input('note');
	        $order->user_id = Auth::user()->id;
	        $order->save();

            $transaction = new Wallet_transaction;
            $transaction->order_id = $request->input('order_id'); 
            $transaction->user_id = Auth::user()->id ; 
            $transaction->main_charge = Auth::user()->charge ; 
            $transaction->opening_balance = Auth::user()->wallet_balance; 
            $transaction->total_charge = Auth::user()->charge;    
            $transaction->closing_balance =Auth::user()->wallet_balance - Auth::user()->charge; 
            $transaction->type = 'manual';    
            $transaction->save();

            User::where('id',Auth::user()->id)->update(array('wallet_balance' => Auth::user()->wallet_balance - Auth::user()->charge));
	        return redirect()->intended('orderEntry')->withSuccess('Order Save Successfully.');;
		}
        return redirect("login");
	}

	

	public function orderDetail(){
		if(Auth::check()){
			session()->put('mainmenu',"Order_Detail");
			return view('fronted.order-detail');
		}
        return redirect("login");
	}

	public function getorder_detail(Request $request){
		if(Auth::check()){

			$request->validate([
            	'order_id' => 'required',
        	]);


			$order_id = $request->input('order_id');

			$order_status = \Config::get('data.order_status');
			$order_type = \Config::get('data.order_type');


			if(!empty($order_id)){
                $query = OrderEntry::select('*')
                      ->where('user_id',Auth::user()->id)
                      ->where('order_id','=',$order_id)
                      ->orwhere('awb_no','=',$order_id)
                      ->get();
	            if(!sizeof($query)){
	                  return redirect("orderDetail")->with('error','OrderId or AWB Not available.'); 
	            }else{
	               $order_id = $request->input('order_id');
	                $result = OrderEntry::select('order.*','courier.name as courier_name','website.name as website_name','product.name as product_name')->join('courier', 'courier.id', '=', 'order.courier_id','left')
                                ->join('website', 'website.id', '=', 'order.website_id')
                                ->join('product', 'product.id', '=', 'order.product_id')
                                ->where('order.user_id',Auth::user()->id)
                               	-> where(function ($query) use ($order_id) {
                                    if(!empty($order_id)){
                                       $query->orWhere('order.order_id', '=', $order_id);
                                        $query->orwhere('order.awb_no', '=', $order_id);
                                    }
                                })->get();




                    if(!sizeof($result)){
                        return redirect("orderDetail")->with('error','Data Not available.'); 
                    }else{
                        $result = $result;
                    }  

                    foreach ($result as $key) {
                        if(!empty($key['order_type'])){
                        	foreach ($order_type as $k ) {
                        		if($key['order_type']==$k['value']){
                        			$o_t= $k['label'];
                        		}
                        	}
                        }else{
                            $o_t= "";
                        }

                        if(!empty($key['order_status'])){
                        	foreach ($order_status as $os ) {
                        		if($key['order_status']==$os['value']){
                        			$o_s= $os['label'];
                        		}
                        	}
                        }else{
                            $o_s= "";
                        }

                        $main[]= array(
                            "o_id"=> $key['o_id'], 
                            "upload_date"=> $key['upload_date'], 
                            "website_id"=> $key['website_id'], 
                            "order_id"=> $key['order_id'], 
                            "product_id"=> $key['product_id'], 
                            "qty"=> $key['qty'], 
                            "courier_id"=> $key['courier_id'], 
                            "awb_no"=> $key['awb_no'], 
                            "dispatch_date"=> $key['dispatch_date'], 
                            "order_amount"=> $key['order_amount'], 
                            "order_type"=> $o_t, 
                            "order_status"=> $o_s, 
                            "return_received_date"=> $key['return_received_date'], 
                            "uploaded_taskid"=> $key['uploaded_taskid'], 
                            "upload_type"=> $key['upload_type'], 
                            "return_reason"=> $key['return_reason'], 
                            "note"=> $key['note'], 
                            "user_id"=> $key['user_id'], 
                            "created_at"=>$key['created_at'],
                            "order_date"=> date_format(date_create($key['created_at']),"d-m-Y"), 
                            "updated_at"=> $key['updated_at'], 
                            "courier_name"=> $key['courier_name'], 
                            "website_name"=> $key['website_name'], 
                            "product_name"=> $key['product_name'], 
                        );
                    }
                    return view('fronted.order-detail',compact('main','order_id'));
	            }
            }
		}
        return redirect("login");
	}
	public function Pickup_entry(){
		if(Auth::check()){
			session()->put('mainmenu',"Pickup_entry");
            $courier_list = Courier::select()->where('user_id', Auth::user()->id)->get();
			return view('fronted.pickup-entry',compact('courier_list'));
		}
        return redirect("login");
	}
	public function get_pendingdata(Request $request){
		if(Auth::check()){
			$order_id = $request->input('order_id');

            $order_status = \Config::get('data.order_status');
            $order_type = \Config::get('data.order_type');


			$query = OrderEntry::select('*')
                      ->where('user_id',Auth::user()->id)
                      ->where('order_id','=',$order_id)
                      ->orwhere('awb_no','=',$order_id)
                      ->get();

            if(!sizeof($query)){
            	return response()->json([ "result"=>false,'error'=>'OrderId or AWB Not available.']);
            }else{
               
                $query = OrderEntry::select('*')
                      ->where('user_id',Auth::user()->id)
                      ->where('order_id','=',$query[0]['order_id'])
                      ->whereNotIn('order_status', [1])
                      ->get(); 

                if(sizeof($query)){
                	return response()->json(["result"=>false,'error'=>'Order is not in Pending Status.']);
                }else{
                    $result = OrderEntry::select('order.*','courier.name as courier_name','website.name as website_name','product.name as product_name')->join('courier', 'courier.id', '=', 'order.courier_id','left')
                            ->join('website', 'website.id', '=', 'order.website_id')
                            ->join('product', 'product.id', '=', 'order.product_id')
                            ->where('order.user_id',Auth::user()->id)
                            ->where(function($query)use ($order_id) {
                                    $query->where('order.order_id','=',$order_id)
                                          ->orWhere('order.awb_no','=',$order_id);
                            })->get();

                            if(!empty($result[0]['order_type'])){
                                foreach ($order_type as $k ) {
                                    if($result[0]['order_type']==$k['value']){
                                        $o_t= $k['label'];
                                    }
                                }
                            }else{
                                 $o_t= "-";
                            }

                            if(!empty($result[0]['order_status'])){
                                foreach ($order_status as $os ) {
                                    if($result[0]['order_status']==$os['value']){
                                        $o_s= $os['label'];
                                    }
                                }
                            }else{
                                 $o_s= "-";
                            }

                            if(!empty($result[0]['courier_name'])){
                                $courier_name = $result[0]['courier_name'];
                            }else{
                                $courier_name = "-";
                            }

                             if(!empty($result[0]['order_amount'])){
                                $order_amount = $result[0]['order_amount'];
                            }else{
                                $order_amount = "-";
                            }
                             if(!empty($result[0]['awb_no'])){
                                $awb_no = $result[0]['awb_no'];
                            }else{
                                $awb_no = "";
                            }

                           

                            $result= array(
                                'o_id' =>$result[0]['o_id'],
                                'upload_date' =>$result[0]['upload_date'],
                                'website_id' =>$result[0]['website_id'],
                                'order_id' =>$result[0]['order_id'],
                                'product_id' =>$result[0]['product_id'],
                                'qty' =>$result[0]['qty'],
                                'courier_id' =>$result[0]['courier_id'],
                                'awb_no' =>$awb_no,
                                'dispatch_date' =>$result[0]['dispatch_date'],
                                'order_amount' =>$order_amount,
                                'order_type' =>$o_t,
                                'order_status' =>$o_s,
                                'return_received_date' =>$result[0]['return_received_date'],
                                'uploaded_taskid' =>$result[0]['uploaded_taskid'],
                                'upload_type' =>$result[0]['upload_type'],
                                'return_reason' =>$result[0]['return_reason'],
                                'note' =>$result[0]['note'],
                                'amountreceive_date' =>$result[0]['amountreceive_date'],
                                'receive_amount' =>$result[0]['receive_amount'],
                                'user_id' =>$result[0]['user_id'],
                                'created_at' =>$result[0]['created_at'],
                                'updated_at' =>$result[0]['updated_at'],
                                'courier_name' =>$courier_name,
                                'website_name' =>$result[0]['website_name'],
                                'product_name' =>$result[0]['product_name']
                            );
                           
                    return response()->json(["result"=>true,'data'=> $result]);
                }
            }
		}
        return redirect("login");
	}

    public function insert_pickupdata(Request $request){
        $data = $request->input('data');

        if(isset($data)){
            foreach ($data as $key => $value) {
                if($value['check']==1){
                    OrderEntry::where('o_id', $value['o_id'])->update(array(
                        'awb_no' => $value['awbno'],
                        'courier_id'=>$request->input('courier'),
                        'dispatch_date'=>date_format(date_create($request->input('dispatch_date')),"Y-m-d"),
                        'order_status'=>2)
                    );
                }
            }
             return response()->json(["result"=>true]);        
        }else{
            
             return response()->json([ "result"=>false,'error'=>'Select atlest One PickUp Data']); 
        }

    }

	public function Payment_receive(){
		if(Auth::check()){
			session()->put('mainmenu',"Payment_receive");
			return view('fronted.payment-receive');
		}
        return redirect("login");
	}

    public function getpaymentdata(Request $request){
        if(Auth::check()){
            $request->validate([
                'order_id' => 'required',
            ]);
            $order_id = $request->input('order_id');
            $order_status = \Config::get('data.order_status');
            $order_type = \Config::get('data.order_type');


            if(!empty($order_id)){
                 $query = OrderEntry::select('*')
                      ->where('user_id',Auth::user()->id)
                      ->where('order_id','=',$order_id)
                      ->orwhere('awb_no','=',$order_id)
                      ->get();

                if(!sizeof($query)){
                     return response()->json([ "result"=>false,'error'=>'OrderId or AWB Not available.']);
                }else{
                
                    $result = OrderEntry::select('order.*','courier.name as courier_name','website.name as website_name','product.name as product_name')
                            ->join('courier', 'courier.id', '=', 'order.courier_id','left')
                            ->join('website', 'website.id', '=', 'order.website_id')
                            ->join('product', 'product.id', '=', 'order.product_id')
                            ->where('order.user_id',Auth::user()->id)
                            ->where(function($query)use ($order_id) {
                                    $query->where('order.order_id','=',$order_id)
                                          ->orWhere('order.awb_no','=',$order_id);
                            })->get(); 

                             if(!empty($result[0]['order_type'])){
                                foreach ($order_type as $k ) {
                                    if($result[0]['order_type']==$k['value']){
                                        $o_t= $k['label'];
                                    }
                                }
                            }else{
                                 $o_t= "-";
                            }

                            if(!empty($result[0]['order_status'])){
                                foreach ($order_status as $os ) {
                                    if($result[0]['order_status']==$os['value']){
                                        $o_s= $os['label'];
                                    }
                                }
                            }else{
                                 $o_s= "-";
                            }

                            if(!empty($result[0]['courier_name'])){
                                $courier_name = $result[0]['courier_name'];
                            }else{
                                $courier_name = "-";
                            }

                             if(!empty($result[0]['order_amount'])){
                                $order_amount = $result[0]['order_amount'];
                            }else{
                                $order_amount = "";
                            }
                             if(!empty($result[0]['awb_no'])){
                                $awb_no = $result[0]['awb_no'];
                            }else{
                                $awb_no = "";
                            }

                           

                            $result= array(
                                'o_id' =>$result[0]['o_id'],
                                'upload_date' =>$result[0]['upload_date'],
                                'website_id' =>$result[0]['website_id'],
                                'order_id' =>$result[0]['order_id'],
                                'product_id' =>$result[0]['product_id'],
                                'qty' =>$result[0]['qty'],
                                'courier_id' =>$result[0]['courier_id'],
                                'awb_no' =>$awb_no,
                                'dispatch_date' =>$result[0]['dispatch_date'],
                                'order_amount' =>$order_amount,
                                'order_type' =>$o_t,
                                'order_status' =>$o_s,
                                'return_received_date' =>$result[0]['return_received_date'],
                                'uploaded_taskid' =>$result[0]['uploaded_taskid'],
                                'upload_type' =>$result[0]['upload_type'],
                                'return_reason' =>$result[0]['return_reason'],
                                'note' =>$result[0]['note'],
                                'amountreceive_date' =>$result[0]['amountreceive_date'],
                                'receive_amount' =>$result[0]['receive_amount'],
                                'user_id' =>$result[0]['user_id'],
                                'created_at' =>$result[0]['created_at'],
                                'updated_at' =>$result[0]['updated_at'],
                                'courier_name' =>$courier_name,
                                'website_name' =>$result[0]['website_name'],
                                'product_name' =>$result[0]['product_name']
                            );
                           
                    return response()->json([ "result"=>true, 'data'=> $result]);
                }
            }else{

            }
        }
    }

     public function insert_amountdata(Request $request){
        $data = $request->input('data');
        if(isset($data)){
            foreach ($data as $key => $value) {
                if($value['check']==1){
                    OrderEntry::where('o_id', $value['o_id'])
                    ->update(array(
                        'receive_amount' => $value['amount'],
                        'amountreceive_date'=>date('Y-m-d',strtotime(date_format(date_create($request->input('payment_date')),"Y-m-d")))
                        )
                    );
                }
            }
             return response()->json(["result"=>true]);     
        }else{
             return response()->json([ "result"=>false,'error'=>'Select atlest One Payment Data']); 
        }  
    }

	public function Import_Flipcartexcel(){
		if(Auth::check()){

            $user = Auth::user();
			session()->put('mainmenu',"Import_Flipcartexcel");
            $website=Website::where('site_id',1)->where('user_id',$user->id)->get();
			return view('fronted.import-flipcart',compact('website'));
		}
        return redirect("login");
	}

     public function import(Request $request){
        $request->validate([
            'file'=>'required|mimes:xlsx,xls,csv',
        ]);

        $website=Website::where('site_id',1)->where('user_id',Auth::user()->id)->get();

        $fileName = time().'.'.$request->file->extension(); 
     
        $flipcart_data=[];
        $duplicate_data=[];
        Excel::store(new OrderImport(), 'uploads/flipcartexcel/'.$fileName, 'real_public');
        $data =  Excel::toArray(new OrderImport, request()->file('file'));

     

       foreach($data[0] as $key => $value){

       if(isset($value['sku'])){
            $product = Product::select('*')->where('sku','=',$value['sku'])->where('user_id','=',Auth::user()->id)->get();

            if(!sizeof($product)){
                return redirect("Import_Flipcartexcel")->with('error','Product not found in list'); 
            }

            $order = OrderEntry::select('*')
                  ->where('user_id',Auth::user()->id)
                  ->where('order_id','=',$value['order_id'])
                  ->get();


            if(!sizeof($order)){
               
                $flipcart_data[] = array(
                    "order_id" => $value['order_id'],
                    "product_id" => $product[0]['id'],
                    "product_name" => $product[0]['name'],
                    "qty" => $value['quantity'],
                    "awb_no" => $value['tracking_id'],
                    'upload_date' => date('Y-m-d',strtotime(date_format(date_create($value['ordered_on']),"Y-m-d"))),
                    'invoice_amount'=>$value['invoice_amount']
                );
                  
            }else{
                $duplicate_data[] = array(
                    "order_id" => $value['order_id'],
                    "product_id" => $product[0]['id'],
                    "product_name" => $product[0]['name'],
                    "qty" => $value['quantity'],
                    "awb_no" => $value['tracking_id'],
                    'upload_date' => date('Y-m-d',strtotime(date_format(date_create($value['ordered_on']),"Y-m-d"))),
                    'invoice_amount'=>$value['invoice_amount']
                ); 
               
                 
            }
        }else{
             return redirect("Import_amazoneexcel")->with('error','Import Flipcart file.');
           
       }

      
        }

        return view('fronted.import-flipcart',compact('duplicate_data','flipcart_data','website','fileName'));
    }

    public function insert_flipcartexcel(Request $request){
        $data = $request->input('data');
        if(!empty($data)){
            if(Auth::user()->wallet_balance<=0){
                return response()->json(["result"=>false,"error"=>'Recharge your WalletBalance.']);    
            }else{
                foreach ($data as $value) {
                    $order = new OrderEntry;
                    $order->website_id =$value['website_id'];
                    $order->order_id =$value['order_id'];
                    $order->product_id = $value['product_id'];
                    $order->qty = $value['qty'];
                    $order->awb_no = $value['awb_no'];
                    $order->upload_date = date("Y-m-d");
                    $order->order_status = 1;
                    $order->upload_type = 'Excel'; 
                    $order->user_id = Auth::user()->id;
                    $order->save();
                }

                $transaction = new Wallet_transaction;
                $transaction->user_id =Auth::user()->id ; 
                $transaction->main_charge = Auth::user()->charge ; 
                $transaction->opening_balance = Auth::user()->wallet_balance; 
                $transaction->total_charge = count($data)*Auth::user()->charge;    
                $transaction->closing_balance =Auth::user()->wallet_balance - (count($data)*Auth::user()->charge); 
                $transaction->type = 'Excel';    
                $transaction->excel_filename = $request->input('filename'); ;  
                $transaction->exceldata_count = count($data);
                $transaction->save();

                User::where('id',Auth::user()->id)->update(array('wallet_balance' =>Auth::user()->wallet_balance - (count($data)*Auth::user()->charge)));
                return response()->json(["result"=>true]);   
            }  
        }

    }
    public function cancel_flipcartexcel(Request $request){
        $fileName =$request->input('filename');
        $file_path =public_path('/uploads/flipcartexcel/').$fileName;
                    unlink($file_path);
        return response()->json(["result"=>true]);

    }
   
	public function Import_amazoneexcel(){
		if(Auth::check()){
			session()->put('mainmenu',"Import_amazoneexcel");
            $website=Website::where('site_id',2)->where('user_id',Auth::user()->id)->get();
			return view('fronted.import-amazone',compact('website'));
		}
        return redirect("login");
	}
    public function import_amazone(Request $request){
        if(Auth::check()){
            $request->validate([
                'file'=>'required|mimes:txt',
            ]);

            $website=Website::where('site_id',2)->where('user_id',Auth::user()->id)->get();
            //$content = File::get($request->file);
            $fileName = time().'.'.$request->file->extension(); 
            $request->file->move(public_path('uploads/amazonefile'), $fileName);
            $file=public_path('uploads/amazonefile').'/'.$fileName;
                 
            $fopen = fopen($file, 'r');
            $fread = fread($fopen,filesize($file));
            fclose($fopen);
            $remove = "\n";
            $split = explode($remove, $fread);
            $array[] = null;
            $tab = "\t";
            foreach ($split as $string)
            {
                $row = explode($tab, $string);
                array_push($array,$row);
            }
                

            $firstValue = array_shift($array);
            $firstValue = array_shift($array); //remove first value from array and assign it to variable

            $a = array_map('trim', array_values($firstValue));
            $b = array_map('trim', $firstValue);
            $firstValue = array_combine($a, $b);
         
            $remove = array_pop($array);
            
            foreach($array as &$v){ //loop over remaining values
                $v = array_combine($firstValue,$v); //combine both array to create key value pair
            }
            $duplicate_data= [];
            $amazone_data= [];

            foreach ($array as $key => $value){
                if(empty($value['sku'])||empty($value['order-id'])){
                    return redirect("Import_amazoneexcel")->with('error','upload Amazone File');
                }else{
                    $product = Product::select('*')->where('sku','=',$value['sku'])->where('user_id','=',Auth::user()->id)->get();

                    if(!sizeof($product)){
                        return redirect("Import_amazoneexcel")->with('error','Product not found in list'); 
                    }
                    if(isset($value['carrier'])){
                        $courier = Courier::select('*')->where('name','=',str_replace("\r","",$value['carrier']))->where('user_id','=',Auth::user()->id)->get();
                        if(!sizeof($courier)){
                            return redirect("Import_amazoneexcel")->with('error','courier not found in list'); 
                        }else{
                            $courier_id = $courier[0]['id'];
                            $courier_name = $courier[0]['name'];
                        }
                    }else{
                        $courier_id='';
                        $courier_name ='';
                    }

                    $order = OrderEntry::select('*')
                          ->where('user_id',Auth::user()->id)
                          ->where('order_id','=',$value['order-id'])
                          ->get();
                     if(isset($value['tracking-id'])){ 
                        $awb = $value['tracking-id'];
                    }else{
                        $awb = '';
                    }
                    if(isset($value['item-price'])){ 
                        $itemprice = $value['item-price'];
                    }else{
                        $itemprice = '';
                    }

                    if(!sizeof($order)){
                        
                        $amazone_data[] = array(
                            "website_id" => $request->input('website'),
                            "order_id" => $value['order-id'],
                            "product_id" => $product[0]['id'],
                            "product_name" => $product[0]['name'],
                            "qty" => $value['quantity-purchased'],
                            "awb_no" =>$awb ,
                            "upload_date" => date_format(date_create($value['purchase-date']),"Y-m-d"),
                            "courier_id" => $courier_id,
                            "courier_name" => $courier_name,
                            "item-price"=> $itemprice ,
                        );

                    }else{
                        $duplicate_data[] = array(
                            "website_id" => $request->input('website'),
                            "order_id" => $value['order-id'],
                            "product_id" => $product[0]['id'],
                            "product_name" => $product[0]['name'],
                            "qty" => $value['quantity-purchased'],
                            "awb_no" => $value['tracking-id'],
                            "upload_date" => date_format(date_create($value['purchase-date']),"Y-m-d"),
                            "courier_id" => $courier_id,
                            "courier_name" => $courier_name,
                            "item-price"=> $itemprice ,
                        );

                        $file_path =public_path('uploads/amazonefile').'/'.$fileName;
                        unlink($file_path);
                        return redirect("Import_amazoneexcel")->with('error','order alredy uploaded');
                    }
                }
            }
            return view('fronted.import-amazone',compact('duplicate_data','amazone_data','website','fileName'));
        }
        return redirect("login");
    }
    public function insert_amazoneexcel(Request $request){
        $data = $request->input('data');
        if(Auth::user()->wallet_balance<=0){
            return response()->json(["result"=>false,"error"=>'Recharge your WalletBalance.']);    
        }else{

            if(!empty($data)){
                foreach ($data as $value) {
                    $order = new OrderEntry;
                    $order->website_id =$value['website_id'];
                    $order->order_id =$value['order_id'];
                    $order->product_id = $value['product_id'];
                    $order->qty = $value['qty'];
                    $order->awb_no = $value['awb_no'];
                    $order->upload_date = date("Y-m-d");
                    $order->order_status = 1;
                    $order->upload_type = 'Excel'; 
                    $order->user_id = Auth::user()->id;
                    $order->save();
                }

                $transaction = new Wallet_transaction;
                $transaction->user_id =Auth::user()->id ; 
                $transaction->main_charge = Auth::user()->charge ; 
                $transaction->opening_balance = Auth::user()->wallet_balance; 
                $transaction->total_charge = count($data)*Auth::user()->charge;    
                $transaction->closing_balance =Auth::user()->wallet_balance - (count($data)*Auth::user()->charge); 
                $transaction->type = 'Excel';    
                $transaction->excel_filename = $request->input('filename'); ;  
                $transaction->exceldata_count = count($data);
                $transaction->save();

                User::where('id',Auth::user()->id)->update(array('wallet_balance' =>Auth::user()->wallet_balance - (count($data)*Auth::user()->charge)));
                return response()->json(["result"=>true]);     
            }
        }

    }
    public function cancel_amazoneexcel(Request $request){
               
        $fileName =$request->input('filename');
        $file_path =public_path('/uploads/amazonefile/').$fileName;
                    unlink($file_path);
        return response()->json(["result"=>true]);
    }

	public function Import_meeshoexcel(){
		if(Auth::check()){
			session()->put('mainmenu',"Import_meeshoexcel");
            $website=Website::where('site_id',3)->where('user_id',Auth::user()->id)->get();

			return view('fronted.import-meesho',compact('website'));
		}
        return redirect("login");
	}

    public function import_meesho(Request $request){
        if(Auth::check()){
            session()->put('mainmenu',"Import_meeshoexcel");
                $website=Website::where('site_id',3)->where('user_id',Auth::user()->id)->get();
                 $request->validate([
                'file'=>'required|mimes:pdf',
            ]);

            $fileName = time().'.'.$request->file->extension(); 
            $request->file->move(public_path('uploads/meeshopdf'), $fileName);
            $file=public_path('uploads/meeshopdf').'/'.$fileName;

            $apiURL = 'http://127.0.0.1:8000/pdf_convert';
            
            
            $parameters = ['input_file_path' =>  $file ];
                  
            $client = new \GuzzleHttp\Client();
            //$response = $client->request('GET', $apiURL);
            $response = $client->request('GET', $apiURL, ['query' => $parameters]);
       
            $statusCode = $response->getStatusCode();
            $responseBody = json_decode($response->getBody(), true);
     
            foreach ($responseBody as $key =>$value){
                for ($i=0; $i <count($value['column_data']) ; $i++) { 
                    $main_array[]=  array(
                        'orderno'=> $value['column_data'][$i]['Sub Order No.'],
                        'AWB'=> $value['column_data'][$i]['AWB'],
                        'Qty'=> $value['column_data'][$i]['Qty.'],
                        'SKU'=> $value['column_data'][$i]['SKU'],
                        'size'=> $value['column_data'][$i]['SKU'],
                        'packed'=> $value['column_data'][$i]['SKU'],
                        'courier_name'=> $value['courier']
                    );
                }  
            }

            $duplicate_data= [];
            $meesho_data= [];

            foreach ($main_array as $key ) {
                $product = Product::select('*')->where('sku','=',$key['SKU'])->get();

                $order = OrderEntry::select('*')
                      ->where('user_id',Auth::user()->id)
                      ->where('order_id','=',$key['orderno'])
                      ->get();

                if(!sizeof($order)){
                   

                    $meesho_data[]=  array(
                        'order_id'=> $key['orderno'],
                        'product_id'=> $product[0]['id'],
                        'product_name'=> $product[0]['name'],
                        'qty'=>  $key['Qty'],
                        'awb_no'=> $key['AWB'],
                        'packed'=> $key['packed'],
                        'courier_name'=> $key['courier_name']
                    );

                }else{
                    $duplicate_data[]=  array(
                        'order_id'=> $key['orderno'],
                        'product_id'=> $product[0]['id'],
                        'product_name'=> $product[0]['name'],
                        'qty'=>  $key['Qty'],
                        'awb_no'=> $key['AWB'],
                        'packed'=> $key['packed'],
                        'courier_name'=> $key['courier_name']
                    );
                }
             
            }
            return view('fronted.import-meesho',compact('duplicate_data','meesho_data','website','fileName'));
            //return redirect("Import_meeshoexcel")->with('sucess','Data Upload Sucessfully.'); 
        }
        return redirect("login");

    }
    public function insert_meeshoexcel(Request $request){
        $data = $request->input('data');
        if(!empty($data)){
            if(Auth::user()->wallet_balance<=0){
                 return redirect("Import_meeshoexcel")->with('error','Recharge your WalletBalance.'); 

            }else{

                foreach ($data as $value) {
                    $order = new OrderEntry;
                    $order->website_id =$value['website_id'];
                    $order->order_id =$value['order_id'];
                    $order->product_id = $value['product_id'];
                    $order->qty = $value['qty'];
                    $order->awb_no = $value['awb_no'];
                    $order->upload_date = date("Y-m-d");
                    $order->order_status = 1;
                    $order->upload_type = 'Excel'; 
                    $order->user_id = Auth::user()->id;
                    $order->save();
                }


                $transaction = new Wallet_transaction;
                $transaction->user_id =Auth::user()->id ; 
                $transaction->main_charge = Auth::user()->charge ; 
                $transaction->opening_balance = Auth::user()->wallet_balance; 
                $transaction->total_charge = count($data)*Auth::user()->charge;    
                $transaction->closing_balance =Auth::user()->wallet_balance - (count($data)*Auth::user()->charge); 
                $transaction->type = 'Excel';    
                $transaction->excel_filename = $request->input('filename'); ;  
                $transaction->exceldata_count = count($data);
                $transaction->save();

                User::where('id',Auth::user()->id)->update(array('wallet_balance' =>Auth::user()->wallet_balance - (count($data)*Auth::user()->charge)));
                return response()->json(["result"=>true]);     
            }
        }
    }
    public  function cancel_meeshoexcel(Request $request){
        $fileName =$request->input('filename');
        $file_path =public_path('/uploads/meeshopdf/').$fileName;
                    unlink($file_path);
        return response()->json(["result"=>true]);
    }
}