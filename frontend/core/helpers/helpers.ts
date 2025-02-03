import { updateTokenService } from "../model/services";
import useUserStore from "../stores/user-store";
import { ReturnResponseType, UserStoreDataType } from "../types&enums/types";
import { jwtDecode } from "jwt-decode";

const getUserStore = () => {
  const { setUserData, userData, setToken } = useUserStore?.getState();
  return { setUserData, userData, setToken };
};
export const getDecodeToken = (token: string) => {
  return jwtDecode<UserStoreDataType>(token);
};

export const isTokenExpired = (token: string): boolean => {
  const decodedToken = getDecodeToken(token);
  // Check if `exp` exists
  if (!decodedToken?.exp) {
    return true; // If there's no expiration field, consider it expired
  }
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return decodedToken.exp < currentTime; // Token is expired if `exp` is less than the current time
};

export const setUserDataFromToken = (token: string) => {
  const decodedToken = getDecodeToken(token);
  getUserStore()?.setToken(token);
  localStorage.setItem("access_token", token);
  getUserStore()?.setUserData(decodedToken);
};

export const updateToken = async () => {
  try {
    const tokenResponse: ReturnResponseType<{ access_token: string }> =
      await updateTokenService();
    const token = tokenResponse?.response?.access_token;
    setUserDataFromToken(token);
  } catch (err) {
    console.log(err);
  }
};

export const getTransitionClass = "transition-all duration-300 ease-in-out";
