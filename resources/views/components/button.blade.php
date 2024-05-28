<!-- button.blade.php -->

<button {{ $attributes->merge(['class' => 'py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600']) }}>
    {{ $slot }}
</button>
