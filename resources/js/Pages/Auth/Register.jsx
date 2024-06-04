import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role:'client', // Add role field
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        // <GuestLayout>
        //     <Head title="Register" />

        //     <form onSubmit={submit}>
        //         <div>
        //             <InputLabel htmlFor="name" value="Name" />

        //             <TextInput
        //                 id="name"
        //                 name="name"
        //                 value={data.name}
        //                 className="mt-1 block w-full"
        //                 autoComplete="name"
        //                 isFocused={true}
        //                 onChange={(e) => setData('name', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.name} className="mt-2" />
        //         </div>
        //         <div className="mt-4">
        //             <InputLabel htmlFor="email" value="Email" />

        //             <TextInput
        //                 id="email"
        //                 type="email"
        //                 name="email"
        //                 value={data.email}
        //                 className="mt-1 block w-full"
        //                 autoComplete="email"
        //                 onChange={(e) => setData('email', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.email} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="password" value="Password" />

        //             <TextInput
        //                 id="password"
        //                 type="password"
        //                 name="password"
        //                 value={data.password}
        //                 className="mt-1 block w-full"
        //                 autoComplete="new-password"
        //                 onChange={(e) => setData('password', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.password} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

        //             <TextInput
        //                 id="password_confirmation"
        //                 type="password"
        //                 name="password_confirmation"
        //                 value={data.password_confirmation}
        //                 className="mt-1 block w-full"
        //                 autoComplete="new-password"
        //                 onChange={(e) => setData('password_confirmation', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.password_confirmation} className="mt-2" />
        //         </div>

        //         <div className="flex items-center justify-end mt-4">
        //             <Link
        //                 href={route('login')}
        //                 className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //             >
        //                 Already registered?
        //             </Link>

        //             <PrimaryButton className="ms-4" disabled={processing}>
        //                 Register
        //             </PrimaryButton>
        //         </div>
        //     </form>
        // </GuestLayout>
        <div style={{ background: '#161D32' }} className="flex flex-col gap-7 items-center justify-center w-screen h-screen p-8 m-0">
                <h1 className='text-white text-3xl'><strong>Register</strong></h1>
                <form style={{ background: '#161D32' }} className="max-w-sm w-full bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-lg" onSubmit={submit}>
                    {/* {error && <div className="mb-4 text-red-500">{error}</div>} */}
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Name</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-300 bg-gray-700 border border-e-0 border-gray-600 rounded-s-md">
                                <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                            </span>
                            <input type="text" id="name" value={data.name}  onChange={(e) => setData('name', e.target.value)} className="rounded-none rounded-e-lg bg-gray-700 border border-gray-600 text-gray-300 focus:ring-0 focus:border-gray-600 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="Bonnie Green" required />
                        </div>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                </svg>
                            </div>
                            <input type="email" id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-0  block w-full ps-10 p-2.5" placeholder="name@example.com" required />
                        </div>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                        <input type="password" id="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="shadow-sm bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-0 focus:border-gray-600 block w-full p-2.5" placeholder="Password" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-white">Confirm Password</label>
                        <input type="password" id="confirmPassword" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="shadow-sm bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-0 focus:border-gray-600 block w-full p-2.5" placeholder="Confirm Password" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                </form>
            </div>
    );
}
