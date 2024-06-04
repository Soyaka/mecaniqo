<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\Repair;
use App\Models\Vehicle;
use App\Models\Notification;
use App\Models\SparePart;
use Inertia\Inertia;
use App\Models\User;

class MechanicController extends Controller
{
    //
    public function repairs(Request $request)
    {
        $id = auth()->user()->id;
        // dd($id);
        $repairs = Repair::where('mechanicID', $id)->get();
        // dd($repairs);
        return Inertia::render('Mechanic/Repairs', ['repairs' => $repairs]);
    }
    public function changeStatus(Request $request)
    {
        $id = auth()->user()->id;
        $repair_id = $request->currentRepair['id'];
        $vehicleId = Repair::where('id', $repair_id)->first()->vehicleID;
        $msg = "your repair of " . $vehicleId . " has been completed you can get your car now !";
        $client = Vehicle::join('clients', 'vehicles.clientId', '=', 'clients.id')
            ->where('vehicles.id', $vehicleId)
            ->select('clients.*')
            ->first();
        $uesrId = $client->userID;
        $clientId = $client->id;
        Notification::create([
            'user_id' => $uesrId,
            'content' => $msg,
        ]);
        $repair = Repair::where('id', $repair_id)->first();
        $repair->status = $request->newStatus;
        $repair->save();
    }
    public function WorkingRepairs(Request $request)
    {
        //        dd($parts);
        $repair = Repair::join('vehicles', 'repairs.vehicleID', '=', 'vehicles.id')
            ->where('repairs.id', $request->id)
            ->select('repairs.*', 'vehicles.photos as vehicle_photos')
            ->first();
        $parts = SparePart::all();
        return Inertia::render('Mechanic/WorkingRepairs', ['repair' => $repair, 'parts' => $parts]);
    }
    public function addPartToInvoice(Request $request)
    {

        $inv = Invoice::where('repairID', $request->repair['id'])->first();
        if ($inv == null) {
            Invoice::create([
                'repairID' => $request->repair['id'],
                'additionalCharges' => 0,
                'totalAmount' => 0,
            ]);
        }

        $invoice = Invoice::where('repairID', $request->repair['id'])->first();
        $invoice->additionalCharges += $request->part['price'];
        $part = SparePart::where('id', $request->part['id'])->first();
        if ($part->quantity == 1) {
            $mailController = new MailController();
            $email = User::where('role', 'admin')->first()->email; 
            $msg = 'the quantity of this spare ' . $request->part['partName'] .  ' is 0 please need refilling';
            $data = ["email" => $email, "part" => $part, "msg" => $msg];
            $mailController->index($data);
        }
        $part->quantity = $part->quantity - 1;
        $part->save();
        $invoice->totalAmount += $request->part['price'];
        $invoice->save();
    }
}
