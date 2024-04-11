'use client';

import UserInfo from "@/components/UserInfo.tsx";

export default function Sidebar() {
    return(
        <div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4">
                <div>
                    <UserInfo />
                </div>
                <div className="grow">
                    <h1 className="text-zinc-400 text-lg font-extralight">
                        Library
                    </h1>
                </div>
        </div>
    )
}