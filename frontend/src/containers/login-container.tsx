import Button from "@/components/shared/button";
import InputField from "@/components/shared/InputField";
import { useTranslation } from "next-i18next";
import { useFormik } from "formik";
import {
  LoginRequestType,
  LoginResponseDataType,
  ReturnResponseType,
} from "@/types&enums/types";
import { useValidationSchema } from "./login-container.validation";
import { loginService } from "@/model/services";
import { useRouter } from "next/router";
import useUserStore from "@/stores/user-store";
import { getDecodeToken } from "@/helpers/helpers";
import { appRoutesObj } from "@/app-paths";

export default function LoginContainer() {
  const { t } = useTranslation("login");
  const { validation } = useValidationSchema();
  const route = useRouter();
  const { setUserData } = useUserStore();

  const formik = useFormik<LoginRequestType>({
    initialValues: { username: "", password: "" },
    validationSchema: validation,
    onSubmit: (values) => login(),
  });

  const login = async () => {
    try {
      const loginData: ReturnResponseType<LoginResponseDataType> =
        await loginService(formik.values);
      const token = loginData?.response?.user_token;
      setUserData(getDecodeToken(token));
      localStorage.setItem("access_token", token);
      route.push(appRoutesObj?.shared?.getHomePagePath());
    } catch (error) {
      console.log(error);
    }
  };

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
          onChange={formik.handleChange}
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
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
          onChange={formik.handleChange}
        />
        <Button className="w-full" type="submit">
          {t("login")}
        </Button>
      </form>
    </div>
  );
}
