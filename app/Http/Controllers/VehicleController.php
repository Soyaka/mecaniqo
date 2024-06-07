<?php


namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage as FacadesStorage;
use Illuminate\Support\Facades\URL;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;

class VehicleController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $vehicles = Auth::user()->vehicles;
        return Inertia::render('Client/Vehicles', ['vehicles' => $vehicles, 'auth' => ['user' => $user]]);
    }

    public function create()
    {
        return Inertia::render('Vehicles/Create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'fuel_type' => 'required|string|max:255',
            'registration_number' => 'required|string|max:255|unique:vehicles',
            'photos' => 'nullable|array',
            'photos.*' => 'file|mimes:jpeg,png,jpg,gif',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
    
        $photos = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('public/vehicle_photos');
                $photos[] = $path;
            }
        }
    
        $vehicle = Vehicle::create([
            'brand' => $request->brand,
            'model' => $request->model,
            'fuel_type' => $request->fuel_type,
            'registration_number' => $request->registration_number,
            'photos' => $photos,
            'user_id' => Auth::id(),
        ]);
    
        return Inertia::render('Vehicles', ['vehicle' => $vehicle]);
    }
    public function edit(Vehicle $vehicle)
    {
        return Inertia::render('Vehicles/Edit', ['vehicle' => $vehicle]);
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

        $photos = $vehicle->photos;
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('vehicle_photos');
                $photos[] = $path;
            }
        }

        $vehicle->update([
            'brand' => $request->brand,
            'model' => $request->model,
            'fuel_type' => $request->fuel_type,
            'registration_number' => $request->registration_number,
            'photos' => $photos,
        ]);

        return redirect()->route('vehicles.index')->with('success', 'Vehicle updated successfully.');
    }

    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();
        return redirect()->route('vehicles.index')->with('success', 'Vehicle deleted successfully.');
    }
}