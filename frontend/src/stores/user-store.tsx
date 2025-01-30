import { create } from "zustand";
import {
  LocalStorageUserDataType,
  UserStoreDataType,
} from "../types&enums/types";

export type UserStoreType = {
  userData: UserStoreDataType;
  setUserData: (data: UserStoreDataType) => void;
};

const useUserStore = create<UserStoreType>((set) => ({
  userData: {} as UserStoreDataType,
  setUserData(userData: UserStoreDataType) {
    set((state) => {
      return { ...state, userData };
    });
  },
}));

export default useUserStore;
