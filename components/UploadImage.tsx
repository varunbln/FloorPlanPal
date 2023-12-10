"use client";

import { UrlBuilder } from "@bytescale/sdk";
import { UploadWidgetConfig } from "@bytescale/upload-widget";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { useRouter } from "next/navigation";

export default function UploadImage({ setImage }: any) {
    const router = useRouter();

    const options: UploadWidgetConfig = {
        apiKey: "free",
        maxFileCount: 1,
        mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
        editor: { images: { crop: false } },
        styles: { colors: { primary: "#000" } },
    };

    const UploadDropZone = () => (
        <UploadDropzone
            options={options}
            onUpdate={({ uploadedFiles }) => {
                if (uploadedFiles.length !== 0) {
                    const image = uploadedFiles[0];
                    const imageUrl = UrlBuilder.url({
                        accountId: image.accountId,
                        filePath: image.filePath,
                    });
                    setImage(imageUrl);
                    router.push("?image=" + imageUrl);
                }
            }}
            width="670px"
            height="250px"
        />
    );

    return <UploadDropZone />;
}
