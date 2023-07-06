"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}
const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="m3llmpyp"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            className="relative cursor-pointer hover:opacity-70 transtion border-dashed borer-2 p-20 borer-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
            onClick={() => open?.()}
          >
            <TbPhotoPlus size={50}/>
            <button className="font-semibold text-lg">
                Click to upload
            </button>
            {value && (
                <div
                className="absolute inset-0 w-full h-full"
                >   
                    <Image
                    alt="upload"
                    fill
                    style={{objectFit:"cover"}}
                    src={value}
                    />
                </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
