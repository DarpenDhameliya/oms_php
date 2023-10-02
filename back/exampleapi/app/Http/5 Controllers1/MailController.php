<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Mail;

use Mail;



class MailController extends Controller
{
    public function sendEmail(){
        $details=[
            'title'=>'title here',
            'body'=>'body of mail here'
        ];

        Mail::to('ankita.sstpl@gmail.com')->send(new \App\Mail\TestMail($details));
        return"Email Sent!!";
    }
    
}
