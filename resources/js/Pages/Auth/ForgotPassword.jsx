import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        // <GuestLayout>
        //     <Head title="Forgot Password" />
        <div className='flex flex-col bg-gray-800 w-full h-screen p-4 justify-center items-center'>
            <Head title="Forgot Password" />
            <h1 className='text-white text-2xl  font-bold m-6'>Reset Password</h1>
            <form onSubmit={submit} className="space-y-4 w-1/2 mx-auto bg-gray-900 p-4 rounded-xl shadow">
                <div className="mb-4 text-md text-gray-200">
                    Forgot your password? No problem. Just let us know your email address and we will email you a password
                    reset link that will allow you to choose a new one.
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-1/2 p-2 text-gray-200 rounded-md mx-auto"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />
                <InputError message={errors.email} className="mt-2 text-red-500" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </div>
        // </GuestLayout>
    );
}
