import { create } from "zustand";
import {
  LocalStorageUserDataType,
  UserStoreDataType,
} from "../types&enums/types";

export type UserStoreType = {
  userData: UserStoreDataType;
  token: string;
  setUserData: (data: UserStoreDataType) => void;
  setToken: (token: string) => void;
};

const useUserStore = create<UserStoreType>((set) => ({
  userData: {} as UserStoreDataType,
  token: "",

  setUserData(userData: UserStoreDataType) {
    set((state) => {
      return { ...state, userData };
    });
  },
  setToken(token: string) {
    set((state) => {
      return { ...state, token };
    });
  },
}));

export default useUserStore;
