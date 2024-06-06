<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repair extends Model
{
    use HasFactory;
    protected $fillable = [
        'repair_request_id', 'mechanic_id', 'description', 'cost',
    ];

    public function repairRequest()
    {
        return $this->belongsTo(RepairRequest::class);
    }

    public function mechanic()
    {
        return $this->belongsTo(User::class, 'mechanic_id');
    }

    public function repairMaterials()
    {
        return $this->hasMany(RepairMaterial::class);
    }

    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }
}