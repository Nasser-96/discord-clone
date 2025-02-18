import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { useFormik } from "formik";
import Modal from "../shared/modal";
import { CreateServerRequestType } from "@/core/types&enums/types";
import { createServerValidation } from "./create-server-validation";
import Button from "../shared/button";
import { useTranslation } from "react-i18next";
import InputField from "../shared/InputField";
import { useState } from "react";
import { ButtonVariantsEnum } from "@/core/types&enums/enums";
import UploadImage from "../upload-image/upload-image";
import GetBackendUrl from "@/core/helpers/backend-url";
import Image from "next/image";

interface CreateServerModalProps {
  closeModal: () => void;
}
export default function CreateServerModal({
  closeModal,
}: CreateServerModalProps) {
  const { t } = useTranslation();
  const { validation } = createServerValidation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik<CreateServerRequestType>({
    initialValues: { image_url: "", name: "" },
    validationSchema: validation,
    onSubmit: (values) => console.log(values),
  });

  const handleImageChange = (image_url: string) => {
    formik.setFieldValue("image_url", image_url);
  };

  return (
    <Modal>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <h1 className="font-bold w-full text-2xl text-center">
            {t("components.CreateServerModal.title")}
          </h1>
          <Button onClick={closeModal} className="border-none">
            <IoClose size={25} />
          </Button>
        </div>
        <h2 className="text-lg text-center mt-3 opacity-55">
          {t("components.CreateServerModal.subTitle")}
        </h2>
        {formik?.values?.image_url && (
          <Image
            src={formik?.values?.image_url}
            alt="server image"
            className="w-20 h-20 rounded-full mx-auto object-fill"
            width={100}
            height={100}
          />
        )}
        <form
          className="mt-4 w-full flex items-center justify-center gap-3 flex-col"
          onSubmit={formik.handleSubmit}
        >
          <UploadImage onChange={handleImageChange} />
          <InputField
            name="name"
            aria-label={t("components.CreateServerModal.nameLabel")}
            placeholder={t("components.CreateServerModal.namePlaceholder")}
            type="text"
            className="text-slate-900"
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Button
            isLoading={isLoading}
            variant={ButtonVariantsEnum.PRIMARY}
            type="submit"
            className="self-end mt-3 w-full lg:w-fit"
          >
            {t("shared.create")}
          </Button>
        </form>
      </div>
    </Modal>
  );
}
