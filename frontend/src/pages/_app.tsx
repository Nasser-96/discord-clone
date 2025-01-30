import "../utils/i18n";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation, useTranslation } from "next-i18next";
import { DirectionEnum, LanguageEnum } from "@/types&enums/enums";
import { useEffect } from "react";
import { getDecodeToken, isTokenExpired } from "@/helpers/helpers";
import useUserStore from "@/stores/user-store";
import { useRouter } from "next/router";
import { appRoutesObj } from "@/app-paths";
import ComponentLoader from "@/components/shared/componentLoader";

function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();
  const { setUserData, userData } = useUserStore();
  const navigate = useRouter();
  const location = navigate.pathname;

  const dir =
    i18n?.language === LanguageEnum.AR ? DirectionEnum.RTL : DirectionEnum.LTR;

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? "";

    if (token && !isTokenExpired(token)) {
      setUserData(getDecodeToken(token));
    } else {
      if (location !== appRoutesObj.shared?.getLoginPagePath()) {
        navigate.push(appRoutesObj.shared?.getLoginPagePath());
      }
    }
  }, []);

  if (!userData?.username) {
    return (
      <main
        dir={dir}
        className={`min-h-screen w-full flex items-center justify-center bg-slate-900`}
      >
        <ComponentLoader />
      </main>
    );
  }

  return (
    <main dir={dir} className={`min-h-screen bg-slate-900`}>
      <Component {...pageProps} />
    </main>
  );
}

export default appWithTranslation(App);
