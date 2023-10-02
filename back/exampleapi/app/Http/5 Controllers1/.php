<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Seller;
use PDF;

class SellerController extends Controller
{
    //
    public function add_seller(){
        return view('addseller');

    }
    public function post_seller(Request $request){

        $data = $request->all();
        if(empty($data['id'])){
            $request->validate([
                'seller_name' => 'required',
                'seller_email' => 'required|email|unique:seller',
                'seller_comment' => 'required',
                'file' => 'required|mimes:png,jpg,jpeg,csv,txt,xlx,xls,pdf|max:2048'
            ]);
             
            $fileName = time().'.'.$request->file->extension(); 
            $request->file->move(public_path('uploads'), $fileName);
   

            $seller = new Seller;

            $seller->seller_name = $request->input('seller_name');
            $seller->seller_email = $request->input('seller_email');
            $seller->seller_comment = $request->input('seller_comment');
            $seller->file = $fileName;

            $seller->save();


                
        }else{

            $seller = Seller::findOrFail($data['id']);

            if($data['seller_email']==$seller->seller_email){
                $emailvalidation ='required|email';
            }else{
                $emailvalidation ='required|email|unique:seller';
            }

            if(!empty($data['file'])){
                $request->validate([
                 'file' => 'required|mimes:png,jpg,jpeg,csv,txt,xlx,xls,pdf|max:2048'
                ]);

                if(!empty($seller->file)){
                    $file_path =public_path('uploads').'/'.$seller->file;
                    unlink($file_path);
                }
                $fileName = time().'.'.$request->file->extension(); 
                $request->file->move(public_path('uploads'), $fileName);
                $seller->file = $fileName;
            }
             $request->validate([
                'seller_name' => 'required',
                'seller_email' => $emailvalidation,
                'seller_comment' => 'required',
            ]);
            
            $seller->seller_name = $request->seller_name;
            $seller->seller_email = $request->seller_email;
            $seller->seller_comment = $request->seller_comment;
            $seller->save();

         

           
        }
        return redirect("dashboard");
    }

    public function Edit_seller($id){
         $seller  = Seller::findOrFail($id);

        return view('addseller',compact('seller'))
        ->with('i', (request()->input('page', 1) - 1) * 5);
    }

    public function Delete_seller($id){
        $seller = Seller::findOrFail($id);
        Seller::destroy($id);
        if(!empty($seller->file)){
            $file_path =public_path('uploads').'/'.$seller->file;
            unlink($file_path);
        }
        return back();
    }
    
    public function generatePDF(){
        $data = [
            'title' => 'Welcome to ItSolutionStuff.com',
            'date' => date('m/d/Y')
        ];
          
        $pdf = PDF::loadView('myPDF', $data);
        return $pdf->download('itsolutionstuff.pdf');
    }
  
}