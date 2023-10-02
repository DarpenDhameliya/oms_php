<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Session;
use Hash;
use Illuminate\Support\Facades\DB;



class ClientController extends Controller{
	public function add_client(){
		return view('addclient');
	}
	public function post_client(Request $request){
        $data = $request->all();
        if(empty($data['client_id'])){
	        $request->validate([
	            'client_name' => 'required',
	            'client_email' => 'required|email|unique:client',
	            'company_name' => 'required',
	            
	        ]);
	         
		    DB::table('client')->insert([
		        'client_name' => $data['client_name'],
		        'client_email' => $data['client_email'],
		        'company_name' => $data['company_name'],   
		    ]);
	    	
        }else{

        	 $client = DB::table('client')->where('client_id',$data['client_id'])->get();
        	 if($data['client_email']==$client[0]->client_email){
        	 	$emailvalidation ='required|email';

        	 }else{
        	 	$emailvalidation ='required|email|unique:client';
        	 }
        	 $request->validate([
	            'client_name' => 'required',
	            'client_email' => $emailvalidation,
	            'company_name' => 'required',
	        ]);

        	DB::table('client')
              ->where('client_id', $data['client_id'])
              ->update([
              	'client_name' => $data['client_name'],
		        'client_email' => $data['client_email'],
		        'company_name' => $data['company_name'],
            ]);
        }
        return redirect("dashboard");


    }
    public function Edit_client($client_id){
    	  $client = DB::table('client')->where('client_id', $client_id)->get();
             return view('addclient',compact('client'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }
    public function Delete_client($client_id){
    	DB::table('client')->where('client_id', $client_id)->delete();
    	 return redirect("dashboard");

    }
}