<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    protected $table = 'clients';
    protected $fillable = ['firstName', 'userID', 'lastName'];
    public function user()
    {
        return $this->belongsTo(User::class, 'userID');
    }

} 
