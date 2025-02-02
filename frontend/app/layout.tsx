"use client";

import ComponentLoader from "@/components/shared/componentLoader";
import "./globals.css";
import { appRoutesObj } from "@/app-paths";
import { getDecodeToken, isTokenExpired } from "@/core/helpers/helpers";
import { useEffect } from "react";
import useUserStore from "@/core/stores/user-store";
import { useRouter, usePathname } from "next/navigation";
import { DirectionEnum, LanguageEnum } from "@/core/types&enums/enums";
import { I18nextProvider } from "react-i18next";
import i18next from "../core/utils/i18n";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUserData, userData } = useUserStore();
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
    const token = localStorage.getItem("access_token") ?? "";

    if (token && !isTokenExpired(token)) {
      setUserData(getDecodeToken(token));
    } else {
      if (location !== appRoutesObj.shared?.getLoginPagePath()) {
        navigate.push(appRoutesObj.shared?.getLoginPagePath());
      }
    }
  }, []);

  const renderComponent = () => {
    if (
      !userData?.username &&
      location !== appRoutesObj.shared?.getLoginPagePath()
    ) {
      return <ComponentLoader />;
    } else {
      return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
    }
  };

  return (
    <html lang="en">
      <body>
        <main
          dir={dir}
          className={`min-h-screen w-full flex items-center justify-center bg-slate-900`}
        >
          {renderComponent()}
        </main>
      </body>
    </html>
  );
}
