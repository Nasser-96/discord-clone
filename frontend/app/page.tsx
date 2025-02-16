"use client";
import { appRoutesObj } from "@/app-paths";
import { getUserProfileService } from "@/core/model/services";
import {
  ReturnResponseType,
  UserProfileResponseType,
} from "@/core/types&enums/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [userProfile, setUserProfile] = useState<UserProfileResponseType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const newUserProfile: ReturnResponseType<UserProfileResponseType> =
        await getUserProfileService();
      setUserProfile(newUserProfile.response);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);
  console.log(userProfile);

  useEffect(() => {
    if (userProfile?.server?.id) {
      router?.push(
        appRoutesObj?.shared?.getServerPath(userProfile?.server?.id)
      );
    }
  }, [userProfile?.server?.id]);

  return <div>Create a Server</div>;
}
