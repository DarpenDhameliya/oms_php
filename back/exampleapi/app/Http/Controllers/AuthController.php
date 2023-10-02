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
use App\Models\Wallet_transaction;
use App\Models\site;
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



use Illuminate\Support\Facades\DB;
use App\Imports\OrderImport;
use App\Imports\OrderImportexcel;
use App\Imports\PaymentImport;
use Maatwebsite\Excel\Facades\Excel;
use File;




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
    public function tokensExpire($token){
        $user= User::where('remember_token', $token)
                    ->where('id',Auth::guard('api')->user()->id)
                    ->get();


        if(sizeof($user)){
             return 1;
        }else{
            return 0;
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
        $token = $request->header('Authorization');
        print_r($this->tokensExpire($token ));

        if($this->tokensExpire($request->header('Authorization'))==1){
            echo "string";

        }else{
            echo "strigjhgjng";
        }
         /*if (Auth::guard('api')->check()) {

            echo "login";

        } else {

              echo "not login";

        }*/

die();

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
      
          if($this->tokensExpire($request->header('Authorization'))==1){
       // if (Auth::guard('api')->check()) {
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
                $img->resize(500, 500, function ($constraint) {
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
             return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    

    public function get_product(Request $request,$sku){
        if($this->tokensExpire($request->header('Authorization'))==1){
        //if (Auth::guard('api')->check()) {
            $get_product = Product::select('gst.gst_no','unit.unit','product.*')->leftjoin('gst', 'gst.id', '=', 'product.gst_id')->join('unit', 'unit.id', '=', 'product.unit_id')->where('user_id',Auth::guard('api')->user()->id)->where('sku',$sku)->get();
        
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
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
           
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
                           /* $fileName = time().'.'.$request->image->extension(); 
                            $request->image->move(public_path('uploads/product'), $fileName);*/

                            $image = $request->file('image');
                            $fileName = time().'.'.$request->image->extension(); 
                            $destinationPath = public_path('uploads/product');
                            $img = Image::make($image->path());
                            $img->resize(500, 500, function ($constraint) {
                                $constraint->aspectRatio();
                            })->save($destinationPath.'/'.$fileName);

                        }else{
                            /*$fileName = time().'.'.$request->image->extension(); 
                            $request->image->move(public_path('uploads/product'), $fileName);*/
                            $image = $request->file('image');
                            $fileName = time().'.'.$request->image->extension(); 
                            $destinationPath = public_path('uploads/product');
                            $img = Image::make($image->path());
                            $img->resize(500, 500, function ($constraint) {
                                $constraint->aspectRatio();
                            })->save($destinationPath.'/'.$fileName);
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
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
            $get_product = Product::select('*')->where('user_id',Auth::guard('api')->user()->id)->where('sku', $sku)->get();
            if(sizeof($get_product)>0){

                $order = OrderEntry::select('*')->where('product_id',$get_product[0]['id'])->get();

                if(sizeof($order)>0){
                    $response = ['message' => "You Can't Delete this Product.",'status'=>false];
                    return response($response, 422);

                }else{
                    unlink(public_path('uploads/product/').$get_product[0]['image']);
                    Product::where('sku',$sku)->delete();
                    $response = ['message' => 'Product Delete Sucessfully','status'=>true];
                    return response($response, 200);
                }
            }else{
                $response = ['message' => 'Product Not Found','status'=>false];
                return response($response, 422);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    
    public function add_website(Request $request){
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
                $query = Website::select('name')->where('user_id',Auth::guard('api')->user()->id)->get();

            $validator = Validator::make($request->all(), [
                'name' => ['required',Rule::unique('website')->where(function ($query) {
                    return $query->where('user_id', Auth::guard('api')->user()->id);
                })],
                'site_id'=>'required' 
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                $website = new Website;
                $website->name = $request->input('name');
                $website->user_id = Auth::guard('api')->user()->id;
                $website->site_id =$request->input('site_id');
                $website->save();
                $response = ['message' => 'Website added successfully','status'=>true];
                return response($response, 200);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    

     public function edit_website(Request $request,$id){
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
            $query = Website::select('name')->where('user_id',Auth::guard('api')->user()->id)->get();

            $validator = Validator::make($request->all(), [
                'name' => ['required',Rule::unique('website')->ignore($query[0]->name,'name')->where(function ($query) {
                    return $query->where('user_id', Auth::guard('api')->user()->id);
                })->ignore($id, 'id')],
                'site_id'=>'required'
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                Website::where('id', $id)->update(array('name' => $request->input('name'),'site_id'=>$request->input('site_id')
            ));

                $response = ['message' => 'Website updated successfully','status'=>true];
                return response($response, 200);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

     public function delete_website(Request $request,$id){
        
//if (Auth::guard('api')->check()) {
if($this->tokensExpire($request->header('Authorization'))==1){
            $get_website = Website::select('*')->where('user_id',Auth::guard('api')->user()->id)->where('id', $id)->get();
            if(sizeof($get_website)>0){
                 $order = OrderEntry::select()->where('website_id',$get_website[0]['id'])->get();

                if(sizeof($order)>0){
                    $response = ['message' => "You Can't Delete this Website.",'status'=>false];
                    return response($response, 422);

                }else{
                    Website::where('id',$id)->delete();
                    $response = ['message' => 'Website Delete Sucessfully','status'=>true];
                    return response($response, 200);
                }
            }else{
                $response = ['message' => 'Website Not Found','status'=>false];
                return response($response, 422);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    public function get_website(Request $request,$id){
        
//if (Auth::guard('api')->check()) {
if($this->tokensExpire($request->header('Authorization'))==1){
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
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
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
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
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
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
            $get_courier = Courier::select('*')->where('id',$id)->get();
            if(sizeof($get_courier)>0){
                 $order = OrderEntry::select('*')->where('courier_id',$get_courier[0]['id'])->get();
                  
                 if(sizeof($order)>0){
                    $response = ['message' => "You Can't Delete this Courier.",'status'=>false];
                    return response($response, 422);

                }else{

                    Courier::where('id',$id)->delete();
                    $response = ['message' => 'Courier Delete Sucessfully','status'=>true];
                    return response($response, 200);
                }
            }else{
                $response = ['message' => 'Courier Not Found','status'=>false];
                return response($response, 422);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    public function get_courier(Request $request,$id){
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
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
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
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
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
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
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){

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
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
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
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
            $validator = Validator::make($request->all(), [
                'website_id' =>'required',
                'order_id' =>'required|unique:order',
                'product_id' =>'required',
                'qty' =>'required',    
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                if(Auth::guard('api')->user()->wallet_balance<=0){
                    return response(['errors'=>'Recharge your WalletBalance.','status'=>false],422); 
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

                    $transaction = new Wallet_transaction;
                    $transaction->user_id =Auth::guard('api')->user()->id ; 
                    $transaction->main_charge = Auth::guard('api')->user()->charge ; 
                    $transaction->opening_balance = Auth::guard('api')->user()->wallet_balance; 
                    $transaction->total_charge = Auth::guard('api')->user()->charge;    
                    $transaction->closing_balance =Auth::guard('api')->user()->wallet_balance - Auth::guard('api')->user()->charge; 
                    $transaction->type = 'manual';    
                    $transaction->save();

                    User::where('id',Auth::guard('api')->user()->id)->update(array('wallet_balance' => Auth::guard('api')->user()->wallet_balance - Auth::guard('api')->user()->charge));

                    $response = ['message' => 'Order Detail added successfully','status'=>true];
                    return response($response, 200);
                }
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    } 

    public function all_list(Request $request){
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
            
            $website_list = Website::select()->where('user_id', Auth::guard('api')->user()->id)->get();
            foreach ($website_list as $key) {
                $website[]=array('value'=>$key['id'],'label'=>$key['name'] ,'site_id'=>$key['site_id']);
            }
            $site_list = site::select()->get();
            foreach ($site_list as $key) {
                $site[]=array('value'=>$key['id'],'label'=>$key['site']);
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
                $return_reason[]=array('value'=>$key['id'],'label'=>$key['reason']);
            }


            $product_list = Product::select('gst.gst_no','unit.unit','product.*')->leftjoin('gst', 'gst.id', '=', 'product.gst_id')->join('unit', 'unit.id', '=', 'product.unit_id')->where('user_id',Auth::guard('api')->user()->id)->get();

          
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
                'bankmaster_list'=>$bankmaster_list,
                'site_list'=>$site_list
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
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
            

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
                                })
                                -> where(function ($query) use ($from_date) {
                                    if(!empty($from_date)){
                                        $query->orWhere('order.created_at', '>=', $from_date);
                                    }
                                })-> where(function ($query) use ($to_date) {
                                    if(!empty($to_date)){
                                        $query->orWhere('order.created_at','<=', $to_date);
                                    }
                                });

                                if(empty($request->input('per_page'))){
                                    $result = $result->get();
                                }else{
                                     $result = $result->paginate($request->input('results', $request->input('per_page') ));
                                }
                                


   


                    if(sizeof($result)==0){
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
                        'data'=>  $result,
                        'status'=> true
                    ],200);
            }
            

        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    public function Pending_order(Request $request){
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
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
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
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
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){

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
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
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
    public function flipcartread(Request $request){
        
        if($this->tokensExpire($request->header('Authorization'))==1){

            $validator = Validator::make($request->all(), [
                'file' =>'required',
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{


                $website=Website::where('site_id',1)->where('user_id',Auth::guard('api')->user()->id)->get();

                $fileName = time().'.'.$request->file->getClientOriginalExtension(); 
               // print_r($request->file->getClientOriginalExtension());


                if($request->file->extension()=="csv"){

                    $flipcart_data=[];
                    $duplicate_data=[];
                    Excel::store(new OrderImport(), 'uploads/flipcartexcel/'.$fileName, 'real_public');
                    $data =  Excel::toArray(new OrderImport, request()->file('file'));


                    foreach($data[0] as $key => $value){

                       if(isset($value['sku'])){
                            $product = Product::select('*')->where('sku','=',$value['sku'])->where('user_id','=',Auth::guard('api')->user()->id)->get();

                            if(!sizeof($product)){ 
                   
                                //return response(['errors'=>'Product not found in list','status'=>false],422);
                                $product_data = array(
                                    "name"=>$value['product'],    
                                    "sku"=>$value['sku'], 
                                    "image"=>null,   
                                    "gst_id"=>null,  
                                    "unit_id"=>1, 
                                    "status"=>1,
                                    "user_id"=>Auth::guard('api')->user()->id, 
                                );             
                                Product::create($product_data);
                               
                            }

                            $order = OrderEntry::select('*')
                                  ->where('user_id',Auth::guard('api')->user()->id)
                                  ->where('order_id','=',$value['order_id'])
                                  ->get();

                            $product = Product::select('*')->where('sku','=',$value['sku'])->where('user_id','=',Auth::guard('api')->user()->id)->get();

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
                            return response(['errors'=>'Import Flipcart file.','status'=>false],422);
                        }
                    }
                }else{
                   

                   $flipcart_data=[];
                    $duplicate_data=[];
                    Excel::store(new OrderImportexcel(), 'uploads/flipcartexcel/'.$fileName, 'real_public');
                    $data =  Excel::toArray(new OrderImportexcel, request()->file('file'));

                    foreach($data['Orders'] as $key => $value){
                        
                        if($key!=0){

                            

                            if(isset($value[7])){
                                $product = Product::select('*')->where('sku','=',$value[7])->where('user_id','=',Auth::guard('api')->user()->id)->get();
                               

                                if(!sizeof($product)){ 
                       
                                    
                                    $product_data = array(
                                        "name"=>$value['9'],    
                                        "sku"=>$value['7'], 
                                        "image"=>null,   
                                        "gst_id"=>null,  
                                        "unit_id"=>1, 
                                        "status"=>1,
                                        "user_id"=>Auth::guard('api')->user()->id, 
                                    );             
                                    Product::create($product_data);
                                   
                                }

                                $order = OrderEntry::select('*')
                                      ->where('user_id',Auth::guard('api')->user()->id)
                                      ->where('order_id','=',$value['1'])
                                      ->get();

                                $product = Product::select('*')->where('sku','=',$value[7])->where('user_id','=',Auth::guard('api')->user()->id)->get();
                              

                                if(!sizeof($order)){
                                   
                                   
                                    $flipcart_data[] = array(
                                        "order_id" => $value[1],
                                        "product_id" => $product[0]['id'],
                                        "product_name" => $product[0]['name'],
                                        "qty" => $value[10],
                                        "awb_no" => $value[13],
                                        'upload_date' => date('Y-m-d',strtotime(date_format(date_create($value[4]),"Y-m-d"))),
                                       // 'invoice_amount'=>$value['invoice_amount']
                                    );
                                      
                                }else{
                                     
                                    
                                    $duplicate_data[] = array(
                                        "order_id" => $value[1],
                                        "product_id" => $product[0]['id'],
                                        "product_name" => $product[0]['name'],
                                        "qty" => $value[10],
                                        "awb_no" => $value[13],
                                        'upload_date' => date('Y-m-d',strtotime(date_format(date_create($value[4]),"Y-m-d"))),
                                        //'invoice_amount'=>$value['invoice_amount']
                                    );     
                                }
                            }else{
                                return response(['errors'=>'Import Flipcart file.','status'=>false],422);
                            }

                        }
                    }

                }
               
                return response([
                    'duplicate_data'=>$duplicate_data,
                    'flipcart_data'=>$flipcart_data,
                    'status'=>true
                ],200);
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }

    }

    public function insert_flipcartexcel(Request $request){
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
            $data = $request->input('data');
          
            if($data!=""){
                if(!empty($request->input('website_id'))){

                    if(Auth::guard('api')->user()->wallet_balance<=0){
                        return response(['errors'=>'Recharge your WalletBalance.','status'=>false],422); 
                    }else{

                        foreach ($data as $value) {
                            $order = new OrderEntry;
                            $order->website_id =$request->input('website_id');
                            $order->order_id =$value['order_id'];
                            $order->product_id = $value['product_id'];
                            $order->qty = $value['qty'];
                            $order->awb_no = $value['awb_no'];
                            $order->upload_date = date("Y-m-d");
                            $order->order_status = 1;
                            $order->upload_type = 'Excel'; 
                            $order->user_id = Auth::guard('api')->user()->id;
                            $order->save();
                        }

                        $transaction = new Wallet_transaction;
                        $transaction->user_id =Auth::guard('api')->user()->id ; 
                        $transaction->main_charge = Auth::guard('api')->user()->charge ; 
                        $transaction->opening_balance = Auth::guard('api')->user()->wallet_balance; 
                        $transaction->total_charge = count($data)*Auth::guard('api')->user()->charge;    
                        $transaction->closing_balance =Auth::guard('api')->user()->wallet_balance - (count($data)*Auth::guard('api')->user()->charge); 
                        $transaction->type = 'Excel';    
                        $transaction->excel_filename = $request->input('filename'); ;  
                        $transaction->exceldata_count = count($data);
                        $transaction->save();

                        User::where('id',Auth::guard('api')->user()->id)->update(array('wallet_balance' =>Auth::guard('api')->user()->wallet_balance - (count($data)*Auth::guard('api')->user()->charge)));

                        return response(["result"=>true], 200);    
                        
                    }
                }else{
                     return response(['errors'=>'websiteId is Required','status'=>false],422); 
                }
            }else{
                 return response(['errors'=>'Select Atleast one Entry.','status'=>false],422); 
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }
    public function amazonefileread(Request $request){
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){

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

                $duplicate_data= [];
                $amazone_data= [];


                foreach ($array as $key => $value) {
           
                    $product = Product::select('*')->where('sku','=',$value['sku'])->where('user_id','=',Auth::guard('api')->user()->id)->get();

                    if(!sizeof($product)){
                        //return response(['errors'=>'Product not found in list','status'=>false],422);
                         $product_data = array(
                            "name"=>$value['product-name'],    
                            "sku"=>$value['sku'], 
                            "image"=>null,   
                            "gst_id"=>null,  
                            "unit_id"=>1, 
                            "status"=>1,
                            "user_id"=>Auth::guard('api')->user()->id, 
                        );             
                        Product::create($product_data);
                    }
  
                     if(isset($value['carrier'])){
                        $courier = Courier::select('*')->where('name','=',str_replace("\r","",$value['carrier']))->where('user_id','=',Auth::user()->id)->get();
                        if(!sizeof($courier)){
                            return response(['errors'=>'courier not found in list','status'=>false],422); 
                        }else{
                            $courier_id = $courier[0]['id'];
                            $courier_name = $courier[0]['name'];
                        }
                    }else{
                        $courier_id='';
                        $courier_name ='';
                    }


                   $order = OrderEntry::select('*')
                          ->where('user_id',Auth::guard('api')->user()->id)
                          ->where('order_id','=',$value['order-id'])
                          ->get();

                    if(isset($value['item-price'])){ 
                        $itemprice = $value['item-price'];
                    }else{
                        $itemprice = '';
                    }
                    if(!sizeof($order)){
                        if(isset($value['tracking-id'])){ 
                            $awb = $value['tracking-id'];
                        }else{
                            $awb = '';
                        }

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
                            "item-price"=> $itemprice,
                        );
                       

                    }else{

                        $duplicate_data[] = array(
                            "website_id" => $request->input('website'),
                            "order_id" => $value['order-id'],
                            "product_id" => $product[0]['id'],
                            "product_name" => $product[0]['name'],
                            "qty" => $value['quantity-purchased'],
                            "awb_no" => $order[0]['awb_no'],
                            "upload_date" => date_format(date_create($value['purchase-date']),"Y-m-d"),
                            "courier_id" => $courier_id,
                            "courier_name" => $courier_name,
                            "item-price"=> $itemprice,
                        );
                       

                        $file_path =public_path('uploads/amazonefile').'/'.$fileName;
                        unlink($file_path);
                         //return response(['errors'=>'order alredy uploaded','status'=>false],422);
                    }

/*
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
                    }*/
                }
            }
                return response([
                    'duplicate_data'=>$duplicate_data,
                    'amazone_data'=>$amazone_data,
                    'status'=>true
                ],200);
      
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    public function insert_amazoneexcel(Request $request){
         
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){

            $data = $request->input('data');
            if($data!=""){
                if(!empty($request->input('website_id'))){


                    if(Auth::guard('api')->user()->wallet_balance<=0){
                        return response(['errors'=>'Recharge your WalletBalance.','status'=>false],422); 
                    }else{

                        if(!empty($data)){
                            foreach ($data as $value) { 
                                $order = new OrderEntry;
                                $order->website_id =$request->input('website_id');
                                $order->order_id =$value['order_id'];
                                $order->product_id = $value['product_id'];
                                $order->qty = $value['qty'];
                                $order->awb_no = $value['awb_no'];
                                $order->upload_date = date("Y-m-d");
                                $order->order_status = 1;
                                $order->upload_type = 'Excel'; 
                                $order->user_id = Auth::guard('api')->user()->id;
                                $order->save();
                            }

                            $transaction = new Wallet_transaction;
                            $transaction->user_id =Auth::guard('api')->user()->id ; 
                            $transaction->main_charge =Auth::guard('api')->user()->charge ; 
                            $transaction->opening_balance = Auth::guard('api')->user()->wallet_balance; 
                            $transaction->total_charge = count($data)*Auth::guard('api')->user()->charge;    
                            $transaction->closing_balance =Auth::guard('api')->user()->wallet_balance - (count($data)*Auth::guard('api')->user()->charge); 
                            $transaction->type = 'Excel';    
                            $transaction->excel_filename = $request->input('filename'); ;  
                            $transaction->exceldata_count = count($data);
                            $transaction->save();

                            User::where('id',Auth::guard('api')->user()->id)->update(array('wallet_balance' =>Auth::guard('api')->user()->wallet_balance - (count($data)*Auth::guard('api')->user()->charge)));

                            return response(["result"=>true], 200);    
                        }
                    }
                }else{
                     return response(['errors'=>'websiteId is Required','status'=>false],422); 
                }
            }else{
                 return response(['errors'=>'Select Atleast one Entry.','status'=>false],422); 
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }

    }

    public function meeshofileread(Request $request){
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
             $website=Website::where('site_id',3)->where('user_id',Auth::guard('api')->user()->id)->get();
            
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
                $product = Product::select('*')->where('sku','=',$key['SKU'])->where('user_id','=',Auth::guard('api')->user()->id)->get();

                if(!sizeof($product)){
                   // return response(['errors'=>'Product not found in list','status'=>false],422);
                     $product_data = array(
                                    "name"=>$value['product'],    
                                    "sku"=>$value['sku'], 
                                    "image"=>null,   
                                    "gst_id"=>null,  
                                    "unit_id"=>1, 
                                    "status"=>1,
                                    "user_id"=>Auth::guard('api')->user()->id, 
                                );             
                                Product::create($product_data);

                }

                $order = OrderEntry::select('*')
                      ->where('user_id',Auth::guard('api')->user()->id)
                      ->where('order_id','=',$key['orderno'])
                      ->get();
                      $product = Product::select('*')->where('sku','=',$key['SKU'])->where('user_id','=',Auth::guard('api')->user()->id)->get();

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
            return response([
                    'duplicate_data'=>$duplicate_data,
                    'meesho_data'=>$meesho_data,
                    'status'=>true
            ],200);
          
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }
    public function insert_meeshopdf(Request $request){
        $data = $request->input('data');
      
        if($data!=""){
            if(!empty($request->input('website_id'))){
                if(Auth::guard('api')->user()->wallet_balance<=0){
                      return response(['errors'=>'Recharge your WalletBalance.','status'=>false],422); 
                }else{
                    foreach ($data as $value) {
                        $order = new OrderEntry;
                        $order->website_id =$request->input('website_id');
                        $order->order_id =$value['order_id'];
                        $order->product_id = $value['product_id'];
                        $order->qty = $value['qty'];
                        $order->awb_no = $value['awb_no'];
                        $order->upload_date = date("Y-m-d");
                        $order->order_status = 1;
                        $order->upload_type = 'Excel'; 
                        $order->user_id =Auth::guard('api')->user()->id;
                        $order->save();
                    }

                    $transaction = new Wallet_transaction;
                    $transaction->user_id =Auth::guard('api')->user()->id ; 
                    $transaction->main_charge = Auth::guard('api')->user()->charge ; 
                    $transaction->opening_balance = Auth::guard('api')->user()->wallet_balance; 
                    $transaction->total_charge = count($data)*Auth::guard('api')->user()->charge;    
                    $transaction->closing_balance =Auth::guard('api')->user()->wallet_balance - (count($data)*Auth::guard('api')->user()->charge); 
                    $transaction->type = 'Excel';    
                    $transaction->excel_filename = $request->input('filename'); ;  
                    $transaction->exceldata_count = count($data);
                    $transaction->save();

                    User::where('id',Auth::guard('api')->user()->id)->update(array('wallet_balance' =>Auth::guard('api')->user()->wallet_balance - (count($data)*Auth::guard('api')->user()->charge)));
                    return response()->json(["result"=>true]);     
                }
            }else{
                 return response(['errors'=>'websiteId is Required','status'=>false],422); 
            }
        }else{
             return response(['errors'=>'Select Atleast one Entry.','status'=>false],422); 
        }
    }
    public function payment_receive_report(Request $request){
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
             $validator = Validator::make($request->all(), [
                'from_date' => 'required',
                'to_date' => 'required',       
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all()], 422);
            }else{
                
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
                                    ->where('order.user_id',Auth::guard('api')->user()->id)
                                    ->groupBy('order.website_id');
                                if(empty($request->input('per_page'))){
                                    $queries = $queries->get();
                                }else{
                                     $queries = $queries->paginate($request->input('results', $request->input('per_page') ));
                                } 
                                 

                if(!sizeof($queries)){
                    return response(['errors'=>'Data Not available.','status'=>false],422); 
                }else{
                    foreach ($queries as $k => $v) {      
                        $main[]= array(
                            'website_id'=>$v->website_id,
                            'website_name'=>$v->name,
                            'data'=>$this->get_data($v->website_id,$from_date,$to_date),
                            'get_paymentdata'=>$this->get_paymentdata($v->website_id,$from_date,$to_date)
                            
                        );       
                    }
                } 

               return response([
                        'data'=>$main,
                        'status'=>true
                ],200);
            }

        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
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
                                    ->where('order.user_id',Auth::guard('api')->user()->id) ->get();
    }
    public function  get_paymentdata($website_id,$from_date,$to_date){
        

        return OrderEntry::select('order.*','website.name','product.name as product_name','courier.name as courier_name')->where('order.user_id',Auth::guard('api')->user()->id) ->join('website', 'website.id', '=', 'order.website_id')->join('product', 'product.id', '=', 'order.product_id')->join('courier', 'courier.id', '=', 'order.courier_id')
                                    ->where(function ($query) use ($from_date) {
                                        if(!empty($from_date)){
                                            $query->orWhere('order.amountreceive_date', '>=', $from_date);
                                        }
                                    })-> where(function ($query) use ($to_date) {
                                        if(!empty($to_date)){
                                            $query->orWhere('order.amountreceive_date','<=', $to_date);
                                        }
                                    })->where('order.user_id',Auth::guard('api')->user()->id)
                                    ->where('order.website_id',$website_id)->get();
                                

    }
    public function paymentdata(Request $request){
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
            $validator = Validator::make($request->all(), [
                'from_date' => 'required',
                'to_date' => 'required',  
                'website_id'=>'required'  
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all()], 422);
            }else{
                $from_date = date_format(date_create($request->input('from_date')),"Y-m-d");
                $to_date = date_format(date_create($request->input('to_date')),"Y-m-d");
                $website_id = $request->input('website_id');
                
                $main  = OrderEntry::select('order.*','website.name','product.name as product_name','courier.name as courier_name')->where('order.user_id',Auth::guard('api')->user()->id) ->join('website', 'website.id', '=', 'order.website_id')->join('product', 'product.id', '=', 'order.product_id')->join('courier', 'courier.id', '=', 'order.courier_id')
                                    ->where(function ($query) use ($from_date) {
                                        if(!empty($from_date)){
                                            $query->orWhere('order.amountreceive_date', '>=', $from_date);
                                        }
                                    })-> where(function ($query) use ($to_date) {
                                        if(!empty($to_date)){
                                            $query->orWhere('order.amountreceive_date','<=', $to_date);
                                        }
                                    })->where('order.user_id',Auth::guard('api')->user()->id)
                                    ->where('order.website_id',$website_id);

                                if(empty($request->input('per_page'))){
                                    $main = $main->get();
                                }else{
                                     $main = $main->paginate($request->input('results', $request->input('per_page') ));
                                } 
                                   

                return response([
                    'data'=>$main,
                    'status'=>true
                ],200);  
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }
    public function transaction_report(Request $request){
        
    //if (Auth::guard('api')->check()) {
    if($this->tokensExpire($request->header('Authorization'))==1){
            $validator = Validator::make($request->all(), [
                'from_date' => 'required',
                'to_date' => 'required',       
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all()], 422);
            }else{
                $from_date = date_format(date_create($request->input('from_date')),"Y-m-d");
                $to_date = date_format(date_create($request->input('to_date')),"Y-m-d")."23:59:59.999";

                $main = Wallet_transaction::select('wallet_transaction.*')
                                    ->where('wallet_transaction.user_id',Auth::guard('api')->user()->id) 
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
                                    ->orderBy('wallet_transaction.id', 'asc');

                                if(empty($request->input('per_page'))){
                                    $main = $main->get();
                                }else{
                                     $main = $main->paginate($request->input('results', $request->input('per_page') ));
                                } 

                if(!sizeof($main)){
                     return response(['errors'=>'Data Not available.','status'=>false],422); 
                }else{
                   
                    return response([
                        'data'=>$main,
                        'status'=>true
                    ],200);
                }
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }
     public function get_returndata(Request $request){
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
            $order_id = $request->input('order_id');
            $order_status = \Config::get('data.order_status');
            $order_type = \Config::get('data.order_type');


            $query = OrderEntry::select('*')
                      ->where('user_id',Auth::guard('api')->user()->id)
                      ->where('order_id','=',$order_id)
                      ->orwhere('awb_no','=',$order_id)
                      ->get();

            if(!sizeof($query)){
                 return response(['errors'=>'OrderId or AWB Not available.','status'=>false],422);
            }else{
               
                $query = OrderEntry::select('*')
                      ->where('user_id',Auth::guard('api')->user()->id)
                      ->where('order_id','=',$query[0]['order_id'])
                      ->whereNotIn('order_status', [4,5,6,7])
                      ->get(); 

                if(!sizeof($query)){
                    return response(['errors'=>'Order in Return Status Already.','status'=>false],422);
                }else{
                    $result = OrderEntry::select('order.*','courier.name as courier_name','website.name as website_name','product.name as product_name')->join('courier', 'courier.id', '=', 'order.courier_id','left')
                            ->join('website', 'website.id', '=', 'order.website_id')
                            ->join('product', 'product.id', '=', 'order.product_id')
                            ->where('order.user_id',Auth::guard('api')->user()->id)
                            ->where(function($query)use ($order_id) {
                                    $query->where('order.order_id','=',$order_id)
                                          ->orWhere('order.awb_no','=',$order_id);
                            })->get();

                            /*if(!empty($result[0]['order_type'])){
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
                            );*/
                           
                   
                     return response([
                        'data'=>$result,
                        'status'=>true
                    ],200);
                }
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }

    public function insert_returndata(Request $request){
      
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
            $data = $request->input('data');
            
            $return_date = $request->input('return_date');

            $validator = Validator::make($request->all(), [
                'return_date' =>'required',
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                foreach ($data as $key) {
                    if($key['isChecked']=='true'){
                        if(!empty($key['order_status'])){
                            OrderEntry::where('o_id', $key['o_id'])
                            ->update(array(
                                'order_status' => $key['order_status'],
                                'return_reason' => $key['return_reason'],
                                'return_received_date'=>date('Y-m-d',strtotime(date_format(date_create($request->input('return_date')),"Y-m-d")))
                                )
                            );
                        }else{
                            return response(['errors'=>'OrderStatus is empty','status'=>false],422);
                        }
                    }
                }
                return response([
                    'data'=>'OrderReturn updated',
                    'status'=> true
                ],200);
             }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }

    }
    

    public function meesho_payment_update_from_excel(Request $request){
        
        //if (Auth::guard('api')->check()) {
        if($this->tokensExpire($request->header('Authorization'))==1){
            $validator = Validator::make($request->all(), [
                'file' =>'required',
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{
                $fileName = time().'.'.$request->file->extension(); 
                Excel::store(new PaymentImport(), 'uploads/meesho_payment/'.$fileName, 'real_public');
                $data =  Excel::toArray(new OrderImport, request()->file('file'));
                foreach($data[0] as $key => $value){
                    if($key>1){
                        $order = OrderEntry::select('*')
                              ->where('user_id',Auth::guard('api')->user()->id)
                              ->where('order_id','=',$value['order_related_details'])
                              ->get();

                        if(sizeof($order)){
                            if($value['revenue_details']=="PREMIUM_RETURN" && $value[5]=="Exchange"){
                                OrderEntry::where('o_id', $value['order_related_details'])->update(array('order_status' => 6));

                            }elseif($value[11]==0 && $value[5]=="RTO"){
                                OrderEntry::where('o_id', $value['order_related_details'])->update(array('order_status' => 4));

                            }elseif($value[11]<0 && $value['revenue_details']=="Return"){
                                OrderEntry::where('o_id', $value['order_related_details'])->update(array('order_status' => 5));
                            }
                            return response(['errors'=>'OrderId not exists.','status'=>true],422);
                            
                        }else{
                            $file_path =public_path('uploads/meesho_payment').'/'.$fileName;
                            unlink($file_path);
                            return response(['errors'=>'OrderId not exists.','status'=>false],422);
                        }
                    }
                }
            }
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }
    public function Wallet_balance(Request $request){
        if($this->tokensExpire($request->header('Authorization'))==1){
            $wallet_balance = User::select('wallet_balance')->where('id',Auth::guard('api')->user()->id)->get();

             return response([
                    'wallet_balance'=>$wallet_balance,
                    'status'=> true
                ],200);
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }

    }

    public function change_password(Request $request){
        if($this->tokensExpire($request->header('Authorization'))==1){
             $validator = Validator::make($request->all(), [
                'current_password' =>'required',
                'new_password' =>'required',
            ]);

            if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all(),'status'=>false], 422);
            }else{

                if (Hash::check($request->get('current_password'), Auth::guard('api')->user()->password)) {

              /*  if(Auth::guard('api')->user()->password==Hash::make($request->input('current_password'))){*/
                    $new_password=Hash::make($request['new_password']);
                    User::where('id',Auth::guard('api')->user()->id)->update(array('password' => $new_password));
                    return response(['message'=>'Password Changed Sucessfully.','status'=>true],200);

               }else{
                    return response(['errors'=>'Current Password is wrong.','status'=>false],422);
               }
                  
            }   
        }else{
            return response(['errors'=>'token expire','status'=>false],422);
        }
    }
}