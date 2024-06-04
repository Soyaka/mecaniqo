<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    public function repair()
    {
        return $this->belongsTo(Repair::class, 'repairID');
    }
    protected $fillable = [
        'repairID',
        'additionalCharges',
        'totalAmount',
    ];
}
