"use client";

import { appRoutesObj } from "@/app-paths";
import CreateServerModal from "@/components/create-server-modal/create-server-modal";
import ComponentLoader from "@/components/shared/componentLoader";
import { getUserProfileService } from "@/core/model/services";
import {
  ReturnResponseType,
  UserProfileResponseType,
} from "@/core/types&enums/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeContainer() {
  const [userProfile, setUserProfile] = useState<UserProfileResponseType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const newUserProfile: ReturnResponseType<UserProfileResponseType> =
        await getUserProfileService();
      if (newUserProfile?.response?.server?.id) {
        router.push(
          appRoutesObj.shared.getServerPath(
            newUserProfile?.response?.server?.id
          )
        );
      } else {
        setIsModalOpen(true);
      }
      setUserProfile(newUserProfile.response);
    } catch (e) {
      setIsModalOpen(true);
      console.log(e);
    }
    setIsLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <ComponentLoader />
      </div>
    );
  }
  return (
    <CreateServerModal
      isModalOpen={isModalOpen}
      shouldRedirect
      closeModal={closeModal}
    />
  );
}
