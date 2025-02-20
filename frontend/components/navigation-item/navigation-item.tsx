import {
  DirectionEnum,
  LanguageEnum,
  PositionEnum,
} from "@/core/types&enums/enums";
import { WithTooltip } from "../shared/WithTooltip";
import Link from "next/link";
import { appRoutesObj } from "@/app-paths";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { getTransitionClass } from "@/core/helpers/helpers";
import useUserStore from "@/core/stores/user-store";

interface NavigationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export default function NavigationItem({
  id,
  imageUrl,
  name,
}: NavigationItemProps) {
  const router = useRouter();
  const params = useParams();
  const { userData, logout } = useUserStore();
  const dir =
    userData?.profile?.preferred_language === LanguageEnum.AR
      ? DirectionEnum.RTL
      : DirectionEnum.LTR;
  const isLtr = dir === DirectionEnum.LTR;

  const navigateToServer = () => {
    router?.push(appRoutesObj.shared.getServerPath(id));
  };

  return (
    <WithTooltip
      text={name}
      position={isLtr ? PositionEnum.Right : PositionEnum.Left}
    >
      <button
        className="group relative flex items-center"
        type="button"
        dir={dir}
        title={name}
        onClick={navigateToServer}
      >
        <div
          className={`
            absolute ltr:left-0 rtl:right-0 dark:bg-white bg-slate-900 w-1
            ltr:rounded-r-full ltr:rounded-l-none
            rtl:rounded-l-full rtl:rounded-r-none
            ${getTransitionClass} 
            ${params?.serverId === id ? "h-9" : "h-2 group-hover:h-5"}
          `}
        />
        <div
          className={`
                relative group flex mx-3 h-12 aspect-square group-hover:rounded-2xl ${getTransitionClass} overflow-hidden
                ${params?.serverId === id ? "rounded-2xl" : "rounded-3xl"}
            `}
        >
          <Image src={imageUrl} alt="Channel" fill sizes="auto" priority />
        </div>
      </button>
    </WithTooltip>
  );
}
