"use client";

import { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import { useSearchParams } from "next/navigation";
import SunSlider from "./SunSlider";
import PreLoadedImages from "./PreLoadedImages";
const SunCalc = require("suncalc3");

export default function Sundial() {
    const [image, setImage] = useState("");
    const searchParams = useSearchParams();
    const imageUrl = searchParams.get("image");

    const [time, setTime] = useState(12);
    const [timezone, setTimezone] = useState("");

    useEffect(() => {
        if (
            "geolocation" in navigator &&
            (localStorage.getItem("latitude") === null ||
                localStorage.getItem("longitude") === null)
        ) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                localStorage.setItem("latitude", latitude.toString());
                localStorage.setItem("longitude", longitude.toString());
                localStorage.setItem("location", "Current Location");
                window.location.reload();
            });
        }
    }, []);

    useEffect(() => {
        fetch(
            "/api/get_timezone?latitude=" +
                localStorage.getItem("latitude") +
                "&longitude=" +
                localStorage.getItem("longitude")
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.data.iana_timezone === null) {
                    alert(
                        "This location is not supported yet. Please try another location."
                    );
                    return;
                }
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

    const getAngleFromTime = (time: number) => {
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
        const screenSize = Math.min(window.innerWidth, window.innerHeight);
        console.log(screenSize);
        let radius = 180;
        if (screenSize > 600) radius = 280;

        const x = radius * Math.cos((azimuth - 90) * (Math.PI / 180));
        const y = radius * Math.sin((azimuth - 90) * (Math.PI / 180));

        const x_angle = `${x}px`;
        const y_angle = `${y}px`;

        return `${x_angle} ${y_angle}`;
    };

    return (
        <div className="flex justify-center items-center w-full h-full">
            {!image && !imageUrl && (
                <div className="w-full h-full flex-col items-center justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <UploadImage setImage={setImage} />
                        <PreLoadedImages />
                    </div>
                </div>
            )}
            {(imageUrl || image) && (
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full h-full py-24">
                        <SunSlider setTime={setTime} />
                    </div>
                    <div className="w-full h-full relative flex items-center justify-center ">
                        <img
                            src={imageUrl ? imageUrl : image}
                            alt="Floorplan"
                            className="w-2/3 h-2/3 max-h-md max-w-md"
                        />
                        <img
                            className={"absolute z-10 w-8 h-8"}
                            style={{ translate: getAngleFromTime(time) }}
                            src="/sun.svg"
                            alt="Sun"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
