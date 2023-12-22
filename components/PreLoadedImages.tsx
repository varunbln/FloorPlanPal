import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PreLoadedImages() {
    const router = useRouter();

    const images = [
        "https://i.imgur.com/EGH7Xgs.png",
        "https://i.imgur.com/hwvKywi.jpg",
        "https://i.imgur.com/0umqzys.png",
        "https://i.imgur.com/0tGRy6L.png",
    ];

    return (
        <section className="w-full max-w-2xl">
            <div className="mx-auto w-full max-w-7xl px-4 mb-8">
                <h2 className="my-2 text-slate-900 font-medium">
                    Or try using one of our example images
                </h2>
                <div className="flex md:flex-row flex-col justify-between items-center w-full">
                    {images.map((image, index) => {
                        return (
                            <Image
                                key={index}
                                src={image}
                                //@ts-ignore
                                alt="sample floorplan"
                                width={512}
                                height={512}
                                className={
                                    "h-72 w-72 md:h-32 md:w-32 object-cover my-2 mx-2 cursor-pointer rounded-xl border-2 border-slate-700 p-1"
                                }
                                onClick={() => {
                                    router.push("/?image=" + image);
                                    router.refresh();
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
