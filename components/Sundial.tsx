"use client";

import { useState } from "react";
import UploadImage from "./UploadImage";
import { useSearchParams } from "next/navigation";
import SunSlider from "./SunSlider";
const SunCalc = require("suncalc");

export default function Sundial() {
    const [image, setImage] = useState("");
    const searchParams = useSearchParams();
    const imageUrl = searchParams.get("image");

    const [time, setTime] = useState(12);

    const getAngleFromTime = (time: number) => {
        const latitude = localStorage.getItem("latitude");
        const longitude = localStorage.getItem("longitude");
        const chosen_time = new Date();
        chosen_time.setHours(time, 0, 0, 0);
        const sun_position = SunCalc.getPosition(
            chosen_time,
            latitude,
            longitude
        );

        const azimuth = 180 + (sun_position.azimuth * 180) / Math.PI;
        console.log(azimuth, sun_position, chosen_time, latitude, longitude);
        const x_angle = time * 3.6;
        const y_angle = 90 - x_angle;
        return x_angle + "px " + y_angle + "px";
    };

    return (
        <div className="flex justify-center items-center w-full h-full">
            {!image && !imageUrl && (
                <div className="pt-48 py-24 w-full h-full flex justify-center">
                    <UploadImage setImage={setImage} />
                </div>
            )}
            {(imageUrl || image) && (
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full h-full relative flex items-center justify-center pt-48 py-24">
                        <img
                            src={imageUrl ? imageUrl : image}
                            alt="Floorplan"
                            className="w-2/3 h-2/3"
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
