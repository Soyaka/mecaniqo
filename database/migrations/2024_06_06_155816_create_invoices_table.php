<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('repair_id')->constrained()->onDelete('cascade'); // Assuming each invoice is associated with a repair
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Assuming each invoice is associated with a client
            $table->decimal('total_amount', 10, 2);
            $table->enum('status', ['unpaid', 'paid']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}
