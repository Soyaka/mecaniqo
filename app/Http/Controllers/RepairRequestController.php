<?php

namespace App\Http\Controllers;

use App\Models\RepairRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use App\Models\Repair;
use App\Models\RepairMaterial;
use App\Models\Invoice;
use App\Models\Payment;
//i want log
use Illuminate\Support\Facades\Log;
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

    public function updateStatus(Request $request, $id)
    {
        try {
            $repairRequest = RepairRequest::findOrFail($id);

            // Validate the status
            $validatedData = $request->validate([
                'status' => 'required|string|in:pending,accepted,in_progress,completed',
            ]);

            // Update the status
            $repairRequest->status = $validatedData['status'];
            $repairRequest->save();

            return response()->json(['message' => 'Status updated successfully.']);
        } catch (\Exception $e) {
            Log::error('Error updating status:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to update status'], 500);
        }
    }

    public function update(Request $request, RepairRequest $repairRequest)
    {
        $validatedData = $request->validate([
            'status' => 'required|string|in:pending,in_progress,completed,canceled,accepted',
        ]);

        $repairRequest->update($validatedData);

        return response()->json(['message' => 'Repair request updated successfully']);
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
            // 'status' => 'required|string|in:pending,in_progress,completed',
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



    public function destroy(RepairRequest $repairRequest)
    {
        $repairRequest->delete();
        return redirect()->route('repair-requests.index')->with('success', 'Repair request deleted successfully.');
    }
}
