"use client";

import { useRouter } from "next/navigation";

export default function Logo() {
    const router = useRouter();
    const handleClick = () => {
        router.push("/");
    };

    return (
        <div
            className="flex justify-center items-center cursor-pointer"
            onClick={handleClick}
        >
            <img src="/logo.svg" alt="Logo" className="w-16" />
            <div className="pl-2 font-semibold text-md md:block hidden">
                FloorPlanPal
            </div>
        </div>
    );
}
