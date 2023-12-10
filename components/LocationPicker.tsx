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
    return (
        <Select>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Choose Location" />
            </SelectTrigger>
            <SelectContent>
                {!data && <SelectItem>Loading...</SelectItem>}
                {data && (
                    <SelectGroup>
                        {/* <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="usa">
                            United States of America
                        </SelectItem>
                        <SelectItem value="mexico">Mexico</SelectItem> */}
                        {data.map((country: any) => {
                            return (
                                <SelectItem value={country.name.common}>
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
