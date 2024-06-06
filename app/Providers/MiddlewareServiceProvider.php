<?php

// app/Providers/MiddlewareServiceProvider.php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Middleware\RoleMiddleware;

class MiddlewareServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Register middleware
        $this->app['router']->aliasMiddleware('role', RoleMiddleware::class);
    }

    public function boot()
    {
        //
    }
}
