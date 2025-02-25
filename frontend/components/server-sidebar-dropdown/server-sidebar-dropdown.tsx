import DropDownMenuButtonItem from "../shared/DropDownMenuButtonItem";
import { HiUserPlus } from "@react-icons/all-files/hi2/HiUserPlus";
import { IoSettingsOutline } from "@react-icons/all-files/io5/IoSettingsOutline";
import { HiOutlineUsers } from "@react-icons/all-files/hi2/HiOutlineUsers";
import { IoIosAddCircleOutline } from "@react-icons/all-files/io/IoIosAddCircleOutline";
import { FiTrash } from "@react-icons/all-files/fi/FiTrash";
import { IoLogOutOutline } from "@react-icons/all-files/io5/IoLogOutOutline";
import { useTranslation } from "react-i18next";

interface ServerSidebarDropdownProps {
  isModerator: boolean;
  isAdmin: boolean;
  openInviteModal: () => void;
}

export default function ServerSidebarDropdown({
  isModerator,
  isAdmin,
  openInviteModal,
}: ServerSidebarDropdownProps) {
  const { t } = useTranslation();
  return (
    <>
      {isModerator && (
        <DropDownMenuButtonItem
          className="text-indigo-500 dark:text-indigo-400 justify-between"
          icon={<HiUserPlus size={16} />}
          label={t("component.ServerSidebarDropdown.invite")}
          action={() => {
            openInviteModal();
          }}
        />
      )}
      {isAdmin && (
        <DropDownMenuButtonItem
          className="justify-between"
          icon={<IoSettingsOutline size={16} />}
          label={t("component.ServerSidebarDropdown.serverSettings")}
          action={() => {
            console.log("Server Settings");
          }}
        />
      )}
      {isAdmin && (
        <DropDownMenuButtonItem
          className="justify-between"
          icon={<HiOutlineUsers size={16} />}
          label={t("component.ServerSidebarDropdown.manageMembers")}
          action={() => {
            console.log("Manage Members");
          }}
        />
      )}
      {isModerator && (
        <DropDownMenuButtonItem
          className="justify-between"
          icon={<IoIosAddCircleOutline size={16} />}
          label={t("component.ServerSidebarDropdown.createChannel")}
          action={() => {
            console.log("Create Channel");
          }}
        />
      )}
      {isModerator && (
        <div className="h-px w-full dark:bg-gray-500 bg-gray-300" />
      )}
      {isAdmin && (
        <DropDownMenuButtonItem
          className="text-rose-500 justify-between"
          icon={<FiTrash size={16} />}
          label={t("component.ServerSidebarDropdown.deleteServer")}
          action={() => {
            console.log("Delete Server");
          }}
        />
      )}
      {!isAdmin && (
        <DropDownMenuButtonItem
          className="text-rose-500 justify-between"
          icon={<IoLogOutOutline size={16} />}
          label={t("component.ServerSidebarDropdown.leaveServer")}
          action={() => {
            console.log("Leave Server");
          }}
        />
      )}
    </>
  );
}
