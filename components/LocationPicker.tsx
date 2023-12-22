"use client";

import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useSWR from "swr";
import { useRouter } from "next/navigation";

//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function LocationPicker() {
    const { data, error } = useSWR(
        "https://restcountries.com/v3.1/all?fields=name,capitalInfo",
        fetcher
    );
    if (error) return <div>Failed to load countries.</div>;

    const router = useRouter();

    const handleChange = (value: any) => {
        if (value === "Current Location") {
            if ("geolocation" in navigator) {
                // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
                navigator.geolocation.getCurrentPosition(({ coords }) => {
                    const { latitude, longitude } = coords;
                    localStorage.setItem("latitude", latitude.toString());
                    localStorage.setItem("longitude", longitude.toString());
                    localStorage.setItem("location", value);
                    window.location.reload();
                });
            } else {
                alert("Your browser does not support geolocation.");
            }
        } else {
            localStorage.setItem("location", value);
            const country = data.find((country: any) => {
                return country.name.common === value;
            });
            localStorage.setItem("latitude", country.capitalInfo.latlng[0]);
            localStorage.setItem("longitude", country.capitalInfo.latlng[1]);
            window.location.reload();
        }
    };

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger className="w-[200px]">
                <SelectValue
                    placeholder={
                        localStorage.getItem("location")
                            ? localStorage.getItem("location")
                            : "Choose Location"
                    }
                />
            </SelectTrigger>
            <SelectContent>
                {!data && <SelectItem value="loading">Loading...</SelectItem>}
                {data && (
                    <SelectGroup>
                        <SelectItem
                            value="Current Location"
                            className="font-bold"
                        >
                            My Current Location
                        </SelectItem>
                        {data.map((country: any) => {
                            return (
                                <SelectItem
                                    value={country.name.common}
                                    key={country.name.common}
                                >
                                    {country.name.common}
                                </SelectItem>
                            );
                        })}
                    </SelectGroup>
                )}
            </SelectContent>
        </Select>
    );
}
