import { getTransitionClass } from "@/core/helpers/helpers";
import useUserStore from "@/core/stores/user-store";
import { ChannelTypeEnum } from "@/core/types&enums/enums";
import { ServerByIdRequestType } from "@/core/types&enums/types";
import ServerHeader from "../server-header/server-header";

interface ServerSidebarProps {
  serverData: ServerByIdRequestType;
}

export default function ServerSidebar({ serverData }: ServerSidebarProps) {
  const { userData } = useUserStore();

  const textChannels = serverData?.channels?.filter((channel) => {
    return channel.type === ChannelTypeEnum.TEXT;
  });
  const audioChannels = serverData?.channels?.filter((channel) => {
    return channel.type === ChannelTypeEnum.AUDIO;
  });
  const videoChannels = serverData?.channels?.filter((channel) => {
    return channel.type === ChannelTypeEnum.VIDEO;
  });

  const members = serverData?.members?.filter((member) => {
    return member.user_id !== userData?.id;
  });

  // role of the current user
  const role = serverData?.members?.find((member) => {
    return member.user_id === userData?.id;
  })?.role;

  return (
    <div
      className={`flex flex-col h-full text-slate-950 dark:text-white dark:bg-gray-900 bg-gray-100 ${getTransitionClass}`}
    >
      <ServerHeader server={serverData} role={role} />
    </div>
  );
}
