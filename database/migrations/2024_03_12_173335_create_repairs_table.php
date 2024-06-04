<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('repairs', function (Blueprint $table) {
            $table->id();
            $table->text('description');
            $table->string('status');
            $table->date('startDate');
            $table->date('endDate')->nullable();
            $table->text('mechanicNotes')->nullable();
            $table->text('clientNotes')->nullable();
            $table->unsignedBigInteger('mechanicID');
            $table->foreign('mechanicID')->references('id')->on('users');
            $table->unsignedBigInteger('vehicleID');
            $table->foreign('vehicleID')->references('id')->on('vehicles')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repairs');
    }
};
