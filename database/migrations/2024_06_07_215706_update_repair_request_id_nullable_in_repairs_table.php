<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('repairs', function (Blueprint $table) {
            $table->unsignedBigInteger('repair_request_id')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('repairs', function (Blueprint $table) {
            $table->unsignedBigInteger('repair_request_id')->nullable(false)->change();
        });
    }
};
