<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairMaterial extends Model
{
    use HasFactory;


    protected $fillable = [
        'repair_id', 'material_id', 'quantity_used',
    ];

    public function repair()
    {
        return $this->belongsTo(Repair::class);
    }

    public function material()
    {
        return $this->belongsTo(Material::class);
    }
}
