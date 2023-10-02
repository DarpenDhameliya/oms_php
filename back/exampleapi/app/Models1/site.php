<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class site extends Model
{
    use HasFactory;
     protected $table = 'site';
     protected $primaryKey="id";
     public $timestamps=false;
     protected $fillable=['site'];
}