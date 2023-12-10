"use client";
import { Slider } from "@/components/ui/slider";

export default function SunSlider({ setTime }: any) {
    const handleChange = (value: any) => {
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

// export default function SunSlider({ setTime }: any) {
//     const marks = [
//         {
//             value: 5,
//             label: "5 AM",
//         },
//         {
//             value: 12,
//             label: "12 PM",
//         },
//         {
//             value: 19,
//             label: "7 PM",
//         },
//     ];

//     const handleChange = (event: any, newValue: any) => {
//         if (typeof newValue === "number") {
//             setTime(newValue);
//         }
//     };

//     const SunSlider = styled(Slider)(({}) => ({
//         color: "#000000",
//         height: 2,
//         padding: "13px 0",
//         "& .MuiSlider-thumb": {
//             height: 27,
//             width: 27,
//             backgroundColor: "#ffffff",
//             "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
//                 boxShadow: "inherit",
//             },
//             "&:before": {
//                 display: "none",
//             },
//         },
//     }));

//     interface SunSliderThumbComponentProps
//         extends React.HTMLAttributes<unknown> {}

//     function SunSliderThumbComponent(props: SunSliderThumbComponentProps) {
//         const { children, ...other } = props;
//         return (
//             <SliderThumb {...other}>
//                 {children}
//                 <img src="/sun.svg" alt="Sun" className="w-8 h-8" />
//             </SliderThumb>
//         );
//     }

//     return (
//         <SunSlider
//             min={5}
//             max={19}
//             step={1}
//             slots={{ thumb: SunSliderThumbComponent }}
//             defaultValue={12}
//             marks={marks}
//             onChange={handleChange}
//             className="!w-2/3"
//         />
//     );
// }
