import { LanguageEnum, ThemeEnum } from "./enums";

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
  preferred_language: LanguageEnum;
  email: string;
  image_url: string;
  name: string;
};

export type UserProfileServerType = {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  invite_code: string;
};

export type UserProfileType = {
  id: string;
  email: string;
  image_url: string;
  theme: ThemeEnum;
  created_at: string;
  user_data: {
    channels: [];
    username: string;
    created_at: string;
    id: string;
  };
  name: true;
  preferred_language: LanguageEnum;
  updated_at: string;
};

export type UserProfileResponseType = {
  profile: UserProfileType;
  server: UserProfileServerType | null;
};
