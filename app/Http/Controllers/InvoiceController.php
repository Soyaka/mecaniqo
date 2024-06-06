<?php


namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with('repair', 'client')->get();
        return view('invoices.index', compact('invoices'));
    }

    public function create()
    {
        return view('invoices.create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'repair_id' => 'required|exists:repairs,id',
            'client_id' => 'required|exists:users,id',
            'total_amount' => 'required|numeric',
            'status' => 'required|string|in:unpaid,paid',
        ]);

        Invoice::create($validatedData);

        return redirect()->route('invoices.index')->with('success', 'Invoice created successfully.');
    }

    public function edit(Invoice $invoice)
    {
        return view('invoices.edit', compact('invoice'));
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validatedData = $request->validate([
            'total_amount' => 'required|numeric',
            'status' => 'required|string|in:unpaid,paid',
        ]);

        $invoice->update($validatedData);

        return redirect()->route('invoices.index')->with('success', 'Invoice updated successfully.');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return redirect()->route('invoices.index')->with('success', 'Invoice deleted successfully.');
    }
}
