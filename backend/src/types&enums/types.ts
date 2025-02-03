import { ThemeEnum } from '@prisma/client';
import { Socket } from 'socket.io';

export type AuthPayloadType = {
  username: string;
  user_id: string;
};

export type SocketWithAuth = Socket & AuthPayloadType;

export type ReturnResponseType<T> = {
  is_successful?: boolean;
  error_msg?: string;
  success?: string;
  response?: T;
};

export type UserDataType = {
  username: string;
  id: string;
  profile: ProfileSettingsType;
};

export type ProfileSettingsType = {
  theme: ThemeEnum;
};
