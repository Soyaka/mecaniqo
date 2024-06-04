<?php


namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::where('user_id', auth()->id())->get();
        return Inertia::render('Cars/Index', ['cars' => $cars]);
    }

    public function create()
    {
        return Inertia::render('Cars/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'make' => 'required',
            'model' => 'required',
            'year' => 'required|integer',
        ]);

        Car::create([
            'user_id' => auth()->id(),
            'make' => $request->make,
            'model' => $request->model,
            'year' => $request->year,
        ]);

        return redirect()->route('cars.index');
    }
}
