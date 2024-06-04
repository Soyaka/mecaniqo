<?php
namespace App\Http\Controllers;
use PDF;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Repair;
use App\Models\Vehicle;
use App\Models\Notification;
use App\Models\Client;

class PDFController extends Controller
{
    public function generatePDF($id)
{


    $inv = Invoice::where('repairID', $id)->first();
    $rep = Repair::where('id',$id)->first();
    $data = ['title' => 'Repair Invoice', 'total' => $inv->totalAmount, 'repair'=> $rep, 'invoice' => $inv];

    $pdf = PDF::loadView('pdf.document', $data);
    $fileName = 'invoice_' . $id . '.pdf';
    
    return $pdf->download($fileName);
}
}
