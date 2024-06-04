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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('make')->nullable();
            $table->string('model');
            $table->string('fuelType');
            $table->string('registration');
            $table->string('photos')->nullable();
            $table->unsignedBigInteger('clientID');
            $table->foreign('clientID')->references('id')->on('clients')->onDelete('cascade');
            $table->timestamps();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropForeign('vehicles_clientid_foreign');
        });
        Schema::dropIfExists('vehicles');
    }
};
