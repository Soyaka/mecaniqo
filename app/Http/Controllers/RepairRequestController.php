<?php

namespace App\Http\Controllers;

use App\Models\RepairRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class RepairRequestController extends Controller
{
public function index()
    {
        $user = Auth::user();
        $vehicles = Auth::user()->vehicles;
        $appointments = RepairRequest::with(['vehicle', 'user']) // Eager load the user
            ->whereHas('vehicle', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->get();
    
        return Inertia::render('Client/Appointments', [
            'vehicles' => $vehicles,
            'appointments' => $appointments,
            'auth' => ['user' => $user],
        ]);
    }

    public function allRepairRequests()
    {
        $today = Carbon::today()->toDateString();
        $repair_requests = RepairRequest::whereDate('created_at', $today)
                                        ->with('user', 'vehicle')
                                        ->get();

        return response()->json([
            'repair_requests' => $repair_requests
        ]);
    }


    public function create()
    {
        return view('repair_requests.create');
    }

    public function store(Request $request)
    {

        
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
        $appointment = RepairRequest::create([
            'user_id' => Auth::user()->id,
            'vehicle_id' => $validated['vehicle_id'],
            'description' => $validated['description'],
            'images' => json_encode($imagePaths),
            'date' => $validated['date_time'],
            'status' => 'pending', // Default status
        ]);
    
        // Return a response (e.g., redirect to appointments index)
        return response()->json(['message' => 'Appointment created successfully.', 'appointment' => $appointment]);
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
