<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;



    protected $fillable = [
        'name', 'quantity', 'price_per_unit',
    ];

    public function repairMaterials()
    {
        return $this->hasMany(RepairMaterial::class);
    }
}
