import React, { useCallback } from "react";
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { X } from "lucide-react";

type Props = {
    endpoint: "serverImage" | "messageFile";
    value: string;
    onChange: (url?: string) => void;
};

const FileUpLoad = ({ endpoint, value, onChange }: Props) => {
    const fileType = value?.split(".").pop();

    const onUploadComplete = useCallback(
        (res: any) => {
            if (res && res[0] && res[0].url) {
                onChange(res[0].url);
            }
        },
        [onChange]
    );

    const onUploadError = useCallback((error: Error) => {
        console.error("Upload error:", error);
    }, []);

    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image src={value} className="rounded-full" alt="Upload" fill />
                <button onClick={() => onChange("")} className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm" type="button">
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={onUploadComplete}
            onUploadError={onUploadError}
            config={{ mode: "auto" }}
            appearance={{
                button: { background: "rgba(99, 102, 241,1)" },
                container: { padding: "2rem" },
            }}
        />
    );
};

export default FileUpLoad;
