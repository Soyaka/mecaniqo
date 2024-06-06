<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repair extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_id',
        'user_id', 
        'description',
        'status',
        'mechanic',
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class); 
    }
    public function invoice()
{
    return $this->hasOne(Invoice::class);
}

}