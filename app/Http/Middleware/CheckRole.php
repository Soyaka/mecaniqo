<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        if (! $request->user() || !$role || ! $request->user()->hasRole($role)){
            // Redirect the user to the home page if they don't have the required role
            return redirect('home');
        }
        return $next($request);
    }
}
