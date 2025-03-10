"use client";
import { appRoutesObj } from "@/app-paths";
import ServerSidebar from "@/components/server-sidebar/server-sidebar";
import ComponentLoader from "@/components/shared/componentLoader";
import { getServerByIdService } from "@/core/model/services";
import {
  ReturnResponseType,
  ServerByIdRequestType,
} from "@/core/types&enums/types";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ServerIdLayoutProps {
  children: React.ReactNode;
}

const ServerIdLayout = ({ children }: Readonly<ServerIdLayoutProps>) => {
  const params = useParams();
  const [serverData, setServerData] = useState<ServerByIdRequestType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchServer = async () => {
    setIsLoading(true);
    try {
      const newData: ReturnResponseType<ServerByIdRequestType> =
        await getServerByIdService(params?.serverId as string);
      setServerData(newData?.response);
    } catch (err: any) {
      if (err?.response?.data?.error_msg === "Server not Exist") {
        redirect(appRoutesObj.shared.getHomePagePath());
      }
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchServer();
  }, [params]);

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-10 flex-col fixed inset-y-0">
        {isLoading || !serverData ? (
          <div className="h-full flex items-center justify-center">
            <ComponentLoader />
          </div>
        ) : (
          <ServerSidebar serverData={serverData} />
        )}
      </div>
      <main className="h-full md:ps-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
