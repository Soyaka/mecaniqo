import React from "react";

export default function DashboradCard({
    title,
    value,
    logo,
    color,
}: {
    title: string;
    value: string;
    logo: JSX.Element;
    color: string;
}) {
    return (
        <div className="w-1/4 mt-6  p-2 bg-transparent">
            <div className="bg-white flex flex-col shadow-md p-4 gap-5 rounded-lg">
                <div className="flex flex-row  gap-4 items-center justify-between">
                    <span className={`relative -translate-y-10 text-3xl font-bold rounded-xl shadow-lg bg-black p-3 ${color}`}>
                        {logo}
                    </span>
                    <div className="flex flex-col items-end justify-end text-blue-900">
                        <span className=" font-extralight "> {title}</span>
                        <span className="text-3xl font-bold"> {value}</span>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <span className="text-green-600">{"55% "}</span>
                    <span>{" than last month"}</span>
                </div>
            </div>
        </div>
    );
}
