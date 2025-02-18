import { AxiosMethods } from "../types&enums/enums";
import GetBackendUrl from "../helpers/backend-url";
import axiosObject from "./axiosObject";
import { ReturnResponseType } from "../types&enums/types";

export type MakeRequest = {
  url: string;
  method: AxiosMethods;
  data?: any;
  params?: any;
  headers?: any;
};

export const makeRequest = async (req: MakeRequest) => {
  const { url, method, data, params, headers } = req;
  return axiosObject({
    url: GetBackendUrl() + url,
    method,
    data,
    headers,
    params,
  }).then((res) => {
    return res.data;
  });
};
