<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    //
    public function index()
    {
        $invoices = Invoice::all();
        return view('invoices.index', ['invoices' => $invoices]);
    }
}
