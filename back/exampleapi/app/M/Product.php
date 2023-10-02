<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
     protected $table = 'product';
     protected $primaryKey="id";
     public $timestamps=false;
     protected $fillable=['name','sku','unit_id','gst_id','image','status','user_id'];
}