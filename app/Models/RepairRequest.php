<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_id', 'description', 'status', 'date'
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function repair()
    {
        return $this->hasOne(Repair::class);
    }
}