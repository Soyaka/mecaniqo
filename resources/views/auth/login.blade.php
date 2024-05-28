@extends('layouts.app')

@section('content')
<div class=" flex flex-row  p-2  justify-center items-center max-h-screen h-full ">
    <div class=" p-2 border-white w-[22%] max-w-[30em] min-w-[15em]  space-y-6">
        <div>
            <h2 class=" text-center text-3xl font-extrabold text-red-600">
                {{ __('Login') }}
            </h2>

            <p class="mt-4 text-center text-sm text-gray-600">
                {{ __('You do not have an account?') }}
                <a href="{{ route('register') }}" class="font-medium text-red-600 hover:text-red-500">
                    {{ __('Register') }}
                </a>
            </p>
        </div>
        <form class=" flex flex-col items-center justify-center space-y-6 " action="{{ route('login') }}" method="POST">
            @csrf
            <div class=" flex flex-col gap-3 rounded-md shadow-sm  -space-y-px w-full ">




                <div>
                    <label for="email" class="sr-only">{{ __('Email address') }}</label>
                    <input id="email" name="email" type="email" autocomplete="email" required
                        class="inp"
                        placeholder="{{ __('Email address') }}" value="{{ old('email') }}">
                    @error('email')
                    <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>


               
                

                <div>
                    <label for="password" class="sr-only">{{ __('Password') }}</label>
                    <input id="password" name="password" type="password" autocomplete="new-password" required
                        class="inp"
                        placeholder="{{ __('Password') }}">
                    @error('password')
                    <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
                <div>
                    <label for ="role" class="sr-only">{{ __('Role') }}</label>
                    <select name="role" id="role" class="inp">
                        <option value="user">Client</option>
                        <option value="admin">Admin</option>
                        <option value="admin">Moderator  </option>

                    </select>
                </div>
                <div>
                    <label for="remember" class="flex items-center">
                        <input id="remember" name="remember" type="checkbox"
                            class="checkbox " required>
                        <span class="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>
            </div>

            <div class="flex flex-col items-center justify-center w-full ">
                <button type="submit"
                    class="group relative w-[50%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-600 hover:bg-red-700 cursor-pointer ">
                    {{ __('Login') }}
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
