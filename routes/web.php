<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClientController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RepairController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\MechanicController;
use App\Http\Controllers\MailController;
use App\Http\Middleware\CheckRole;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\AuthenticatedSessionController;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/generate-invoice/{id}', [PDFController::class, 'generatePDF']);
Route::delete('/users/{id}', [AdminController::class, 'destroy']);
Route::delete('/admin/spare-part-delete/{id}', [AdminController::class, 'deleteSparePart']);
// Route::get('/invoices', [InvoiceController::class, 'index']);
Route::get('/add-vehicle', function () {
    return Inertia::render('Vehicles/AddVehicle');

});
Route::post('/admin/users', [AdminController::class, 'store'])->name('admin.users.store');
Route::get('/admin/spare-parts', [AdminController::class, 'spareIndex']);
Route::post('/admin/update-spare-parts', [AdminController::class, 'updateSparePart']);
Route::get('send-mail', [MailController::class, 'index']);
Route::get('/ndashboard/{id}', [NotificationController::class, 'index']);
Route::post('/mechanic/add/part-to-invoice', [MechanicController::class, 'addPartToInvoice']);
Route::get('/admin/repairs/completed', [AdminController::class, 'completedRepairs']);
Route::post('/admin/add/mecanic', [AdminController::class, 'addMecanic']);
Route::get('/repair-request/{id}', [RepairController::class, 'redirectForm']);
Route::get('/select-vehicle', [RepairController::class, 'selectToRepair']);
Route::get('/admin/add/user', function(){
    return Inertia::render('Admin/Adduser');
});
Route::get('/admin/add/mecanic', function(){
    return Inertia::render('Admin/AddMecanic');
});
Route::get('/mechanic/repairs/working/{id}', [MechanicController::class, 'WorkingRepairs']);
//    return Inertia::render('/Mechanic/WorkingRepairs');
//});
Route::get('/admin/mechanics', [AdminController::class, 'getMecanics'])->name('admin.mecanics');
Route::post('/admin/repairs/requests/pick-dates', [AdminController::class, 'DatePriceNewRequest']);
Route::get('/admin/repairs/requests', [AdminController::class, 'repairsRequest']);
Route::get('/mechanic/repairs/requests', [MechanicController::class, 'repairs']);
// Route
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/users', [AdminController::class, 'dashboard'])->name('admin.dashboard');
 });
 Route::post('/mechanic/change/vehicle-status', [MechanicController::class, 'changeStatus']);
Route::get('/repair-request-success', [RepairController::class, 'success'])->name('repair.success');

Route::post('/repair-request', [RepairController::class, 'store']);
Route::post('/vehicles', [VehicleController::class, 'store']);
Route::get('/my-vehicles', [VehicleController::class, 'userVehicles']);
Route::get('/repairs-history', [RepairController::class, 'history']);
Route::post('admin/repairs/requests/forward', [AdminController::class, 'ForwardMecanic']);
Route::get('/admin/repairs/new-requests', [AdminController::class, 'NewRequest']);
Route::post('/admin/repairs/requests/update-dates', [AdminController::class, 'ChangeRepairDates']);
Route::get('/clients', [ClientiController::class, 'index']);
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/logout', [AuthenticatedSessionController::class, 'destroy']);

require __DIR__.'/auth.php';
