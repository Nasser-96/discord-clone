import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { useFormik } from "formik";
import Modal from "../shared/modal";
import {
  CreatedServerType,
  CreateServerRequestType,
  ReturnResponseType,
} from "@/core/types&enums/types";
import { createServerValidation } from "./create-server-validation";
import Button from "../shared/button";
import { useTranslation } from "react-i18next";
import InputField from "../shared/InputField";
import { useState } from "react";
import { ButtonVariantsEnum } from "@/core/types&enums/enums";
import UploadImage from "../upload-image/upload-image";
import { useRouter } from "next/navigation";
import { createServerService } from "@/core/model/services";
import { appRoutesObj } from "@/app-paths";

interface CreateServerModalProps {
  shouldRedirect: boolean;
  isModalOpen: boolean;
  closeModal: () => void;
  onCreate?: () => void;
}
export default function CreateServerModal({
  shouldRedirect,
  isModalOpen,
  closeModal,
  onCreate,
}: CreateServerModalProps) {
  const { t } = useTranslation();
  const { validation } = createServerValidation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik<CreateServerRequestType>({
    initialValues: { image_url: "", name: "" },
    validationSchema: validation,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (values: CreateServerRequestType) => {
    setIsLoading(true);
    try {
      const createdServer: ReturnResponseType<CreatedServerType> =
        await createServerService(values);
      if (onCreate) {
        onCreate();
        closeModal();
      }
      if (shouldRedirect) {
        router.push(
          appRoutesObj.shared.getServerPath(createdServer?.response?.id)
        );
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const handleImageChange = (image_url: string) => {
    formik.setFieldValue("image_url", image_url);
  };

  const handleDeleteImage = () => {
    formik.setFieldValue("image_url", "");
  };

  return (
    <Modal isOpen={isModalOpen}>
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
        <form
          className="mt-4 w-full flex items-center justify-center gap-3 flex-col"
          onSubmit={formik.handleSubmit}
        >
          <UploadImage
            image={formik?.values?.image_url}
            error={formik?.errors?.image_url ?? ""}
            onChange={handleImageChange}
            deleteImage={handleDeleteImage}
          />
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
