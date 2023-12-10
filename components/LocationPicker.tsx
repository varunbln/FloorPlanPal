"use client";

import * as React from "react";
import { useState, useEffect } from "react";
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

//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function LocationPicker() {
    const { data, error } = useSWR(
        "https://restcountries.com/v3.1/all?fields=name,capitalInfo",
        fetcher
    );
    if (error) return <div>Failed to load countries.</div>;

    const handleChange = (value: any) => {
        if (value === "current") {
            if ("geolocation" in navigator) {
                // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
                navigator.geolocation.getCurrentPosition(({ coords }) => {
                    const { latitude, longitude } = coords;
                    localStorage.setItem("latitude", latitude.toString());
                    localStorage.setItem("longitude", longitude.toString());
                });
            } else {
                alert("Your browser does not support geolocation.");
            }
        }
    };

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Choose Location" />
            </SelectTrigger>
            <SelectContent>
                {!data && <SelectItem>Loading...</SelectItem>}
                {data && (
                    <SelectGroup>
                        <SelectItem value="current" className="font-bold">
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
