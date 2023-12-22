"use client";

import { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import { useSearchParams } from "next/navigation";
import SunSlider from "./SunSlider";
const SunCalc = require("suncalc3");

export default function Sundial() {
    const [image, setImage] = useState("");
    const searchParams = useSearchParams();
    const imageUrl = searchParams.get("image");

    const [time, setTime] = useState(12);
    const [timezone, setTimezone] = useState("");
    const [sunStyle, setSunStyle] = useState<React.CSSProperties | undefined>(
        undefined
    );

    useEffect(() => {
        const updateSunStyle = async () => {
            const angle = await getAngleFromTime(time);
            setSunStyle({ transform: `translate(${angle})` });
        };

        updateSunStyle();
    }, [time]);

    useEffect(() => {
        fetch(
            "/api/get_timezone?latitude=" +
                localStorage.getItem("latitude") +
                "&longitude=" +
                localStorage.getItem("longitude")
        )
            .then((res) => res.json())
            .then((data) => {
                setTimezone(data.data.iana_timezone);
            });
    }, []);

    const dateWithTimeZone = (
        timeZone: string,
        year: number,
        month: number,
        day: number,
        hour: number,
        minute: number,
        second: number
    ) => {
        let date = new Date(Date.UTC(year, month, day, hour, minute, second));
        let utcDate = new Date(
            date.toLocaleString("en-US", { timeZone: "UTC" })
        );
        let tzDate = new Date(
            date.toLocaleString("en-US", { timeZone: timeZone })
        );
        let offset = utcDate.getTime() - tzDate.getTime();
        date.setTime(date.getTime() + offset);
        return date;
    };

    const getAngleFromTime = async (time: number) => {
        console.log(timezone);
        const latitude = localStorage.getItem("latitude");
        const longitude = localStorage.getItem("longitude");
        const today_date = new Date();
        const chosen_time = dateWithTimeZone(
            timezone === "" || timezone === null ? "UTC" : timezone,
            today_date.getFullYear(),
            today_date.getMonth(),
            today_date.getDate(),
            time,
            0,
            0
        );
        const sun_position = SunCalc.getPosition(
            chosen_time,
            latitude,
            longitude
        );
        const azimuth = sun_position.azimuthDegrees;
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
                            style={sunStyle}
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
