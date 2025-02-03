import { ThemeEnum } from "./enums";

export type ReturnResponseType<T> = {
  is_successful: boolean;
  error_msg: string;
  success: string;
  response: T;
};

export type LocalStorageUserDataType = {
  token?: string;
  username?: string;
};

export type DynamicValuesType = {
  [key: string]: number | string | boolean | string[] | number[] | unknown;
};

export type LoginRequestType = {
  username: string;
  password: string;
};

export type LoginResponseDataType = {
  user_token: string;
  username: string;
};

export type UserStoreDataType = {
  username: string;
  id: number;
  profile: ProfileSettingsType;
  iat: number;
  exp: number;
};

export type ProfileSettingsType = {
  theme: ThemeEnum;
};
