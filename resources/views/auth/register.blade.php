@extends('layouts.app')

@section('content')
<div class="min-h-screen flex justify-center items-center max-h-screen h-full">
    <div class="flex gap-4 max-w-md w-full space-y-6">
        <div>
            <h2 class="text-center text-3xl font-extrabold text-gray-900">
                {{ __('Register') }}
            </h2>
        </div>
        <form class="space-y-6" action="{{ route('register') }}" method="POST">
            @csrf
            <div class="flex flex-col gap-2 rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="name" class="sr-only">{{ __('Name') }}</label>
                    <input id="name" name="name" type="text" autocomplete="name" required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="{{ __('Name') }}" value="{{ old('name') }}">
                    @error('name')
                    <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="email" class="sr-only">{{ __('Email address') }}</label>
                    <input id="email" name="email" type="email" autocomplete="email" required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="{{ __('Email address') }}" value="{{ old('email') }}">
                    @error('email')
                    <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div class="w-full flex gap-3">
                    <label class="flex gap-3 items-center">
                        <input id="role-admin" name="role" type="radio" value="admin"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                        <span class="ml-2 text-sm text-gray-600">Admin</span>
                    </label>
                    <label class="flex gap-3 items-center">
                        <input id="role-user" name="role" type="radio" value="user"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                        <span class="ml-2 text-sm text-gray-600">User</span>
                    </label>
                    <label class="flex gap-3 items-center">
                        <input id="role-technician" name="role" type="radio" value="technician"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                        <span class="ml-2 text-sm text-gray-600">Technician</span>
                    </label>
                    @error('role')
                    <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="password" class="sr-only">{{ __('Password') }}</label>
                    <input id="password" name="password" type="password" autocomplete="new-password" required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="{{ __('Password') }}">
                    @error('password')
                    <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
                <div>
                    <label for="password-confirm" class="sr-only">{{ __('Confirm Password') }}</label>
                    <input id="password-confirm" name="password_confirmation" type="password" autocomplete="new-password" required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="{{ __('Confirm Password') }}">
                </div>

                <div>
                    <label for="terms-and-conditions" class="flex items-center">
                        <input id="terms-and-conditions" name="terms_and_conditions" type="checkbox"
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" required>
                        <span class="ml-2 text-sm text-gray-600">
                            I agree to the
                            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                                terms and conditions
                            </a>
                        </span>
                    </label>
                </div>
            </div>

            <div>
                <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md redButton">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <!-- Optional icon here -->
                    </span>
                    {{ __('Register') }}
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
