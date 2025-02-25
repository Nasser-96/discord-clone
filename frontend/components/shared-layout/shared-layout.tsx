"use client";
import useUserStore from "@/core/stores/user-store";
import Button from "../shared/button";
import { IoIosSunny } from "@react-icons/all-files/io/IoIosSunny";
import { IoAddOutline } from "@react-icons/all-files/io5/IoAddOutline";
import { IoLogOutOutline } from "@react-icons/all-files/io5/IoLogOutOutline";
import { IoIosMoon } from "@react-icons/all-files/io/IoIosMoon";
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  DirectionEnum,
  LanguageEnum,
  PositionEnum,
  ThemeEnum,
} from "@/core/types&enums/enums";
import {
  getUserServersService,
  updateProfileService,
} from "@/core/model/services";
import { useEffect, useState } from "react";
import { getTransitionClass, updateToken } from "@/core/helpers/helpers";
import { WithTooltip } from "../shared/WithTooltip";
import { useTranslation } from "react-i18next";
import { ReturnResponseType, ServerType } from "@/core/types&enums/types";
import NavigationItem from "../navigation-item/navigation-item";
import CreateServerModal from "../create-server-modal/create-server-modal";

export default function SharedLayout() {
  const { t } = useTranslation();
  const [servers, setServers] = useState<ServerType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreateServerModalOpen, setIsCreateServerModalOpen] =
    useState<boolean>(false);
  const { userData, logout } = useUserStore();
  const dir =
    userData?.profile?.preferred_language === LanguageEnum.AR
      ? DirectionEnum.RTL
      : DirectionEnum.LTR;
  const isLtr = dir === DirectionEnum.LTR;
  const isDark = userData?.profile?.theme === ThemeEnum.DARK;

  const openCreateServerModal = () => {
    setIsCreateServerModalOpen(true);
  };

  const closeCreateServerModal = () => {
    setIsCreateServerModalOpen(false);
  };

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

  const updateUserLanguage = async () => {
    setIsLoading(true);

    const language =
      userData?.profile?.preferred_language === LanguageEnum.EN
        ? LanguageEnum.AR
        : LanguageEnum.EN;

    try {
      await updateProfileService({
        ...userData.profile,
        preferred_language: language,
      });
      await updateToken();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const logoutAction = () => {
    logout();
  };

  const fetchServers = async () => {
    try {
      const response: ReturnResponseType<ServerType[]> =
        await getUserServersService();
      setServers(response?.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  return (
    <>
      <div className="py-2 flex flex-col justify-between items-center h-full">
        <div>
          <WithTooltip
            position={isLtr ? PositionEnum.Right : PositionEnum.Left}
            text={t("component.SharedLayout.addServer")}
          >
            <button
              type="button"
              title="create server"
              className={`${getTransitionClass} group flex mx-3 h-12 aspect-square rounded-3xl hover:rounded-2xl items-center justify-center bg-gray-300 dark:bg-neutral-700 hover:bg-emerald-500 dark:hover:bg-emerald-500`}
              onClick={openCreateServerModal}
            >
              <IoAddOutline
                size={25}
                className={`${getTransitionClass} group-hover:text-white text-emerald-500`}
              />
            </button>
          </WithTooltip>
          <div
            className={`h-0.5 my-2 bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto ${getTransitionClass}`}
          />
          <div className="w-full flex flex-col gap-2 !overflow-x-visible">
            {servers?.map((server) => {
              return (
                <NavigationItem
                  key={`server-${server?.id}`}
                  id={server?.id}
                  imageUrl={server?.image_url}
                  name={server?.name}
                />
              );
            })}
          </div>
        </div>
        <div className="pb-3 mt-auto flex flex-col items-center gap-3">
          <Button
            isLoading={isLoading}
            variant={ButtonVariantsEnum.OUTLINE}
            size={ButtonSizeEnum.SM}
            onClick={() => {
              updateUserLanguage();
            }}
          >
            {t("component.SharedLayout.language")}
          </Button>
          <Button
            isLoading={isLoading}
            variant={ButtonVariantsEnum.OUTLINE}
            size={ButtonSizeEnum.SM}
            onClick={() => {
              updateUserTheme();
            }}
          >
            {isDark ? <IoIosSunny /> : <IoIosMoon />}
          </Button>
          <Button
            variant={ButtonVariantsEnum.DESTRUCTIVE}
            size={ButtonSizeEnum.SM}
            onClick={() => {
              logoutAction();
            }}
          >
            <IoLogOutOutline />
          </Button>
        </div>
      </div>

      <CreateServerModal
        shouldRedirect={false}
        isModalOpen={isCreateServerModalOpen}
        onCreate={fetchServers}
        closeModal={closeCreateServerModal}
      />
    </>
  );
}
