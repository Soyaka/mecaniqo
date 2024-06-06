<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'repair_id',
        'client_id',
        'total_amount',
        
    ];

    public function repair()
    {
        return $this->belongsTo(Repair::class);
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}
