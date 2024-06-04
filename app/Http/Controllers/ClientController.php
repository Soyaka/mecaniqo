<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    //
    public function index()
    {
        $clients = Client::all();
        return Inertia::render('Clients/Index', ['clients' => $clients]);
    }
    public function store(Request $request)
    {
        $clients = Client::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address'=> $request->address,
            'city'=> $request->city,
            'postcode'=> $request->postcode,
            'country'=> $request->country,
            'company'=> $request->company,
            'companyNumber'=> $request->companyNumber,
            'vatNumber'=> $request->vatNumber,
        ]);

        // // Redirect the user to a success page
        return redirect('/');
    }
}
