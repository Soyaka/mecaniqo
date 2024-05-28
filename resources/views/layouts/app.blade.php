<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <!-- Include Tailwind CSS -->
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')

</head>

<body>
    <div class="min-h-screen bg-transparent">
        <!-- Navigation -->
        <nav class="">
            <div class="container mx-auto px-4">
                <div class="flex justify-between items-center h-16">
                    <!-- Branding -->
                    <a href="{{ url('/') }}" class="text-lg font-semibold text-gray-900">{{ config('app.name', 'Laravel') }}</a>
                    <!-- Navigation Links -->
                    <div class="flex">
                        <a href="{{ route('login') }}" class="mr-4 text-gray-700">Login</a>
                        <a href="{{ route('register') }}" class="text-gray-700">Register</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Page Content -->
        <main class="py-8">
            @yield('content')
        </main>
    </div>
</body>

</html>
