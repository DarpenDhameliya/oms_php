<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Website extends Model
{
    use HasFactory;
     protected $table = 'website';
     protected $primaryKey="id";
     public $timestamps=false;
     protected $fillable=['name','user_id','site_id'];
}