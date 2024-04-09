"use client";

import { signOut } from "next-auth/react";


export default function UserInfo() {
    return(
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-7"> 
                <div>
                   Artist Name: <span className="font-bold">Drake</span>
                </div>
                <div>
                    Email: <span className="font-bold">drake@gmail.com</span>
                </div>

                <button onClick={() => signOut()} className="bg-red-600 border overflow-hidden rounded-md text-white font-bold cursor-pointer px-6 py-2 mt-4 transition-all duration-200 ease-out hover:border-1 hover:border-red-600  hover:bg-white hover:text-red-600 focus:outline-none focus:ring-red-600 focus:ring-1">
                    Log Out
                </button>
            </div>
        </div>
    )
}