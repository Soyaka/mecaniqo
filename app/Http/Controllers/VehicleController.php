<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index()
    {
        return Vehicle::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'fuel_type' => 'required|string|max:255',
            'registration_number' => 'required|string|max:255|unique:vehicles',
            'photos' => 'required|array',
            'photos.*' => 'file|mimes:jpeg,png,jpg,gif',
        ]);

        $photos = [];
        foreach ($request->file('photos') as $photo) {
            $path = $photo->store('vehicle_photos');
            $photos[] = $path;
        }

        $vehicle = Vehicle::create([
            'brand' => $request->brand,
            'model' => $request->model,
            'fuel_type' => $request->fuel_type,
            'registration_number' => $request->registration_number,
            'photos' => $photos,
        ]);

        return response()->json($vehicle, 201);
    }

    public function show(Vehicle $vehicle)
    {
        return $vehicle;
    }

    public function update(Request $request, Vehicle $vehicle)
    {
        $request->validate([
            'brand' => 'string|max:255',
            'model' => 'string|max:255',
            'fuel_type' => 'string|max:255',
            'registration_number' => 'string|max:255|unique:vehicles,registration_number,' . $vehicle->id,
            'photos' => 'array',
            'photos.*' => 'file|mimes:jpeg,png,jpg,gif',
        ]);

        if ($request->hasFile('photos')) {
            $photos = [];
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('vehicle_photos');
                $photos[] = $path;
            }
            $vehicle->photos = $photos;
        }

        $vehicle->update($request->only('brand', 'model', 'fuel_type', 'registration_number'));

        return response()->json($vehicle, 200);
    }

    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();
        return response()->json(null, 204);
    }
}
