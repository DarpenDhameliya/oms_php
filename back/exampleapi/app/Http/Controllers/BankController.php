<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Bank;

class BankController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function banklist()
    {
        if(Auth::check()){
            session()->put('mainmenu',"Master");
            session()->put('sub_menu',"Bank_master");
            $user = Auth::user();
            $bank=Bank::where('user_id', $user->id)->get();
            return view("fronted.banklist",compact('bank'));
        }
        return view("fronted.login");
    }
    public function insertbank(Request $request)
    {
        $data=$request->input();
        $user = Auth::user();

        $validate =$request->validate([
            'bank_name'=>'required',
            'ifsc'=>'required',
            'account'=>'required',
            'branch'=>'required',
        ]);

        $ins=array(
            'bank_name'=>$data['bank_name'],
            'ifsc'=>$data['ifsc'],
            'account'=>$data['account'],
            'branch'=>$data['branch'],
            'user_id'=>$user->id,
        );
        // dd($ins);
        Bank::create($ins);
        return redirect("banklist");
    }
    public function deletebank($id)
    {
        $bank=Bank::find($id);
        $bank->delete();
        return redirect("banklist");
    }
    public function fatchbank($id)
    {
        $user = Auth::user();
        $data['bank']=Bank::where('id',$id)->where('user_id', $user->id)->first();
        return view("fronted.updatebank",$data);
    }
    public function updatebank(Request $request,$id)
    {
        $data=$request->input();
        // dd($data);
        $validate =$request->validate([
            'bank_name'=>'required',
            'ifsc'=>'required',
            'account'=>'required',
            'branch'=>'required',
        ]);
        $user = Auth::user();
        $update=array(
            'bank_name'=>$data['bank_name'],
            'ifsc'=>$data['ifsc'],
            'account'=>$data['account'],
            'branch'=>$data['branch'],
            'user_id'=>$user->id,
        );
        Bank::where('id',$id)->update($update);
        return redirect("banklist");
    }
}