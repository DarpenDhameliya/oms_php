<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Seller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Session;
use Hash;
use Illuminate\Support\Facades\DB;



class UserController extends Controller
{
    public function index(){
         if(Auth::check()){
              return redirect("theme");
         }
         return view("fronted.login");
    }

    public function postlogin(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
   
        $credentials = $request->only('email', 'password');
       
        if (Auth::attempt($credentials)) {
            $request->session()->put('id',Auth::user()->id);
            return redirect()->intended('theme');
                        // ->withSuccess('You have Successfully loggedin');
        }
        return redirect("login")->with('success','Oppes! You have entered invalid credentials'); 
    }

    public function signup(){
        return view('signup');
    }

    public function postsignup(Request $request){
         $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'repeatpassword' =>'required|required_with:password|same:password|min:6'
        ]);
         
        $data = $request->all();

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            
        ]);
         
        return redirect("dashboard")->with('success','Great! You have Successfully loggedin');
    }
    public function dashboard()
    {        
      
        if(Auth::check()){
            $client = DB::table('client')->get();
            $seller = Seller::all();
            return view('dashboard',compact('client','seller'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
        }
        return redirect("login")->withSuccess('Opps! You do not have access');
    }

    public function logout() {
        Session::flush();
        Auth::logout();
        return Redirect('login');
    }

    public function theme(){
        if(Auth::check()){
            return view('layout');
        }
        return redirect("login");
    }


}