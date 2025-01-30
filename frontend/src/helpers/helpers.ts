import { UserStoreDataType } from "@/types&enums/types";
import { jwtDecode } from "jwt-decode";

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
