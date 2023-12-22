"use client";
import { Slider } from "@/components/ui/slider";

export default function SunSlider({ setTime }: any) {
    const handleChange = (value: any) => {
        if (
            localStorage.getItem("latitude") === undefined ||
            localStorage.getItem("longitude") === undefined ||
            localStorage.getItem("latitude") === null ||
            localStorage.getItem("longitude") === null
        ) {
            alert(
                "Please select a location first from the top right of the page."
            );
            return;
        }
        setTime(value[0]);
    };
    return (
        <div className="flex justify-center items-center w-full">
            <img src="/sun_icon.svg" alt="Sun" className="w-6 h-6" />
            <Slider
                defaultValue={[12]}
                min={5}
                max={19}
                className="!w-2/3 mx-2"
                onValueChange={handleChange}
            />
            <img src="/moon_icon.svg" alt="Sun" className="w-6 h-6" />
        </div>
    );
}
