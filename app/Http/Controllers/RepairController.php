<?php

namespace App\Http\Controllers;

use App\Models\Repair;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class RepairController extends Controller
{
    public function index()
    {
        return Repair::with('vehicle')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'description' => 'required|string',
            'status' => 'required|in:en attente,en cours,terminée',
            'mechanic' => 'required|string|max:255',
        ]);

        $repair = Repair::create($request->all());

        return response()->json($repair, 201);
    }

    public function show(Repair $repair)
    {
        return $repair->load('vehicle');
    }

    public function update(Request $request, Repair $repair)
    {
        $request->validate([
            'vehicle_id' => 'exists:vehicles,id',
            'description' => 'string',
            'status' => 'in:en attente,en cours,terminée',
            'mechanic' => 'string|max:255',
        ]);

        $repair->update($request->all());

        return response()->json($repair, 200);
    }

    public function destroy(Repair $repair)
    {
        $repair->delete();
        return response()->json(null, 204);
    }
}
