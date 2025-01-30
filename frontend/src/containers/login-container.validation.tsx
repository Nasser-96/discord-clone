import { useTranslation } from "next-i18next";
import * as Yup from "yup";

export const useValidationSchema = () => {
  const { t } = useTranslation("common");

  const validation = Yup.object({
    username: Yup.string().required(t("error.required")),
    password: Yup.string().required(t("error.required")),
  });

  return { validation };
};
