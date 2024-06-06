<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [

        'repair_id',
        'client_id',
        'status',
        'total_amount',
        'date',

        
    ];
    public function repair()
    {
        return $this->belongsTo(Repair::class);
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
