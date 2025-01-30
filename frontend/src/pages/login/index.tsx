import { LanguageEnum } from "@/types&enums/enums";
import "../../utils/i18n";
import LoginContainer from "@/containers/login-container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { isTokenExpired } from "@/helpers/helpers";
import { useRouter } from "next/router";
import { appRoutesObj } from "@/app-paths";

export async function getServerSideProps({ locale }: { locale: LanguageEnum }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["login", "common"])),
    },
  };
}

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? "";
    if (token && !isTokenExpired(token)) {
      router.push(appRoutesObj.shared.getHomePagePath());
    }
  }, []);
  return <LoginContainer />;
};

export default LoginPage;
