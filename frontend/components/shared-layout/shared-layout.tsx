"use client";
import useUserStore from "@/core/stores/user-store";
import Button from "../shared/button";
import { IoIosSunny } from "@react-icons/all-files/io/IoIosSunny";
import { IoIosMoon } from "@react-icons/all-files/io/IoIosMoon";
import { ThemeEnum } from "@/core/types&enums/enums";
import { updateProfileService } from "@/core/model/services";
import { useState } from "react";
import {
  ProfileSettingsType,
  ReturnResponseType,
} from "@/core/types&enums/types";
import { updateToken } from "@/core/helpers/helpers";

export default function SharedLayout() {
  const { userData } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isDark = userData?.profile?.theme === ThemeEnum.DARK;

  const updateUserTheme = async () => {
    setIsLoading(true);
    const theme = isDark ? ThemeEnum.LIGHT : ThemeEnum.DARK;
    try {
      await updateProfileService({
        ...userData.profile,
        theme: theme,
      });
      await updateToken();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col w-fit h-full justify-start items-start min-h-screen">
      <Button
        isLoading={isLoading}
        onClick={() => {
          updateUserTheme();
        }}
      >
        {isDark ? <IoIosSunny /> : <IoIosMoon />}
      </Button>
    </div>
  );
}
