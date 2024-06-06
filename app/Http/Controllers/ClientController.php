<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Repair;
use Illuminate\Http\Response;
use Inertia\Inertia;


class ClientController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $vehicles = $user->vehicles()->with('repairRequests.repairs')->get();
        $invoices = $user->invoices()->get();
        
        // Collect all repair IDs from the repair requests of the user's vehicles
        $repairIds = $vehicles->flatMap(function ($vehicle) {
            return $vehicle->repairRequests->flatMap(function ($repairRequest) {
                return $repairRequest->repairs->pluck('id');
            });
        })->unique();
    
        // Fetch the repairs using the collected IDs
        $repairs = Repair::whereIn('id', $repairIds)->get();
    
        return Inertia::render('Client/Overview', [
            'auth' => ['user' => $user],
            'vehicles' => $vehicles,
            'invoices' => $invoices,
            'repairs' => $repairs,
        ]);
    }
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', ['user' => $user]);
    }

    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|string|in:client,admin,mechanic',
        ]);

        $user->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'] ? bcrypt($validatedData['password']) : $user->password,
            'role' => $validatedData['role'],
        ]);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
