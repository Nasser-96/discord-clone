"use client";

import Button from "../../components/shared/button";
import InputField from "../../components/shared/InputField";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import {
  LoginRequestType,
  LoginResponseDataType,
  ReturnResponseType,
} from "../../core/types&enums/types";
import { useValidationSchema } from "./login-container.validation";
import { loginService } from "../../core/model/services";
import useUserStore from "../../core/stores/user-store";
import { getDecodeToken } from "../../core/helpers/helpers";
import { appRoutesObj } from "../../app-paths";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ButtonSizeEnum, ButtonVariantsEnum } from "@/core/types&enums/enums";

export default function LoginContainer() {
  const { t } = useTranslation();
  const { validation } = useValidationSchema();
  const route = useRouter();
  const { setUserData } = useUserStore();

  const formik = useFormik<LoginRequestType>({
    initialValues: { username: "", password: "" },
    validationSchema: validation,
    onSubmit: (values) => login(values),
  });

  const login = async (values: LoginRequestType) => {
    try {
      const loginData: ReturnResponseType<LoginResponseDataType> =
        await loginService(values);
      const token = loginData?.response?.user_token;
      setUserData(getDecodeToken(token));
      localStorage.setItem("access_token", token);
      route.push(appRoutesObj?.shared?.getHomePagePath());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      route.push(appRoutesObj?.shared?.getHomePagePath());
    }
  }, []);

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-slate-800 py-3 px-5 min-w-[300px] rounded flex flex-col gap-3"
      >
        <InputField
          aria-label={t("username")}
          placeholder={t("username")}
          type="text"
          name="username"
          className="text-slate-900"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={
            formik.touched.username && formik.errors.username
              ? formik.errors.username
              : ""
          }
        />
        <InputField
          aria-label={t("password")}
          placeholder={t("password")}
          type="password"
          name="password"
          className="text-slate-900"
          value={formik.values.password}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
          onChange={formik.handleChange}
        />
        <Button
          variant={ButtonVariantsEnum.OUTLINE}
          className="w-full"
          type="submit"
        >
          {t("login")}
        </Button>
      </form>
    </div>
  );
}
