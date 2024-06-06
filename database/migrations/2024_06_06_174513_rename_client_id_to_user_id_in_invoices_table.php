<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        if (Schema::hasColumn('invoices', 'client_id')) {
            Schema::table('invoices', function (Blueprint $table) {
                $table->renameColumn('client_id', 'user_id');
            });
        }
    }
    
    public function down()
    {
        if (Schema::hasColumn('invoices', 'user_id')) {
            Schema::table('invoices', function (Blueprint $table) {
                $table->renameColumn('user_id', 'client_id');
            });
        }
    }
    
};
