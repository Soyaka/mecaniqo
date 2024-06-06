<?php

namespace App\Http\Controllers;

use App\Models\RepairRequest;
use Illuminate\Http\Request;

class RepairRequestController extends Controller
{
    public function index()
    {
        $repairRequests = RepairRequest::with('vehicle')->get();
        return view('repair_requests.index', compact('repairRequests'));
    }

    public function create()
    {
        return view('repair_requests.create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'description' => 'required|string',
        ]);

        $validatedData['status'] = 'pending';
        RepairRequest::create($validatedData);

        return redirect()->route('repair-requests.index')->with('success', 'Repair request created successfully.');
    }

    public function edit(RepairRequest $repairRequest)
    {
        return view('repair_requests.edit', compact('repairRequest'));
    }

    public function update(Request $request, RepairRequest $repairRequest)
    {
        $validatedData = $request->validate([
            'description' => 'required|string',
            'status' => 'required|string|in:pending,in_progress,completed',
        ]);

        $repairRequest->update($validatedData);

        return redirect()->route('repair-requests.index')->with('success', 'Repair request updated successfully.');
    }

    public function destroy(RepairRequest $repairRequest)
    {
        $repairRequest->delete();
        return redirect()->route('repair-requests.index')->with('success', 'Repair request deleted successfully.');
    }

    public function updateStatus(Request $request, $id)
    {
        $repairRequest = RepairRequest::findOrFail($id);
        $repairRequest->status = $request->input('status');
        $repairRequest->save();

        return redirect()->route('repair-requests.index')->with('success', 'Repair request status updated successfully.');
    }
}
