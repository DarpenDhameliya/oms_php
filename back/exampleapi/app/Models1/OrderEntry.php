<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderEntry extends Model
{
    use HasFactory;
     protected $table = 'order';

     protected $fillable = ['website_id','order_id','product_id','qty','upload_type','user_id','order_status','upload_date','order_amount','awb_no'];
}


