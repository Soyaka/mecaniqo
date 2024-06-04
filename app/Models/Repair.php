<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repair extends Model
{
    use HasFactory;
    
    public function mechanic()
    {
        return $this->belongsTo(User::class, 'mechanicID');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicleID');
    } 
    protected $fillable = [
        'description',
        'status',
        'startDate',
        'endDate',
        'clientNotes',
        'vehicleID',
        'mechanicID'
    ];
}
