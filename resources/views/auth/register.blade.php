@extends('layouts.app')

@section('content')
<div class=" flex flex-row  p-2  justify-center items-center max-h-screen h-full ">
    <div class=" p-2 border-white w-[22%] max-w-[30em] min-w-[15em]  space-y-6">
        <div>
            <h2 class=" text-center text-3xl font-extrabold text-red-600">
                {{ __('Register') }}
            </h2>

            <p class="mt-4 text-center text-sm text-gray-600">
                {{ __('Already registered?') }}
                <a href="{{ route('login') }}" class="font-medium text-red-600 hover:text-red-500">
                    {{ __('Login') }}
                </a>
            </p>
        </div>
        <form class=" flex flex-col items-center justify-center space-y-6 " action="{{ route('register') }}" method="POST">
            @csrf
            <div class=" flex flex-col gap-3 rounded-md shadow-sm  -space-y-px w-full ">
                <div>
                    <label for="name" class="sr-only">{{ __('Name') }}</label>
                    <input id="name" name="name" type="text" autocomplete="name" required
                        class="inp"
                        placeholder="{{ __('Name') }}" value="{{ old('name') }}">
                    @error('name')
                    <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>



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
                    <label for="password-confirm" class="sr-only">{{ __('Confirm Password') }}</label>
                    <input id="password-confirm" name="password_confirmation" type="password"
                        autocomplete="new-password" required
                        class="inp"
                        placeholder="{{ __('Confirm Password') }}">
                </div>

                <div>
                    <label for="terms-and-conditions" class="flex items-center">
                        <input id="terms-and-conditions" name="terms_and_conditions" type="checkbox"
                            class="checkbox  " required>
                        <span class="ml-2 text-sm text-gray-600">
                            I agree to the
                            <a href="#" class="font-medium text-red-600 hover:text-red-500">
                                terms and conditions
                            </a>
                        </span>
                    </label>
                </div>
            </div>

            <div class="flex flex-col items-center justify-center w-full ">
                <button type="submit"
                    class="group relative w-[50%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-600 hover:bg-red-700 cursor-pointer ">
                    {{ __('Register') }}
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
