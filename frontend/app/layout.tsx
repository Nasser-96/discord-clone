"use client";

import ComponentLoader from "@/components/shared/componentLoader";
import "./globals.css";
import { appRoutesObj } from "@/app-paths";
import {
  getDecodeToken,
  getTransitionClass,
  isTokenExpired,
  setUserDataFromToken,
} from "@/core/helpers/helpers";
import { useEffect } from "react";
import useUserStore from "@/core/stores/user-store";
import { useRouter, usePathname } from "next/navigation";
import {
  DirectionEnum,
  LanguageEnum,
  ThemeEnum,
} from "@/core/types&enums/enums";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18next from "../core/utils/i18n";
import SharedLayout from "@/components/shared-layout/shared-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userData, token } = useUserStore();
  const { i18n } = useTranslation();
  const isLight = userData?.profile?.theme === ThemeEnum.LIGHT;
  const navigate = useRouter();
  const location = usePathname();

  const dir =
    i18next?.language === LanguageEnum.AR
      ? DirectionEnum.RTL
      : DirectionEnum.LTR;

  useEffect(() => {
    // Check if the token is expired or not
    // If the token is not expired, set the user data
    // If the token is expired or not found, navigate to the login page
    const newToken = localStorage.getItem("access_token") ?? "";
    if (newToken && !isTokenExpired(newToken)) {
      const decodedToken = getDecodeToken(newToken);
      i18n.changeLanguage(decodedToken?.profile?.preferred_language);
      setUserDataFromToken(newToken);
    } else {
      if (location !== appRoutesObj.shared?.getLoginPagePath()) {
        localStorage?.removeItem("access_token");
        navigate.push(appRoutesObj.shared?.getLoginPagePath());
      }
    }
  }, [userData?.username]);

  useEffect(() => {
    if (token && !isTokenExpired(token)) {
      setUserDataFromToken(token);
    }
  }, [token]);

  const renderComponent = () => {
    if (
      !userData?.username &&
      location !== appRoutesObj.shared?.getLoginPagePath()
    ) {
      // waiting for user data to be set
      return <ComponentLoader />;
    } else {
      return (
        <I18nextProvider i18n={i18next}>
          <div className="flex items-start justify-start w-full">
            {userData?.username && (
              <div
                className={`hidden md:flex h-full items-center w-[72px] z-30 flex-col fixed bg-gray-200 dark:bg-slate-950 ${getTransitionClass}`}
                id="global-sidebar"
              >
                <SharedLayout />
              </div>
            )}
            <div className="md:ps-[72px] w-full h-full">{children}</div>
          </div>
        </I18nextProvider>
      );
    }
  };

  return (
    <html>
      <body className={`${isLight ? "" : "dark"}`}>
        <main
          dir={dir}
          className={`min-h-screen w-full flex justify-center text-slate-900 dark:text-white dark:bg-slate-900 ${getTransitionClass}`}
        >
          {renderComponent()}
        </main>
      </body>
    </html>
  );
}
