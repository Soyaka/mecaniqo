<?php

namespace App\Http\Controllers;

use App\Models\Repair;
use Illuminate\Http\Request;
use App\Models\RepairRequest;
use Inertia\Inertia;
use App\Models\User;

class RepairController extends Controller
{
    public function index()
    { // fetch accepted_repair_request with thier vihcle and user
        $acceptedRepairRequests = RepairRequest::with('vehicle', 'user')->where('status', 'accepted')->get();
        $mechanics = User::where('role', 'mechanic')->get();
        $user = auth()->user();
        // f
        $repairs = Repair::with('repairRequest', 'mechanic')->get();
        return Inertia::render('Admin/Repairs', [
            'repairs' => $repairs,
            'auth' => ['user' => $user],
            'mechanics' => $mechanics,
            'acceptedRepairRequests' => $acceptedRepairRequests
        ]);
    }

    public function getAllRepairs()
    {
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

        return response()->json(['message' => 'Repair created successfully.']);
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
