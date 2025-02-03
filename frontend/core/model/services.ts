import { makeRequest } from "../axios/axios";
import { AxiosMethods } from "../types&enums/enums";
import { LoginRequestType, ProfileSettingsType } from "../types&enums/types";
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
    url: urls?.userProfile?.update,
    data: data,
  });
};

export const updateTokenService = async () => {
  return makeRequest({
    method: AxiosMethods.GET,
    url: urls?.auth?.refreshToken,
  });
};
