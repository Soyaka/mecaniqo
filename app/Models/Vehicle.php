<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand',
        'model',
        'fuel_type',
        'registration_number',
        'photos',
        'user_id', 
    ];

    protected $casts = [
        'photos' => 'array',
    ];

    public function repairs()
    {
        return $this->hasMany(Repair::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class); // Define the user relationship
    }
}
