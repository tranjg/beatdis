'use client';

import Image from "next/image";

export default function Navbar() {
    return(
        <div className="flex flex-row justify-between h-[100px] border-b min-w-screen">
            <div className="flex items-center">
                <Image 
                    src={"/beatdis.png"}
                    width={300}
                    height={300}
                    alt="beatdis."
                />
            </div>
        </div>
    )
}