<?php

namespace App\Http\Controllers;



use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Seller;
use App\Models\Product;
use App\Models\Gst;
use App\Models\Unit;
use App\Models\Website;
use App\Models\Courier;
use App\Models\Bank;
use App\Models\Return_reason;
use App\Models\OrderEntry;
use App\Models\Amount_receive;
/*use Auth;*/
use Session;
use Laravel\Passport\Client;

/*use Laravel\Passport\HasApiTokens;*/
use Validator;
use Hash;
use Image;
use Illuminate\Validation\Rule; 
use Smalot\PdfParser\Parser;
use initred\laraveltabula\src\InitRed\Tabula;



class AuthController extends Controller{
   
    public function signup(Request $request){
       
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|string|unique:users|email',
            'password' => 'required'
        ]);

        if ($validator->fails()){
            return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
        }else{
            $request['password']=Hash::make($request['password']);
            $user = User::create($request->toArray());
            $token = $user->createToken('Laravel Password Grant Client')->accessToken;
            $response['token'] =$token;
            $response['token_type'] = 'Bearer';
            $response['status']=true;
            
            return response($response, 200);
            /*$user = new User([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);

            $user->save();

            return response()->json([
                'message' => 'Successfully created user!'
            ], 201);*/
        }
    }

    public function login(Request $request){
        
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()){
            return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
        }
        $user = User::where('email', $request->email)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {

                $token = $user->createToken('Laravel Password Grant Client')->accessToken;

                User::where('id', $user->id)->update(array('remember_token' => 'Bearer '.$token));
                $user = User::where('id', $user->id)->get();
                $response['token'] =$token;
                $response['token_type'] = 'Bearer';
                $response['user'] =$user;
                $response['status']=true;
                return response($response, 200);
            } else {
                $response = ["message" => "Password mismatch",'status'=>false];
                return response($response, 422);
            }
        } else {
            $response = ["message" =>'User does not exist','status'=>false];
            return response($response, 422);
        }
    }

    public function logout(){
        $token = Auth::guard('api')->user()->token();
        $token->revoke();
        $response = ['message' => 'You have been successfully logged out!','status'=>true];
        return response($response, 200);
    }

    public function user(){
        if (Auth::guard('api')->check()) {
            $user =Auth::guard('api')->user();
        }else{
        }
        /*return response()->json($request->user());*/
    }

    public function add_seller(Request $request){
        if (Auth::guard('api')->check()) {
            $validator = Validator::make($request->all(), [
                'seller_name' => 'required',
                'seller_email' => 'required|email|unique:seller',
                'seller_comment' => 'required',       
            ]);
            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all()], 422);
            }else{
                $seller = new Seller;
                $seller->seller_name = $request->input('seller_name');
                $seller->seller_email = $request->input('seller_email');
                $seller->seller_comment = $request->input('seller_comment');
              
                $seller->save();
                $response = ['message' => 'Seller added successfully '];
                return response($response, 200);
            }
        }else{
            return response(['errors'=>'user not login'], 422);

        }

    }
    public function Edit_seller(Request $request,$id){
         if (Auth::guard('api')->check()) {

            $seller = Seller::findOrFail($id);
            $data = $request->all();
            if(empty($seller)){
                $response = ['message' => 'seller not found'];
                return response($response, 200);
            }else{
                 if($data['seller_email']==$seller->seller_email){
                    $emailvalidation ='required|email';
                }else{
                    $emailvalidation ='required|email|unique:seller';
                }

                $validator = Validator::make($request->all(), [
                   'seller_name' => 'required',
                    'seller_email' => $emailvalidation,
                    'seller_comment' => 'required',       
                ]);
                if ($validator->fails())
                {
                    return response(['errors'=>$validator->errors()->all()], 422);
                }else{
                    $seller->seller_name = $request->seller_name;
                    $seller->seller_email = $request->seller_email;
                    $seller->seller_comment = $request->seller_comment;
                    $seller->save();
                    $response = ['message' => 'seller Update Sucessfully'];
                    return response($response);
                }
            }
         }else{
            return response(['errors'=>'user not login'], 422);

        }
    }
    public function Delete_seller($id){
        if (Auth::guard('api')->check()) {

            $seller = Seller::findOrFail($id);
            Seller::destroy($id);
            $response = ['message' => 'seller Delete Sucessfully'];
            return response($response);
        }else{
            return response(['errors'=>'token Expire'], 422);

        }
    }

    public function add_product(Request $request){
        if (Auth::guard('api')->check()) {
            $query = Product::select('sku')->where('user_id',Auth::guard('api')->user()->id)->get();

            $validator = Validator::make($request->all(), [
                'name' => 'required',
               /* 'sku' => 'required|unique:product',*/
                'sku' => ['required',Rule::unique('product')->where(function ($query) {
                    return $query->where('user_id', Auth::guard('api')->user()->id);
                })],
                'image' => 'required|mimes:png,jpg,jpeg,csv,txt,xlx,xls,pdf,webp|max:2048',  
                'gst_id'=>'required|numeric',
                'unit_id'=>'required|numeric',
            ]);


            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                 $image = $request->file('image');
                $fileName = time().'.'.$request->image->extension(); 
                //$request->image->move(public_path('uploads/product'), $fileName);
                 $destinationPath = public_path('uploads/product');
                $img = Image::make($image->path());
                $img->resize(100, 100, function ($constraint) {
                $constraint->aspectRatio();
            })->save($destinationPath.'/'.$fileName);

       


                $product = new Product;
                $product->name = $request->input('name');
                $product->sku = $request->input('sku');
                $product->image =$fileName;
                $product->gst_id = $request->input('gst_id');
                $product->unit_id = $request->input('unit_id');
                $product->status = 1;
                $product->user_id = Auth::guard('api')->user()->id;
                $product->save();
                $response = ['message' => 'Product added successfully','status'=>true];
                return response($response, 200);
            }

            /*$img = Image::make($image->path());
        $img->resize(100, 100, function ($constraint) {
            $constraint->aspectRatio();
        })->save($destinationPath.'/'.$input['imagename']);
   
        $destinationPath = public_path('/images');*/
        
        }else{
            return response(['errors'=>'user not login','status'=>false],422);
        }
    }

    

    public function get_product(Request $request,$sku){
        if (Auth::guard('api')->check()) {
            $get_product = Product::select('gst.gst_no','unit.unit','product.*')->join('gst', 'gst.id', '=', 'product.gst_id')->join('unit', 'unit.id', '=', 'product.unit_id')->where('user_id',Auth::guard('api')->user()->id)->where('sku',$sku)->get();
        
            if(sizeof($get_product)){
                foreach ($get_product as $key => $value) {
                    if($value->status==1){
                        $status= "Active";
                    }else{
                        $status= "Deactive";
                    }
                    $product_detail=array(
                        'id' => $value->id,
                        'name' => $value->name, 
                        'sku' => $value->sku, 
                        'image' => asset('public/uploads/product/').'/'.$value->image, 
                        'gst_id' => $value->gst_id,
                        'gst'=> $value->gst_no,
                        'unit_id' => $value->unit_id, 
                        'unit'=> $value->unit,
                        'status' =>  $status, 
                    );
                }
                return response(['product_detail'=>$product_detail,'status'=>true],200);
            }else{
                return response(['errors'=>'Sku not available in Product list','status'=>false],422);
            }
           
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }
    public function edit_product(Request $request,$sku){
        if (Auth::guard('api')->check()) {
           
            $get_product = Product::select('*')->where('user_id',Auth::guard('api')->user()->id)->where('sku',$sku)->get();
            
          
            if(sizeof($get_product)){
                if(empty($get_product[0]['image'])){
                    $imgvalidation = 'required|mimes:png,jpg,jpeg,csv,txt,xlx,xls,pdf,webp|max:2048';
                }else{
                    if(empty($request->image)){
                        $imgvalidation = '';
                    }else{
                         $imgvalidation = 'mimes:png,jpg,jpeg,csv,txt,xlx,xls,pdf,webp|max:2048';
                    }   
                }

                $validator = Validator::make($request->all(), [
                    'name' => 'required',
                    'image' => $imgvalidation,  
                    'gst_id'=>'required|numeric',
                    'unit_id'=>'required|numeric',
                    'sku' => ['required',Rule::unique('product')->where(function ($query) {
                        return $query->where('user_id', Auth::guard('api')->user()->id);
                    })->ignore($sku, 'sku')],
                ]);

                if ($validator->fails()){
                    return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
                }else{

                    if(!empty($request->image)){
                        if(!empty($get_product[0]['image'])){
                            unlink(public_path('uploads/product/').$get_product[0]['image']);
                            $fileName = time().'.'.$request->image->extension(); 
                            $request->image->move(public_path('uploads/product'), $fileName);
                        }else{
                            $fileName = time().'.'.$request->image->extension(); 
                            $request->image->move(public_path('uploads/product'), $fileName);
                        }
                    }
                    if(!empty($request->image)){
                        $image = $fileName;
                    }else{
                        $image = $get_product[0]['image'];
                    }
                 
                    Product::where('sku', $sku)->update(array('name' => $request->input('name'),
                                                             'sku' => $request->input('sku'),
                                                            'image' => $image,
                                                            'gst_id' => $request->input('gst_id'),
                                                            'unit_id' => $request->input('unit_id')));

                    $response = ['message' => 'Product updated successfully','status'=>true];
                    return response($response, 200);
                }
            }else{
                return response(['errors'=>'sku not found','status'=>false],422);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }

    }
   
    public function delete_Product(Request $request,$sku){
        if (Auth::guard('api')->check()) {
            $get_product = Product::select()->where('user_id',Auth::guard('api')->user()->id)->where('sku', $sku)->get();
            if(!empty($get_product)){
                unlink(public_path('uploads/product/').$get_product[0]['image']);
                Product::where('sku',$sku)->delete();
                $response = ['message' => 'Product Delete Sucessfully','status'=>true];
                return response($response, 200);
            }else{
                $response = ['message' => 'Product Not Found','status'=>false];
                return response($response, 422);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    
    public function add_website(Request $request){
        if (Auth::guard('api')->check()) {
            $query = Website::select('name')->where('user_id',Auth::guard('api')->user()->id)->get();

            $validator = Validator::make($request->all(), [
                'name' => ['required',Rule::unique('website')->where(function ($query) {
                    return $query->where('user_id', Auth::guard('api')->user()->id);
                })], 
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                $website = new Website;
                $website->name = $request->input('name');
                $website->user_id = Auth::guard('api')->user()->id;
                $website->save();
                $response = ['message' => 'Website added successfully','status'=>true];
                return response($response, 200);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    

     public function edit_website(Request $request,$id){
        if (Auth::guard('api')->check()) {
            $query = Website::select('name')->where('user_id',Auth::guard('api')->user()->id)->get();

            $validator = Validator::make($request->all(), [
                'name' => ['required',Rule::unique('website')->ignore($query[0]->name,'name')->where(function ($query) {
                    return $query->where('user_id', Auth::guard('api')->user()->id);
                })->ignore($id, 'id')],
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                Website::where('id', $id)->update(array('name' => $request->input('name')));

                $response = ['message' => 'Website updated successfully','status'=>true];
                return response($response, 200);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

     public function delete_website(Request $request,$id){
        if (Auth::guard('api')->check()) {
            $get_website = Website::select('name')->where('user_id',Auth::guard('api')->user()->id)->get();
            if(!empty($get_website)){
              
                Website::where('id',$id)->delete();
                $response = ['message' => 'Website Delete Sucessfully','status'=>true];
                return response($response, 200);
            }else{
                $response = ['message' => 'Website Not Found','status'=>false];
                return response($response, 422);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    public function get_website(Request $request,$id){
        if (Auth::guard('api')->check()) {
            $get_website = Website::select('name')->where('id',$id)->get();
        
            if(sizeof($get_website)){
                return response(['website_detail'=>$get_website,'status'=>true],200);
            }else{
                return response(['errors'=>'website not available in website list','status'=>false],422);
            }
           
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    public function add_courier(Request $request){
        if (Auth::guard('api')->check()) {
            $query = Website::select('name')->where('user_id',Auth::guard('api')->user()->id)->get();

            $validator = Validator::make($request->all(), [
                'name' => ['required',Rule::unique('courier')->where(function ($query) {
                    return $query->where('user_id', Auth::guard('api')->user()->id);
                })],
               
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                $courier = new Courier;
                $courier->name = $request->input('name');
                $courier->user_id = Auth::guard('api')->user()->id;
                $courier->save();
                $response = ['message' => 'Courier added successfully','status'=>true];
                return response($response, 200);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

   

    public function edit_courier(Request $request,$id){
        if (Auth::guard('api')->check()) {
            $query = Courier::select('name')->where('id',$id)->get();

            $validator = Validator::make($request->all(), [
                'name' => ['required',Rule::unique('courier')->where(function ($query) {
                    return $query->where('user_id', Auth::guard('api')->user()->id);
                })->ignore($id, 'id')],
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                Courier::where('id', $id)->update(array('name' => $request->input('name')));

                $response = ['message' => 'Courier updated successfully','status'=>true];
                return response($response, 200);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    public function delete_courier(Request $request,$id){
        if (Auth::guard('api')->check()) {
            $get_courier = Courier::select('name')->where('id',$id)->get();
            if(!empty($get_courier)){
                Courier::where('id',$id)->delete();
                $response = ['message' => 'Courier Delete Sucessfully','status'=>true];
                return response($response, 200);
            }else{
                $response = ['message' => 'Courier Not Found','status'=>false];
                return response($response, 422);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    public function get_courier(Request $request,$id){
        if (Auth::guard('api')->check()) {
            $get_courier = Courier::select('name')->where('id',$id)->get();
        
            if(sizeof($get_courier)){
                return response(['courier_detail'=>$get_courier,'status'=>true],200);
            }else{
                return response(['errors'=>'courier not available in courier list','status'=>false],422);
            }
           
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    } 

    public function add_bankdetail(Request $request){
        if (Auth::guard('api')->check()) {
            $query = Website::select('name')->where('user_id',Auth::guard('api')->user()->id)->get();

            $validator = Validator::make($request->all(), [
                'bankname' => 'required',
            ]);
           
            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                $bank = new Bank;
                $bank->bank_name = $request->input('bankname');
                $bank->ifsc = $request->input('ifsc');
                $bank->account = $request->input('account');
                $bank->branch = $request->input('branch');
                $bank->user_id = Auth::guard('api')->user()->id;
                $bank->save();
                $response = ['message' => 'Bank Detail added successfully','status'=>true];
                return response($response, 200);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    

     public function delete_bankdetail(Request $request,$id){
        if (Auth::guard('api')->check()) {
            $get_bankdetail = Bank::select()->where('id',$id)->get();
            if(!empty($get_bankdetail)){
                Bank::where('id',$id)->delete();
                $response = ['message' => 'BankDEtail Delete Sucessfully','status'=>true];
                return response($response, 200);
            }else{
                $response = ['message' => 'Detail Not Found','status'=>false];
                return response($response, 422);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }
    public function edit_bankdetail(Request $request,$id){
        if (Auth::guard('api')->check()) {

            $validator = Validator::make($request->all(), [
                'bankname' => 'required',
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                Bank::where('id', $id)->update(array('bank_name' => $request->input('bankname'),'ifsc'=>$request->input('ifsc'),'account'=>$request->input('account'),'branch'=>$request->input('branch')));

                $response = ['message' => 'BankDetail updated successfully','status'=>true];
                return response($response, 200);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }
    public function get_bankdetail(Request $request,$id){
        if (Auth::guard('api')->check()) {
            $get_bankdetail = Bank::select()->where('id',$id)->get();
        
            if(sizeof($get_bankdetail)){
                return response(['bank_detail'=>$get_bankdetail,'status'=>true],200);
            }else{
                return response(['errors'=>'BankDetail not available in BankMaster list','status'=>false],422);
            }
           
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    public function add_orderby_form(Request $request){
        if (Auth::guard('api')->check()) {
            $validator = Validator::make($request->all(), [
                'website_id' =>'required',
                'order_id' =>'required|unique:order',
                'product_id' =>'required',
                'qty' =>'required',    
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                $order = new OrderEntry;
                $order->website_id = $request->input('website_id');  
                $order->order_id = $request->input('order_id');    
                $order->product_id = $request->input('product_id');  
                $order->qty = $request->input('qty'); 
                $order->courier_id = $request->input('courier_id');  
                $order->awb_no = $request->input('awb_no');  
                $order->order_amount = $request->input('order_amount');    
                $order->order_type = $request->input('order_type');  
                $order->order_status = $request->input('order_status');      
                $order->upload_type = 'manual'; 
                $order->note = $request->input('note');
                $order->user_id = Auth::guard('api')->user()->id;
                $order->save();
                $response = ['message' => 'Order Detail added successfully','status'=>true];
                return response($response, 200);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    } 

    public function all_list(){
        if (Auth::guard('api')->check()) {
            
            $website_list = Website::select()->where('user_id', Auth::guard('api')->user()->id)->get();
            foreach ($website_list as $key) {
                $website[]=array('value'=>$key['id'],'label'=>$key['name']);
            }
            $courier_list = Courier::select()->where('user_id', Auth::guard('api')->user()->id)->get();
            foreach ($courier_list as $key) {
                $courier[]=array('value'=>$key['id'],'label'=>$key['name']);
            }
            $bankmaster_list = Bank::select()->where('user_id', Auth::guard('api')->user()->id)->get();
            foreach ($bankmaster_list as $key) {
                $bankmaster[]=array('value'=>$key['id'],'label'=>$key['name']);
            }
            $return_reason_list = Return_reason::select()->get();
            foreach ($return_reason_list as $key) {
                $return_reason[]=array('value'=>$key['id'],'label'=>$key['name']);
            }


            $product_list = Product::select('gst.gst_no','unit.unit','product.*')->join('gst', 'gst.id', '=', 'product.gst_id')->join('unit', 'unit.id', '=', 'product.unit_id')->where('user_id',Auth::guard('api')->user()->id)->get();

          
            if(sizeof($product_list)){
                foreach ($product_list as $key => $value) {
                    if($value->status==1){
                        $status= "Active";
                    }else{
                        $status= "Deactive";
                    }

                    $productlist[]=array(
                        'value' => $value->id,
                        'label' => $value->name, 
                        'sku' => $value->sku, 
                        'image' => asset('public/uploads/product/').'/'.$value->image, 
                        'gst' => $value->gst_no, 
                        'unit' => $value->unit, 
                        'status' =>  $status, 
                    );
                }
            }else{
                 $productlist=[];
            }

            $gst_list = Gst::select()->get();
            $unit_list = Unit::select()->get();
            $bankmaster_list = Bank::select()->where('user_id', Auth::guard('api')->user()->id)->get();
             

            $main_array = array( 
                'website_list'=>$website,
                'courier_list'=>$courier,
                'bankmaster_list'=>$bankmaster,
                'return_reason_list'=>$return_reason,
                'product_list'=>$productlist,
                'gst_list'=>$gst_list,
                'unit_list'=>$unit_list,
                'bankmaster_list'=>$bankmaster_list
            );

            return response([
                'list'=>$main_array,
                'status'=>true
            ],200);
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    public function order_report(Request $request){
        if (Auth::guard('api')->check()) {
            $from_date = $request->input('from_date');
            $to_date = $request->input('to_date');
            $courier_id = $request->input('courier_id');
            $order_type = $request->input('order_type');
            $order_id = $request->input('order_id');
            $order_status = $request->input('order_status');
            $website_id = $request->input('website_id');
            $product_id = $request->input('product_id');
            if(!empty($order_id)){
                 $query = OrderEntry::select('*')
                      ->where('user_id',Auth::guard('api')->user()->id)
                      ->where('order_id','=',$order_id)
                      ->orwhere('awb_no','=',$order_id)
                      ->get();
              if(!sizeof($query)){
                 return response(['errors'=>'OrderId or AWB Not available.','status'=>false],422);
              }else{
               $order_id = $request->input('order_id');
              }
            }
            if(empty( $from_date )&& empty($to_date) && empty($order_type) && empty($order_status) && empty($order_id) && empty($courier_id) && empty($product_id) && empty($website_id)){
               return response(['errors'=>'Select minimum one option','status'=>false],422);
            }else{
                $result = OrderEntry::select('order.*','courier.name as courier_name','website.name as website_name','product.name as product_name')
                                ->join('courier', 'courier.id', '=', 'order.courier_id','left')
                                ->join('website', 'website.id', '=', 'order.website_id')
                                ->join('product', 'product.id', '=', 'order.product_id')
                                ->where('order.user_id',Auth::guard('api')->user()->id)
                                ->where(function ($query) use ($courier_id) {
                                    if(!empty($courier_id)){
                                        foreach($courier_id as $c) {
                                            $query->orWhere('order.courier_id', '=', $c);
                                        }
                                    }
                                })-> where(function ($query) use ($order_type) {
                                    if(!empty($order_type)){
                                        foreach($order_type as $o) {
                                            $query->orWhere('order.order_type', '=', $o);
                                        }
                                    }
                                })-> where(function ($query) use ($order_status) {
                                    if(!empty($order_status)){
                                        foreach($order_status as $os) {
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
                                })-> where(function ($query) use ($from_date) {
                                    if(!empty($from_date)){
                                        $query->orWhere('order.created_at', '>', $from_date);
                                    }
                                })-> where(function ($query) use ($to_date) {
                                    if(!empty($to_date)){
                                        $query->orWhere('order.created_at','<', $to_date);
                                    }
                                })->get();
                                

                    if(!sizeof($result)){
                        return response(['errors'=>'Data Not available.','status'=>false],422);
                    }else{
                        $result = $result;
                    }  

                    foreach ($result as $key) {
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
                            "order_type"=> $key['order_type'], 
                            "order_status"=> $key['order_status'], 
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
                          
                    return response([
                        'data'=>  $main,
                        'status'=> true
                    ],200);
            }
            

        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    public function Pending_order(Request $request){
        if (Auth::guard('api')->check()) {
            $order_id = $request->input('order_id');
    
            $validator = Validator::make($request->all(), [
                'order_id' =>'required',
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                $query = OrderEntry::select('*')
                      ->where('user_id',Auth::guard('api')->user()->id)
                      ->where('order_id','=',$order_id)
                      ->orwhere('awb_no','=',$order_id)
                      ->get();

                if(!sizeof($query)){
                     return response(['errors'=>'OrderId or AWB Not available.','status'=>false],422);
                }else{
                    $order_id = $request->input('order_id');
                    $query = OrderEntry::select('*')
                          ->where('user_id',Auth::guard('api')->user()->id)
                          ->where('order_id','=',$query[0]['order_id'])
                          ->whereNotIn('order_status', [1])
                          ->get(); 

                       


                    if(sizeof($query)){
                         return response(['errors'=>'Order is not in Pending Status.','status'=>false],422);
                    }else{
                        $result = OrderEntry::select('order.*','courier.name as courier_name','website.name as website_name','product.name as product_name')
                                ->join('courier', 'courier.id', '=', 'order.courier_id','left')
                                ->join('website', 'website.id', '=', 'order.website_id')
                                ->join('product', 'product.id', '=', 'order.product_id')
                                ->where('order.user_id',Auth::guard('api')->user()->id)
                                ->where(function($query)use ($order_id) {
                                        $query->where('order.order_id','=',$order_id)
                                              ->orWhere('order.awb_no','=',$order_id);
                                })->get(); 

                        return response([
                            'data'=> $result,
                            'status'=> true
                        ],200);
                    }
                }
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }

    }

    public function pickup_entry(Request $request){
        if (Auth::guard('api')->check()) {
            $data = $request->input('data');
            $dispatch_date = $request->input('dispatch_date');
            $courier_id = $request->input('courier_id');

            $validator = Validator::make($request->all(), [
                'courier_id' =>'required',
                 'dispatch_date' =>'required',
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{

                if(empty($data)){

                        return response(['amberrors'=>'check order for submit.','status'=>false],422);
                    

                }else{

                    foreach ($data as $key) {
                        if($key['isChecked']=='true'){
                            if(!empty($key['awb_no'])){
                                 OrderEntry::where('o_id', $key['o_id'])->update(array('awb_no' => $key['awb_no'],'courier_id'=>$courier_id,'dispatch_date'=>$dispatch_date,'order_status'=>2));
                            }else{
                                return response(['amberrors'=>'awb no is empty','status'=>false],422);
                            }
                        }
                    }
                    return response([
                                    'data'=>  'Pick up Entry updated',
                                    'status'=> true
                                ],200);
                }
            }

        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }
    public function amount_receive(Request $request){
        if (Auth::guard('api')->check()) {
            $data = $request->input('data');
            
            $amountreceive_date = $request->input('amountreceive_date');

            $validator = Validator::make($request->all(), [
                'amountreceive_date' =>'required',
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                foreach ($data as $key) {
                    if($key['isChecked']=='true'){
                        if(!empty($key['receive_amount'])){

                            $amt = new Amount_receive;
                            $amt->o_id = $key['o_id'];
                            $amt->amount =$key['receive_amount'];
                            $amt->save();
                            
                            OrderEntry::where('o_id', $key['o_id'])->update(array('receive_amount' => $key['receive_amount'],'amountreceive_date'=>$amountreceive_date));
                        }else{
                            return response(['amounterrors'=>'Amount is empty','status'=>false],422);
                        }
                    }

                }
                return response([
                                'data'=>'Amount updated',
                                'status'=> true
                            ],200);
             }

        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    public function amount_receive_data(Request $request){
        if (Auth::guard('api')->check()) {
            $order_id = $request->input('order_id');
    
            $validator = Validator::make($request->all(), [
                'order_id' =>'required',
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                $query = OrderEntry::select('*')
                      ->where('user_id',Auth::guard('api')->user()->id)
                      ->where('order_id','=',$order_id)
                      ->orwhere('awb_no','=',$order_id)
                      ->get();

                if(!sizeof($query)){
                     return response(['errors'=>'OrderId or AWB Not available.','status'=>false],422);
                }else{
                
                    $result = OrderEntry::select('order.*','courier.name as courier_name','website.name as website_name','product.name as product_name')
                            ->join('courier', 'courier.id', '=', 'order.courier_id','left')
                            ->join('website', 'website.id', '=', 'order.website_id')
                            ->join('product', 'product.id', '=', 'order.product_id')
                            ->where('order.user_id',Auth::guard('api')->user()->id)
                            ->where(function($query)use ($order_id) {
                                    $query->where('order.order_id','=',$order_id)
                                          ->orWhere('order.awb_no','=',$order_id);
                            })->get(); 

                    return response([
                        'data'=> $result,
                        'status'=> true
                    ],200);
                }
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }
    public function flipcartexcelsave(Request $request){
        if (Auth::guard('api')->check()) {
            $data = $request->input('data');
            foreach ($data as $value =>$key ) {
                $product = Product::select('*')->where('sku','=',$key['SKU'])->get();

                $order = OrderEntry::select('*')
                      ->where('user_id',Auth::guard('api')->user()->id)
                      ->where('order_id','=',$key['Order_Id'])
                      ->where('website_id','=',3)
                      ->get();
                      
                if(!sizeof($order)){
                    $order = new OrderEntry;
                    $order->website_id = 3;
                    $order->order_id = $key['Order_Id']; 
                    $order->product_id = $product[0]['id'];
                    $order->qty = $key['Quantity'];
                    $order->awb_no = $key['Tracking_ID'];
                    $order->upload_date = date_format(date_create($key['Ordered_On']),"Y-m-d");
                    $order->order_amount = $key['Invoice_Amount'];
                    $order->order_status = 1;
                    $order->upload_type = 'Excel'; 
                    $order->note = $request->input('note');
                    $order->user_id = Auth::guard('api')->user()->id;
                    $order->save();
                }else{
                    return response(['errors'=>'order alredy uploaded','status'=>false],422);
                }
            }
                
            $response = ['message' => 'Order Detail added successfully','status'=>true];
            return response($response, 200);
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }

    }
    public function pdfread(Request $request){
        if (Auth::guard('api')->check()) {

            $validator = Validator::make($request->all(), [
                'file' =>'required',
                'website'=>'required'
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{

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
          

                foreach ($responseBody as $key =>$value) {
                    for ($i=0; $i <count($value['column_data']) ; $i++) { 
                        $main_array[]=  array(
                            'orderno'=> $value['column_data'][$i]['Sub Order No.'],
                            'AWB'=> $value['column_data'][$i]['AWB'],
                            'Qty'=> $value['column_data'][$i]['Qty.'],
                            'SKU'=> $value['column_data'][$i]['SKU'],
                            'courier_name'=> $value['courier']
                        );
                    }  
                }

                foreach ($main_array as $key ) {
                    $product = Product::select('*')->where('sku','=',$key['SKU'])->get();

                    $order = OrderEntry::select('*')
                          ->where('user_id',Auth::guard('api')->user()->id)
                          ->where('order_id','=',$key['orderno'])
                          ->where('website_id','=',11)
                          ->get();

                    if(!sizeof($order)){

                        $order = new OrderEntry;
                        $order->website_id = $request->input('website');
                        $order->order_id = $key['orderno']; 
                        $order->product_id = $product[0]['id'];
                        $order->qty = $key['Qty'];
                        $order->awb_no = $key['AWB'];
                        $order->upload_date = date("Y-m-d");
                        //$order->order_amount = $key['Invoice_Amount'];
                        $order->order_status = 1;
                        $order->upload_type = 'Excel'; 
                        //$order->note = $request->input('note');
                        $order->user_id = Auth::guard('api')->user()->id;
                        $order->save();
                    }else{
                        $file_path =public_path('uploads/meeshopdf').'/'.$fileName;
                        unlink($file_path);
                        return response(['errors'=>'order alredy uploaded','status'=>false],422);
                    }
                 
                }

                $response = ['message' => 'Order Detail added successfully','status'=>true];
                    return response($response, 200);
            }

        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }

    }

    public function txtread(Request $request){
        if (Auth::guard('api')->check()) {

            $validator = Validator::make($request->all(), [
                'file' =>'required',
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{

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


                foreach ($array as $key => $value) {
           
                    $product = Product::select('*')->where('sku','=',$value['sku'])->where('user_id','=',Auth::guard('api')->user()->id)->get();

                    if(!sizeof($product)){
                        return response(['errors'=>'Product not found in list','status'=>false],422);
                    }

                    $courier = Courier::select('*')->where('name','=',str_replace("\r","",$value['carrier']))->where('user_id','=',Auth::guard('api')->user()->id)->get();
                    if(!sizeof($courier)){
                        return response(['errors'=>'courier not found in list','status'=>false],422);
                    }


                    $order = OrderEntry::select('*')
                          ->where('user_id',Auth::guard('api')->user()->id)
                          ->where('order_id','=',$value['order-id'])
                          ->where('website_id','=',2)
                          ->get();

                    if(!sizeof($order)){
                        $order = new OrderEntry;
                        $order->website_id = 2;
                        $order->order_id = $value['order-id']; 
                        $order->product_id = $product[0]['id'];
                        $order->qty = $value['quantity-purchased']; 
                        $order->awb_no = $value['tracking-id']; 
                        $order->upload_date = date_format(date_create($value['purchase-date']),"Y-m-d");
                        $order->courier_id = $courier[0]['id'];
                        $order->order_status = 1;
                        $order->upload_type = 'Excel'; 
                        $order->note = $request->input('note');
                        $order->user_id = Auth::guard('api')->user()->id;
                        //print_r($order);
                        $order->save();
                        
                    }else{
                     
                        $file_path =public_path('uploads/amazonefile').'/'.$fileName;
                        unlink($file_path);
                        return response(['errors'=>'order alredy uploaded','status'=>false],422);
                    }
                }
                $response = ['message' => 'Order Detail added successfully','status'=>true];
                return response($response, 200);
            }
      
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }

    }
    public function meesho_data(Request $request){
        if (Auth::guard('api')->check()) {
            $data = $request->input('data');
           

            foreach ($data as $value =>$key ) {

                $product = Product::select('*')->where('sku','=',$key['SKU'])->get();

                $order = OrderEntry::select('*')
                      ->where('user_id',Auth::guard('api')->user()->id)
                      ->where('order_id','=',$key['Sub Order No.'])
                      ->where('website_id','=',11)
                      ->get();
                $courier = Courier::select('*')->where('name','=',str_replace("\r","",$key['courier']))->where('user_id','=',Auth::guard('api')->user()->id)->get();


                if(!sizeof($courier)){
                    return response(['errors'=>'courier not found in list','status'=>false],422);
                }

                if(!sizeof($product)){
                    return response(['errors'=>'Product not found in list','status'=>false],422);
                }

                if(!sizeof($order)){
                    $order = new OrderEntry;
                    $order->website_id = 11;
                    $order->order_id = $key['Sub Order No.']; 
                    $order->product_id = $product[0]['id'];
                     $order->qty = $key['Qty.'];
                    // $order->awb_no = $key['AWB'];
                    // $order->courier_id = $courier[0]['id'];
                     $order->upload_type = 'Excel'; 
                    $order->user_id = Auth::guard('api')->user()->id;
                    $order->save();

                }else{
                    return response(['errors'=>'order alredy uploaded','status'=>false],422);
                }
            }
                
            $response = ['message' => 'Order Detail added successfully','status'=>true];
            return response($response, 200);
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }

    }
}