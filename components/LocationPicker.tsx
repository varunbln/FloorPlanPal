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
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function LocationPicker() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const { data, error } = useSWR(
        "https://restcountries.com/v3.1/all?fields=name,capitalInfo",
        fetcher
    );
    if (error) return <div>Failed to load countries.</div>;

    const handleChange = (value: any) => {
        if (value === "my current location") {
            if ("geolocation" in navigator) {
                // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
                navigator.geolocation.getCurrentPosition(({ coords }) => {
                    const { latitude, longitude } = coords;
                    localStorage.setItem("latitude", latitude.toString());
                    localStorage.setItem("longitude", longitude.toString());
                    localStorage.setItem("location", value);
                });
            } else {
                alert("Your browser does not support geolocation.");
            }
        } else {
            localStorage.setItem("location", value);
            const country = data.find((country: any) => {
                return country.name.common.toLowerCase() === value;
            });
            localStorage.setItem("latitude", country.capitalInfo.latlng[0]);
            localStorage.setItem("longitude", country.capitalInfo.latlng[1]);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {localStorage.getItem("location")
                        ? localStorage.getItem("location")
                        : "Choose Location"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search location..."
                        className="h-9"
                    />
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                        {!data && (
                            <SelectItem value="loading">Loading...</SelectItem>
                        )}
                        <CommandItem
                            value="My Current Location"
                            className="font-bold"
                            onSelect={(currentValue) => {
                                setValue(
                                    currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                                handleChange(currentValue);
                            }}
                        >
                            My Current Location
                        </CommandItem>
                        {data &&
                            data.map((country: any) => (
                                <CommandItem
                                    key={country.name.common}
                                    value={country.name.common}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ""
                                                : currentValue
                                        );
                                        setOpen(false);
                                        handleChange(currentValue);
                                    }}
                                >
                                    {country.name.common}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === country.name.common
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
