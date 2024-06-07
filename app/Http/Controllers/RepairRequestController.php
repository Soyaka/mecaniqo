<?php

namespace App\Http\Controllers;

use App\Models\RepairRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class RepairRequestController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $appointments = RepairRequest::with('vehicle')
            ->whereHas('vehicle', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->get();
    
        return Inertia::render('Client/Appointments', [
            'appointments' => $appointments,
            'auth' => ['user' => $user],
        ]);
    }
    public function create()
    {
        return view('repair_requests.create');
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'vehicle_id' => 'required|integer|exists:vehicles,id',
            'description' => 'required|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'date_time' => 'required|date_format:Y-m-d H:i:s',
        ]);

        // Handle image uploads
        $imagePaths = [];
        if ($request->has('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('appointments', 'public');
                $imagePaths[] = $path;
            }
        }

        // Create the appointment
        $appointment = Appointment::create([
            'vehicle_id' => $validated['vehicle_id'],
            'description' => $validated['description'],
            'images' => json_encode($imagePaths),
            'date_time' => $validated['date_time'],
            'status' => 'pending', // Default status
        ]);

        // Return a response (e.g., redirect to appointments index)
        return redirect()->route('appointments.index')->with('success', 'Appointment created successfully.');
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
