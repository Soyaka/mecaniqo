<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repair;
use App\Models\Vehicle;
use App\Models\Client;
use App\Models\Notification;
use Inertia\Inertia;
use Inertia\Response;

class RepairController extends Controller
{
    public function store(Request $request)
    {
        $msg = "the user with id: " . auth()->user()->id . " has requested a repair for vehicle with id: " . $request->vehicle_id . " at " . date('Y-m-d') . " with the following description: " . $request->description . " and the following notes: " . $request->clientNotes . " the request is currently under review.";
        $notification = Notification::create([
            'user_id' => 1,
            'content' => $msg,
        ]);
        $ntf = Notification::where('user_id', auth()->user()->id)->get();
        // dd($request->vehicle_id);
        $repair = Repair::create([
            'vehicleID' => $request->vehicle_id,
            'description' => $request->description,
            'status' => "Review",
            'startDate' => date('Y-m-d'),
            'endDate' => date('Y-m-d'),
            'clientNotes' => $request->clientNotes,
            'mechanicID' => auth()->user()->id,
        ]);
        // rep = RepairController;
        // rep.su

        return redirect()->route('repair.success');
        
    }
    public function success()
    {
        // dd(auth()->user());
        $id = auth()->user()->id;
        $notifications = Notification::where('user_id', $id)->get();
        return Inertia::render('repairs/SuccessRequest', ['auth' =>auth()->user(), 'notifications' => $notifications]);
    }
    public function selectToRepair(Request $request)
    {
        $vehicles = [];
        if (auth()->user()->client && auth()->user()->client->id){
            $userId = auth()->user()->client->id;

            $vehicles = Vehicle::where('clientID', $userId)->get();}

        return Inertia::render('repairs/SelectVehicle', ['vehicles' => $vehicles]);
    }
    public function redirectForm(Request $request)
    {
        $vehicleId = $request->id;
        return Inertia::render('repairs/RepairRequestForm', ['vehicleId' => $vehicleId]);
    }
    public function history(Request $request)
    {
        if (auth()->user() && auth()->user()->id)
        {
            $userId = auth()->user()->id;
            $cid = Client::where('userID', $userId)->first()->id;
            $repairs = Repair::join('vehicles', 'repairs.vehicleID', '=', 'vehicles.id')
                 ->where('vehicles.clientID', $cid)
                 ->select('repairs.*') 
                 ->get();
            return Inertia::render('repairs/History', ['repairs' => $repairs]);
        }
        return Inertia::render('repairs/History', ['repairs' => null]);
            
    }
}
