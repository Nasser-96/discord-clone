import { makeRequest } from "../axios/axios";
import { AxiosMethods } from "../types&enums/enums";
import {
  CreateServerRequestType,
  LoginRequestType,
  ProfileSettingsType,
} from "../types&enums/types";
import { urls } from "./urls";

export const loginService = async (data: LoginRequestType) => {
  return makeRequest({
    method: AxiosMethods.POST,
    url: urls?.auth?.login,
    data: data,
  });
};

export const updateProfileService = async (data: ProfileSettingsType) => {
  return makeRequest({
    method: AxiosMethods.PUT,
    url: urls?.userProfile?.userProfile,
    data: data,
  });
};

export const updateTokenService = async () => {
  return makeRequest({
    method: AxiosMethods.GET,
    url: urls?.auth?.refreshToken,
  });
};

export const getUserProfileService = async () => {
  return makeRequest({
    method: AxiosMethods.GET,
    url: urls?.userProfile?.userProfile,
  });
};

export const uploadImageService = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);

  return makeRequest({
    method: AxiosMethods.POST,
    url: urls?.uploadModel.upload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

export const createServerService = async (data: CreateServerRequestType) => {
  return makeRequest({
    method: AxiosMethods.POST,
    url: urls?.serverModel?.server,
    data: data,
  });
};

export const getUserServersService = async () => {
  return makeRequest({
    method: AxiosMethods.GET,
    url: urls?.serverModel?.server,
  });
};

export const getServerByIdService = async (serverId: string) => {
  return makeRequest({
    method: AxiosMethods.GET,
    url: urls?.serverModel?.serverById(serverId),
  });
};

// export const generateNewInviteLinkService = async (serverId: string) => {
//   return makeRequest({
//     method: AxiosMethods.GET,
//     url: urls?.serverModel?.serverById(serverId),
//   });
// };
