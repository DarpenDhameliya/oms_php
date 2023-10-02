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




class ReportController extends Controller
{
	public function orderReport(){
		if(Auth::check()){
			session()->put('mainmenu',"Report");
			session()->put('sub_menu',"Order_report");

			$website_list = Website::select()->where('user_id', Auth::user()->id)->get();
			$courier_list = Courier::select()->where('user_id', Auth::user()->id)->get();
			$product_list = Product::select('gst.gst_no','unit.unit','product.*')->join('gst', 'gst.id', '=', 'product.gst_id')->join('unit', 'unit.id', '=', 'product.unit_id')->where('user_id',Auth::user()->id)->get();
			$order_status = \Config::get('data.order_status');
			$order_type = \Config::get('data.order_type');

			return view('fronted.order-report',compact('website_list','courier_list','product_list','order_status','order_type'));

		}
        return redirect("login");
	}

	public function orderReportdata(Request $request){
		if(Auth::check()){
			$website_list = Website::select()->where('user_id', Auth::user()->id)->get();
			$courier_list = Courier::select()->where('user_id', Auth::user()->id)->get();
			$product_list = Product::select('gst.gst_no','unit.unit','product.*')->join('gst', 'gst.id', '=', 'product.gst_id')->join('unit', 'unit.id', '=', 'product.unit_id')->where('user_id',Auth::user()->id)->get();

			$order_status = \Config::get('data.order_status');
			$order_type = \Config::get('data.order_type');

			$from_date = date_format(date_create($request->input('from_date')),"Y-m-d");
            $to_date = date_format(date_create($request->input('to_date')),"Y-m-d");

            $courier_id = $request->input('courier');
            $ordertype = $request->input('order_type');
            $order_id = $request->input('order_id');
            $orderstatus = $request->input('order_status');
            $website_id = $request->input('website');
            $product_id = $request->input('product');

            if(!empty($order_id)){
                 $query = OrderEntry::select('*')
                      ->where('user_id',Auth::user()->id)
                      ->where('order_id','=',$order_id)
                      ->orwhere('awb_no','=',$order_id)
                      ->get();
                if(!sizeof($query)){
                    return redirect("orderReport")->with('errors','OrderId or AWB Not available.'); 
                }else{
                    $order_id = $request->input('order_id');
                }
            }
           
            if(empty( $from_date )&& empty($to_date) && empty($ordertype) && empty($orderstatus) && empty($order_id) && empty($courier_id) && empty($product_id) && empty($website_id)){
             
               return redirect("orderReport")->with('errors','Select minimum one option'); 
            }else{
                if(empty($ordertype) && empty($orderstatus) && empty($order_id) && empty($courier_id) && empty($product_id) && empty($website_id)){
                    $from_date = date_format(date_create($request->input('from_date')),"Y-m-d");
                    $to_date = date_format(date_create($request->input('to_date')),"Y-m-d")."23:59:59.999";
                }else{
                    if(empty($from_date)||empty($to_date)){
                        $from_date = '';
                        $to_date =  '';
                    }else{
                        $from_date = date_format(date_create($request->input('from_date')),"Y-m-d");
                        $to_date = date_format(date_create($request->input('to_date')),"Y-m-d")."23:59:59.999";
                    }
                }

                $result = OrderEntry::select('order.*','courier.name as courier_name','website.name as website_name','product.name as product_name')
                                ->join('courier', 'courier.id', '=', 'order.courier_id','left')
                                ->join('website', 'website.id', '=', 'order.website_id')
                                ->join('product', 'product.id', '=', 'order.product_id')
                                ->where('order.user_id',Auth::user()->id)
                                ->where(function ($query) use ($courier_id) {
                                    if(!empty($courier_id)){
                                        foreach($courier_id as $c) {
                                            $query->orWhere('order.courier_id', '=', $c);
                                        }
                                    }
                                })-> where(function ($query) use ($ordertype) {
                                    if(!empty($ordertype)){
                                        foreach($ordertype as $o) {
                                            $query->orWhere('order.order_type', '=', $o);
                                        }
                                    }
                                })-> where(function ($query) use ($orderstatus) {
                                    if(!empty($orderstatus)){
                                        foreach($orderstatus as $os) {
                                            $query->orWhere('order.order_status', '=',$os);
                                        }
                                    }
                                })-> where(function ($query) use ($website_id) {
                                    if(!empty($website_id)){
                                        foreach($website_id as $w) {
                                            $query->orWhere('order.website_id', '=', $w);
                                        }
                                    }
                                })-> where(function ($query) use ($product_id) {
                                    if(!empty($product_id)){
                                        foreach($product_id as $p) {
                                            $query->orWhere('order.product_id', '=', $p);
                                        }
                                    }
                                })-> where(function ($query) use ($order_id) {
                                    if(!empty($order_id)){
                                       $query->orWhere('order.order_id', '=', $order_id);
                                        $query->orwhere('order.awb_no', '=', $order_id);
                                    }
                                })
                                -> where(function ($query) use ($from_date) {
                                    if(!empty($from_date)){
                                        $query->orWhere('order.created_at', '>=', $from_date);
                                    }
                                })-> where(function ($query) use ($to_date) {
                                    if(!empty($to_date)){
                                        $query->orWhere('order.created_at','<=', $to_date);
                                    }
                                })->get();



                    if(!sizeof($result)){
                        return redirect("orderReport")->with('errors','Data Not available.'); 
                    }else{
                        $result = $result;
                    }  

                    foreach ($result as $key) {
                               
                    	foreach ($order_status as $k ) {
                             if(empty($key['order_status'])){
                                $o_t= '';

                              

                             }else{
                        		if($key['order_status']==$k['value']){
                               
                        			$o_t= $k['label'];
                        		}else{
                                   
                                    $o_t= '';
                                }

                             }
                    	}

                    	foreach ($order_status as $os ) {
                            if(empty($key['order_status'])){
                                $o_s= '';

                            }else{
                        		if($key['order_status']==$os['value']){
                        			$o_s= $os['label'];
                        		}
                            }
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
                            "amountreceive_date"=> $key['amountreceive_date'], 
                            "receive_amount"=> $key['receive_amount'],
                        );
                    }
                    $from_date = $request->input('from_date');
                    $to_date = $request->input('to_date');

                   return view('fronted.order-report',compact('website_list','courier_list','product_list','order_status','order_type','main','orderstatus','orderstatus','website_id','courier_id','product_id','ordertype','to_date','from_date'));
            }
			
		}
        return redirect("login");
	}

	public function PaymentReceiveReport(){
		if(Auth::check()){
			session()->put('mainmenu',"Report");
			session()->put('sub_menu',"Payment_receive_report");
           
            return view('fronted.payment-receive-report');
		}
        return redirect("login");
	}

    public function paymentreceivedata(Request $request){
        if(Auth::check()){
            $from_date = date_format(date_create($request->input('from_date')),"Y-m-d");
            $to_date = date_format(date_create($request->input('to_date')),"Y-m-d");

            $queries = OrderEntry::select('order.website_id','website.name')->join('website', 'website.id', '=', 'order.website_id')
                                ->where(function ($query) use ($from_date) {
                                        if(!empty($from_date)){
                                            $query->orWhere('order.amountreceive_date', '>=', $from_date);
                                        }
                                })-> where(function ($query) use ($to_date) {
                                    if(!empty($to_date)){
                                        $query->orWhere('order.amountreceive_date','<=', $to_date);
                                    }
                                })
                                ->where('order.user_id',Auth::user()->id)
                                ->groupBy('order.website_id')->get();

            
            if(!sizeof($queries)){
                return redirect("PaymentReceiveReport")->with('errors','Data Not available.'); 
            }else{
                foreach ($queries as $k => $v) {      
                    $main[]= array(
                        'website_id'=>$v->website_id,
                        'website_name'=>$v->name,
                        'data'=>$this->get_data($v->website_id,$from_date,$to_date)
                    );       
                }
            } 

            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
      
            return view('fronted.payment-receive-report',compact('main','from_date','to_date'));
        }
        return redirect("login");
    }

    public function  get_data($website_id,$from_date,$to_date){
        return OrderEntry::select(DB::raw('SUM(order.receive_amount) as receive_amount'))
                                    ->where(function ($query) use ($from_date) {
                                        if(!empty($from_date)){
                                            $query->orWhere('order.amountreceive_date', '>=', $from_date);
                                        }
                                    })-> where(function ($query) use ($to_date) {
                                        if(!empty($to_date)){
                                            $query->orWhere('order.amountreceive_date','<=', $to_date);
                                        }
                                    })->where('order.website_id',$website_id)
                                    ->where('order.user_id',Auth::user()->id) ->get();
    }

    public function paymentdata($website_id,$from_date,$to_date){
        if(Auth::check()){
            $main  = OrderEntry::select('order.*','website.name as website_name','product.name as product_name','courier.name as courier_name')
                                ->join('website', 'website.id', '=', 'order.website_id')
                                ->join('product', 'product.id', '=', 'order.product_id')
                                ->join('courier', 'courier.id', '=', 'order.courier_id')
                                ->where('order.user_id',Auth::user()->id)
                                ->where(function ($query) use ($from_date) {
                                        if(!empty($from_date)){
                                            $query->orWhere('order.amountreceive_date', '>=', $from_date);
                                        }
                                })->where(function ($query) use ($to_date) {
                                    if(!empty($to_date)){
                                        $query->orWhere('order.amountreceive_date','<=', $to_date);
                                    }
                                })->where('order.user_id',Auth::user()->id)
                                ->where('order.website_id',$website_id)
                                ->get();
                               
            return view('fronted.payment_receive_view',compact('main'));
        }
        return redirect("login");
    }

    public function TransactionReport(){
        if(Auth::check()){
            session()->put('mainmenu',"Report");
            session()->put('sub_menu',"Transaction_report");

            return view('fronted.transaction-report');
        }
        return redirect("login");
    }

    public function transactiondata(Request $request){
        if(Auth::check()){
           
            $from_date = date_format(date_create($request->input('from_date')),"Y-m-d");
            $to_date = date_format(date_create($request->input('to_date')),"Y-m-d")."23:59:59.999";

            $main = Wallet_transaction::select('wallet_transaction.*')
                                ->where('wallet_transaction.user_id',Auth::user()->id) 
                                ->where(function ($query) use ($from_date) {
                                        if(!empty($from_date)){
                                            $query->orWhere('wallet_transaction.created_at', '>=', $from_date);
                                        }
                                })
                                ->where(function ($query) use ($to_date) {
                                    if(!empty($to_date)){
                                        $query->orWhere('wallet_transaction.created_at','<=', $to_date);
                                    }
                                })
                                ->orderBy('wallet_transaction.id', 'asc')
                                ->get();
            if(!sizeof($main)){
                return redirect("TransactionReport")->with('errors','Data Not available.'); 
            }else{
                $main ;
            }

            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');

            return view('fronted.transaction-report',compact('main','from_date','to_date'));
        }
        return redirect("login");
    }
}