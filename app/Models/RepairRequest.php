<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Repair;
use App\Models\Vehicle;
use App\Models\User;

class RepairRequest extends Model
{
    use HasFactory;

    protected $fillable = [
         'user_id', 'vehicle_id', 'description',  'images', 'status', 'date'
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class , 'user_id');
    }

    public function repair()
    {
        return $this->hasOne(Repair::class);
    }
}