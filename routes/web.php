<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\RepairRequestController;
use App\Http\Controllers\RepairController;
use App\Http\Controllers\RepairMaterialController;

use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MechanicController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('role:admin')->get('/admin-only', function () {
    return 'Admin Access Only';
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');






    Route::middleware('role:admin')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        Route::resource('users', UserController::class);
        Route::resource('mechanics', MechanicController::class);
        Route::resource('repair-requests', RepairRequestController::class, [
            'only' => ['index', 'store', 'show', 'edit', 'update', 'destroy',],
        ]);
        Route::patch('repair-requests/{repair_request}/update-status', [RepairRequestController::class, 'updateStatus'])
            ->name('repair-requests.updateStatus');
        Route::get('/all-repair-requests', [RepairRequestController::class, 'allRepairRequests'])->name('all-repair-requests');
        Route::resource('invoices', InvoiceController::class);
        Route::resource('repair-materials', RepairMaterialController::class);
        Route::resource('/repairs', RepairController::class)->names([
            'index' => 'repairs.index', // Add this line to specify the custom name for the index route
            'store' => 'repairs.store',
            'show' => 'repairs.show',
            'edit' => 'repairs.edit',
            'update' => 'repairs.update',
            'destroy' => 'repairs.destroy',
            'create' => 'repairs.create',
            'new' => 'repairs.new',
            'updateStatus' => 'repairs.updateStatus',
        ]);
    });






    Route::middleware('role:client')->group(function () {
        Route::get('/overview', [ClientController::class, 'index'])->name('overview');
        Route::resource('/vehicles', VehicleController::class);
        Route::resource('/appointments', RepairRequestController::class)->names([
            'index' => 'appointments.index',
            'store' => 'appointments.store',
            'show' => 'appointments.show',
            'edit' => 'appointments.edit',
            'update' => 'appointments.update',
            'destroy' => 'appointments.destroy',
        ]);
        // Route::resource('/repairs', RepairController::class);
        Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoices.index');
    });








    Route::middleware('role:mechanic')->group(function () {
        Route::get('/repair-requests', [RepairRequestController::class, 'index'])->name('repair-requests.index');
        // Route::put('/repair-requests/{id}/update-status', [RepairRequestController::class, 'updateStatus'])->name('repair-requests.update-status');
    });
});

require __DIR__ . '/auth.php';
