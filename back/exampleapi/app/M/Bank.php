<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
    use HasFactory;
     protected $table = 'bank_master';
     protected $primaryKey="id";
     public $timestamps=false;
     protected $fillable=['bank_name','ifsc','account','branch','user_id'];
}