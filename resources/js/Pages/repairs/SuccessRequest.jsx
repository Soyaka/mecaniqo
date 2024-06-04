// SuccessPage.jsx
import React from 'react';
import NavBar from './Navbar';
export default function SuccessRequest({ auth , notifications}){
    const dsh = '/ndashboard/' + auth.id;

    return (
    <div>
        <NavBar auth={auth} notifications={notifications}/>
    <div className="flex items-center justify-center flex-col gap-4 h-screen bg-gray-800">
        <div className="p-5 text-lg font-bold text-center text-green-500 bg-gray-800 border-4 border-gray-700 rounded-2xl shadow-lg">
            Your request has been made and you will Receive an email soon with start date and the end date of your repair
        </div>
        <button className="p-3 text-lg font-bold text-center text-green-500 bg-gray-800 border-4 border-gray-700 rounded-2xl shadow-lg"><a href={dsh}> go back to home page </a></button>
    </div>
    </div>
);
}

