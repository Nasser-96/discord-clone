"use client";

import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown";
import { MemberRoleEnum } from "@/core/types&enums/enums";
import { ServerByIdRequestType } from "@/core/types&enums/types";
import DropDownMenu from "../shared/DropDownMenu";
import ServerSidebarDropdown from "../server-sidebar-dropdown/server-sidebar-dropdown";
import { useState } from "react";
import InviteServerModal from "../invite-server-modal/invite-server-modal";

interface ServerHeaderProps {
  server: ServerByIdRequestType;
  role?: MemberRoleEnum;
}

export default function ServerHeader({ server, role }: ServerHeaderProps) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const isAdmin = role === MemberRoleEnum.ADMIN;
  const isModerator = isAdmin || role === MemberRoleEnum.MODERATOR;

  const openInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
  };

  return (
    <>
      <DropDownMenu
        listChildren={
          <ServerSidebarDropdown
            isAdmin={isAdmin}
            isModerator={isModerator}
            openInviteModal={openInviteModal}
          />
        }
      >
        <div className="flex items-center justify-between p-2">
          {server.name}
          <FiChevronDown />
        </div>
      </DropDownMenu>
      {isInviteModalOpen && (
        <InviteServerModal
          server={server}
          closeInviteModal={closeInviteModal}
        />
      )}
    </>
  );
}
