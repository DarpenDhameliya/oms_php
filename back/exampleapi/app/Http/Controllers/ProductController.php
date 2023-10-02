<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Unit;
use App\Models\Gst;
use App\Models\Product;
use App\Models\OrderEntry;
use DB;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function productlist()
    {
        if (Auth::check()) {
            session()->put('mainmenu',"Master");
            session()->put('sub_menu',"Product");
            $user = Auth::user();
            
            $data['product']=Product::select('product.id as p_id','product.name','product.*','unit.*','gst.*')->join('unit','unit.id','=','product.unit_id')->leftjoin('gst','gst.id','product.gst_id')->where('user_id', $user->id)->get();
            return view('fronted.productlist',$data);
        }
        return view("fronted.login");
    }
    public function add_product()
    {
        $data['gst']=Gst::all();
        $data['unit']=Unit::all();
        return view('fronted.addproduct',$data);
    }
    public function insertproduct(Request $request)
    {
        $user = Auth::user();
    
        $data=$request->all();
        $validate =$request->validate([
            'name'=>'required',
            'sku'=>'required',
            'unit_id'=>'required',
            'gst_id'=>'required',
            'image'=>'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        if($request->hasfile('image'))
        {
                $val = $request->file('image');
                $path=public_path('/uploads/product/');
                $extention = $val->getClientOriginalExtension();
                $filename=time().'.'.$val->extension();   
                $val->move($path,$filename);
        }
        else {
            return false;
        }

        $ins=array(
            'name'=>$data['name'],
            'sku'=>$data['sku'],
            'image'=>$filename,
            'gst_id'=>$data['gst_id'],
            'unit_id'=>$data['unit_id'],
            'status'=>$data['status'],
            'user_id'=>$user->id,
        );
        // dd($ins);
        Product::create($ins);
        return redirect('/productlist');
    }
    public function deleteproduct($sku)
    {
        //$product=Product::where('sku',$sku)->first();
        // dd($product);
        // $product->delete();
        // return redirect("/productlist");

        $get_product = Product::select()->where('user_id',Auth::user()->id)->where('sku', $sku)->get();
            if(!empty($get_product)){

                $order = OrderEntry::select()->where('product_id',$get_product[0]['id'])->get();
                


                if(sizeof($order)!=0){
                    return redirect("productlist")->with('errors',
                        "You Can't Delete this Product.");

                }else{
                    unlink(public_path('uploads/product/').$get_product[0]['image']);
                    Product::where('sku',$sku)->delete();
                   
                    return redirect("productlist")->with('errors',
                        "Product Delete Sucessfully.");
                }
            }else{
                return redirect("productlist")->with('errors',
                        "Product not Found.");
            }
    }
    public function fatchproduct(Request $request,$sku)
    {
        $user = Auth::user();
        $data['product']=Product::all();
        $data['gst']=Gst::all();
        $data['unit']=Unit::all();
        $data['product']=Product::where('sku',$sku)->where('user_id', $user->id)->first();
        return view("fronted.updateproduct",$data);
    }
    public function updateproduct(Request $request,$sku)
    {
        $user = Auth::user();
        $product=Product::where('sku',$sku)->first();
        // $img;
        $data=$request->all();
        if(!empty($request->file('image')))
        {
            $validate = $request->validate([
                'image'=>'image|mimes:jpeg,png,jpg|max:2048',
            ]);
        }
        else
        {
            $img = '';
        }
        $validate =$request->validate([
            'name'=>'required',
            'sku'=>'required',
            'unit_id'=>'required',
            'gst_id'=>'required',
        ]);

            if(!empty($request->file('image'))){
                if(!empty($product->image)){
                    unlink(public_path('/uploads/product/').$product->image);

                    $val = $request->file('image');
                    $path=public_path('/uploads/product/');
                    $extention = $val->getClientOriginalExtension();
                    $imageName=time().'.'.$val->extension();
                    $val->move($path,$imageName);
                }
            }
            else {
                $imageName=$product->image;
            }
                $update=array(
                'name'=>$data['name'],
                'sku'=>$data['sku'],
                'image'=>$imageName,
                'gst_id'=>$data['gst_id'],
                'unit_id'=>$data['unit_id'],
                'status'=>$data['status'],
                'user_id'=>$user->id,
            );
            Product::where('sku',$sku)->update($update);
            return \Redirect::route('productlist');
    }
    public function getsku(Request $request)
    {
        $user = Auth::user();

        $new = $request->sku;
        $old = Product::select('sku')->where('user_id', $user->id)->get();

        $result=DB::select('select sku from product where user_id ='.$user->id);
        $result = json_decode(json_encode($result), True);
        $array = array_column($result, 'sku');
        $val_available= in_array($new, $array);
        if ($val_available){
            return 1;
        }
        else{
            return 0;
        }
        
    }
}