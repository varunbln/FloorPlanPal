"use client";

import { useState } from "react";
import UploadImage from "./UploadImage";
import { useSearchParams } from "next/navigation";
import SunSlider from "./SunSlider";

export default function Sundial() {
    const [image, setImage] = useState("");
    const searchParams = useSearchParams();
    const imageUrl = searchParams.get("image");

    const [time, setTime] = useState(12);

    const getAngleFromTime = (time: number) => {
        const x_angle = time * 3.6;
        const y_angle = 90 - x_angle;
        return x_angle + "px " + y_angle + "px";
    };

    return (
        <div className="flex justify-center items-center w-full h-full">
            {!image && !imageUrl && <UploadImage setImage={setImage} />}
            {(imageUrl || image) && (
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full h-full relative flex items-center justify-center pt-48 py-24">
                        <img
                            src={imageUrl ? imageUrl : image}
                            alt="Floorplan"
                            className="w-1/2 h-1/2"
                        />
                        <img
                            className={"absolute z-10 w-8 h-8"}
                            style={{ translate: getAngleFromTime(time) }}
                            src="/sun.svg"
                            alt="Sun"
                        />
                    </div>
                    <SunSlider setTime={setTime} />
                </div>
            )}
        </div>
    );
}
