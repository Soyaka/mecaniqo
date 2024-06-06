<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CarController extends Controller
{
    /**
     * Display a listing of the cars.
     */
    public function index()
    {
        $cars = Car::where('user_id', Auth::id())->get();
        return Inertia::render('Cars/Index', ['cars' => $cars]);
    }

    /**
     * Show the form for creating a new car.
     */
    public function create()
    {
        return Inertia::render('Cars/Create');
    }

    /**
     * Store a newly created car in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|digits:4',
        ]);

        Car::create([
            'make' => $request->make,
            'model' => $request->model,
            'year' => $request->year,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('cars.index');
    }

    /**
     * Show the form for editing the specified car.
     */
    public function edit(Car $car)
    {
        $this->authorize('update', $car);
        return Inertia::render('Cars/Edit', ['car' => $car]);
    }

    /**
     * Update the specified car in storage.
     */
    public function update(Request $request, Car $car)
    {
        $this->authorize('update', $car);

        $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|digits:4',
        ]);

        $car->update($request->only('make', 'model', 'year'));

        return redirect()->route('cars.index');
    }

    /**
     * Remove the specified car from storage.
     */
    public function destroy(Car $car)
    {
        $this->authorize('delete', $car);
        $car->delete();

        return redirect()->route('cars.index');
    }
}
