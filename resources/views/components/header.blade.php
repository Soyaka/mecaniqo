<!-- header.blade.php -->
@php
    $links = [
        ['name' => 'Home', 'url' => '#'],
        ['name' => 'Services', 'url' => '#'],
        ['name' => 'About', 'url' => '#'],
        ['name' => 'Contact', 'url' => '#'],
    ];
@endphp

<header class="flex items-center justify-between border-b border-red-600 h-16  p-4   md:p-6">
    <a href="#" class="flex items-center gap-3 text-red-600/90 " style="text-decoration: none;" >
        <x-car-icon class="w-8 h-8 " />
        <span class=" font-bold text-3xl tracking-wider ">mecanico</span>

    </a>
    <div class="hidden md:flex items-center justify-start text-sm font-light text-gray-600 gap-6">
        @foreach ($links as $link)
            <a href="{{ $link['url'] }}" class="text-gray-600 hover:text-red-600" style="text-decoration: none;">
                {{ $link['name'] }}
            </a>
        @endforeach
    </div>
    
    <x-button class="md:hidden" size="icon" variant="ghost">
        <x-menu-icon class="w-6 h-6" />
        <span class="sr-only"> navigation</span>
    </x-button>
</header>
