<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class MechanicController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $mechanics = User::where('role', 'mechanic')->get();

        return Inertia::render('Admin/MechanicsViews', [
            'mechanics' => $mechanics,
            'auth' => ['user' => $user],
        ]);
    }

    public function create()
    {
        return Inertia::render('Mechanics/Create');
    }

    public function store(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
        'role' => 'required|string|in:client,admin,mechanic',
    ]);

    $mechanic = User::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'password' => bcrypt($validatedData['password']),
        'role' => $validatedData['role'],
    ]);

    return response()->json(['mechanic' => $mechanic], 201);
}

    public function edit(User $mechanic)
    {
        return Inertia::render('Mechanics/Edit', ['mechanic' => $mechanic]);
    }

    public function update(Request $request, User $mechanic)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $mechanic->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|string|in:client,admin,mechanic',
        ]);

        $mechanic->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'] ? bcrypt($validatedData['password']) : $mechanic->password,
            'role' => $validatedData['role'],
        ]);

        return redirect()->route('mechanics.index')->with('success', 'Mechanic updated successfully.');
    }

    public function destroy(User $mechanic)
    {
        $mechanic->delete();
        return redirect()->route('mechanics.index')->with('success', 'Mechanic deleted successfully.');
    }
}
