<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Courier;
use App\Models\OrderEntry;

class CourierController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function courierlist()
    {
        if(Auth::check()){
            session()->put('mainmenu',"Master");
            session()->put('sub_menu',"Courier");
            $user = Auth::user();
            $data['courier']=Courier::where('user_id',$user->id)->get();
            return view("fronted.courierlist",$data);
        }
    }
    public function insertcourier(Request $requset)
    {
        $data=$requset->input();
        // dd($data);
        $user = Auth::user();
        $validate =$requset->validate([
            'name'=>'required',
        ]);
        $ins=array(
            'name'=>$data['name'],
            'user_id'=>$user->id,
        );
        Courier::create($ins);
        return redirect("courierlist");
    }
    public function deletecourier($id)
    {
       /* $courier=Courier::find($id);
        $courier->delete();
        return redirect("courierlist");*/

         $order = OrderEntry::select()->where('courier_id',$id)->get();
        if(sizeof($order)!=0){
            return redirect("courierlist")->with('error',
                "You Can't Delete this Courier.");
        }else{
            Courier::where('id',$id)->delete();
            return redirect("courierlist")->with('error',
                "Courier Delete Sucessfully.");
          
        }
    }
    public function fatchcourier($id)
    {
        $user = Auth::user();
        $courier=Courier::where('id',$id)->where('user_id',$user->id)->first();
        if($courier == Courier::find($id))
        {
            $new = true;
            return view("fronted.updatecourier",compact('courier','new'));
        }
        else {
            // $new = false;
            // return view("/updatecourier",compact('courier','new'));
            // echo "<script>alert('This is not Your Record')</script>";
            return redirect()->back()->with('message',"Can't Access This Page");
        }
    }
    public function updatecourier(Request $requset,$id)
    {
        $data=$requset->input();
        // dd($data);
        $user = Auth::user();
        $validate =$requset->validate([
            'name'=>'required',
        ]);
        $update=array(
            'name'=>$data['name'],
            'user_id'=>$user->id,
        );
        Courier::where('id',$id)->update($update);
        return redirect("courierlist");
    }
}