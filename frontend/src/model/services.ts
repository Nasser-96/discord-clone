import { makeRequest } from "@/axios/axios";
import { AxiosMethods } from "@/types&enums/enums";
import { LoginRequestType } from "@/types&enums/types";

export const loginService = async (data: LoginRequestType) => {
  return makeRequest({
    method: AxiosMethods.POST,
    url: "auth/login",
    data: data,
  });
};
