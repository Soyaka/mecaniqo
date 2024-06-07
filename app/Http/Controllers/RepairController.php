<?php

namespace App\Http\Controllers;

use App\Models\Repair;
use Illuminate\Http\Request;

class RepairController extends Controller
{
    public function index()
    {
        $repairs = Repair::with('repairRequest', 'mechanic')->get();
        return view('repairs.index', compact('repairs'));
    }

    public function getAllRepairs(){
        $repairs = Repair::with('repairRequest', 'mechanic')->get();
        return $repairs;
    }

    public function create()
    {
        return view('repairs.create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'repair_request_id' => 'nullable|exists:repair_requests,id',
            'mechanic_id' => 'nullable|exists:users,id',
            'description' => 'required|string',
            'cost' => 'required|numeric',
            'status' => 'required|string|in:pending,in_progress,completed',
        ]);

        Repair::create($validatedData);

        return redirect()->route('repairs.index')->with('success', 'Repair created successfully.');
    }

    public function edit(Repair $repair)
    {
        return view('repairs.edit', compact('repair'));
    }

    public function update(Request $request, Repair $repair)
    {
        $validatedData = $request->validate([
            'description' => 'required|string',
            'cost' => 'required|numeric',
        ]);

        $repair->update($validatedData);

        return redirect()->route('repairs.index')->with('success', 'Repair updated successfully.');
    }

    public function destroy(Repair $repair)
    {
        $repair->delete();
        return redirect()->route('repairs.index')->with('success', 'Repair deleted successfully.');
    }
}
