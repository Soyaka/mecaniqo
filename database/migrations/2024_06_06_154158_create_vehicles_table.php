<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiclesTable extends Migration
{
    public function up()
{
    Schema::create('vehicles', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Add this line
        $table->string('brand');
        $table->string('model');
        $table->string('fuel_type');
        $table->string('registration_number')->unique();
        $table->json('photos');
        $table->timestamps();
    });
}

    public function down()
    {
        Schema::dropIfExists('vehicles');
    }
}
