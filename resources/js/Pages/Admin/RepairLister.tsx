import React from "react";
import { RepairProps } from "@/types";
export default function RepairLister({ repairs }: { repairs: RepairProps[] }) {
    return (
        <div className="custom-scrollbar w-full h-[85%] overflow-y-scroll flex flex-col px-4 gap-6 justify-start rounded-md shadow-md bg-white border"></div>
    );
}



export function RepairRow({ repair }: { repair: RepairProps }) {
    return (
        <div className="w-full p-2 flex items-center justify-between">
           <div className="">
                <h2>{repair.mechanic?.name}</h2>
                <span>{repair.description}</span>
                
           </div>
        </div>
    );
}