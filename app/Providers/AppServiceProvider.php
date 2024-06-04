<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Notification;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        // $notifications =  Notification::where('user_id', Auth::user()->id)->get();
        // dd($notifications);
        // dd(auth())->user();
        // $n = Notification::where('user_id', auth()->user()->id)->get();
        // dd($n);  
        Inertia::share([
            'auth' => function () {
                return [
                    'user' => Auth::user() ? Auth::user()->only('id', 'name', 'email') : null,
                    'notifications' => "Auth::user() ? Notification::where('user_id', Auth::user()->id)->get() : []",
                    // dd()
                ];
            },
        ]);
    }
}
