import { ChangeEvent, useEffect, useRef, useState } from "react";
import InputField from "../shared/InputField";
import { IoMdCloudUpload } from "@react-icons/all-files/io/IoMdCloudUpload";
import { uploadImageService } from "@/core/model/services";
import { useTranslation } from "react-i18next";
import {
  ReturnResponseType,
  UploadImageResponseType,
} from "@/core/types&enums/types";

interface UploadImageProps {
  onChange: (image_url: string) => void;
}

export default function UploadImage({ onChange }: UploadImageProps) {
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;
    try {
      if (!file) return;
      const image: ReturnResponseType<UploadImageResponseType> =
        await uploadImageService(file);
      console.log(image);

      onChange(image?.response?.image_url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        type="button"
        title="upload image"
        className="w-full mx-auto flex flex-col items-center justify-center border dark:border-gray-400 rounded-md py-5"
        onClick={() => {
          if (!fileRef.current) return;
          fileRef.current.value = "";
          fileRef.current.click();
        }}
      >
        <IoMdCloudUpload size={70} />
        <h1 className="text-2xl text-indigo-500 mt-5">
          {t("components.UploadImage.title")}
        </h1>
      </button>
      <input
        type="file"
        className="hidden"
        aria-label="upload image file"
        ref={fileRef}
        onChange={(e) => uploadFile(e)}
      />
    </>
  );
}
