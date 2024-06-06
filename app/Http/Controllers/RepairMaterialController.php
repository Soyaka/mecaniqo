<?php
namespace App\Http\Controllers;

use App\Models\RepairMaterial;
use Illuminate\Http\Request;

class RepairMaterialController extends Controller
{
    public function index()
    {
        $repairMaterials = RepairMaterial::with('repair', 'material')->get();
        return view('repair_materials.index', compact('repairMaterials'));
    }

    public function create()
    {
        return view('repair_materials.create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'repair_id' => 'required|exists:repairs,id',
            'material_id' => 'required|exists:materials,id',
            'quantity_used' => 'required|integer',
        ]);

        RepairMaterial::create($validatedData);

        return redirect()->route('repair-materials.index')->with('success', 'Repair material added successfully.');
    }

    public function edit(RepairMaterial $repairMaterial)
    {
        return view('repair_materials.edit', compact('repairMaterial'));
    }

    public function update(Request $request, RepairMaterial $repairMaterial)
    {
        $validatedData = $request->validate([
            'quantity_used' => 'required|integer',
        ]);

        $repairMaterial->update($validatedData);

        return redirect()->route('repair-materials.index')->with('success', 'Repair material updated successfully.');
    }

    public function destroy(RepairMaterial $repairMaterial)
    {
        $repairMaterial->delete();
        return redirect()->route('repair-materials.index')->with('success', 'Repair material deleted successfully.');
    }
}
