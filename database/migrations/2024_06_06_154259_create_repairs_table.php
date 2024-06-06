<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRepairsTable extends Migration
{
    public function up()
{
    Schema::create('repairs', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Add this line
        $table->foreignId('vehicle_id')->constrained()->onDelete('cascade');
        $table->text('description');
        $table->enum('status', ['en attente', 'en cours', 'terminée']);
        $table->string('mechanic');
        $table->timestamps();
    });
}


    public function down()
    {
        Schema::dropIfExists('repairs');
    }
}
