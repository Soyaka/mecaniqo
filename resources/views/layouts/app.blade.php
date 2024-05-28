<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name', 'Laravel') }}</title>
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')

</head>

<body>
    <div class=" flex flex-col gap-6 ">
        <x-header />
        <main class="py-2 h-[70%] max-h-[70%]">
            @yield('content')
        </main>
    </div>
</body>

</html>
