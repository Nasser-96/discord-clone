import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const createServerValidation = () => {
  const { t } = useTranslation();

  const validation = Yup.object({
    image_url: Yup.string().required(t("error.required")),
    name: Yup.string().required(t("error.required")),
  });

  return { validation };
};
