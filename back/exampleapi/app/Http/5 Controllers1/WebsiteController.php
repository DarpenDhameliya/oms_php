<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Website;
use App\Models\site;
use Session;


class WebsiteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function websitelist()
    {
        if(Auth::check()){
            session()->put('mainmenu',"Master");
            session()->put('sub_menu',"Website");
           
            $user = Auth::user();
            $data['site']=site::all();
            $data['web']=Website::select('website.id as w_id','website.name','site.*',)->where('user_id',$user->id)->join('site','site.id','website.site_id')->get();
            return view("fronted.websitelist",$data);
        }
        return view("fronted.login");
    }
    public function insertwebsite(Request $request)
    {
        $data=$request->input();
        // dd($data);
        $user = Auth::user();
        $validate =$request->validate([
            'name'=>'required',
            'site_id'=>'required',
        ]);
        $ins=array(
            'name'=>$data['name'],
            'user_id'=>$user->id,
            'site_id'=>$data['site_id'],
        );
        // dd($ins);
        Website::create($ins);
        return redirect("websitelist");
    }
    public function deletewebsite($id)
    {
        $website=Website::find($id);
        $website->delete();
        return redirect("websitelist");
    }
    public function fatchwebsite($id)
    {
        $user = Auth::user();
        $data['site']=site::all();
        $data['web']=Website::where('id',$id)->where('user_id',$user->id)->first();
        return view("fronted.updatewebsite",$data);
    }
    public function updatewebsite(Request $request,$id)
    {
        $data=$request->input();
        // dd($data);
        $user = Auth::user();
        $validate =$request->validate([
            'name'=>'required',
            'site_id'=>'required',
        ]);
        $update=array(
            'name'=>$data['name'],
            'user_id'=>$user->id,
            'site_id'=>$data['site_id'],
        );
        // dd($update);
        Website::where('id',$id)->update($update);
        return redirect("websitelist");
    }
}