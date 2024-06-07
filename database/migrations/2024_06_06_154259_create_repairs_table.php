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
        $table->foreignId('repair_request_id')->constrained()->onDelete('cascade');
        $table->foreignId('mechanic_id')->constrained('users')->onDelete('cascade');
        $table->text('description');
        $table->decimal('cost', 10, 2);
        $table->timestamps();
    });
    }




    public function down()
    {
        Schema::dropIfExists('repairs');
    }
}

