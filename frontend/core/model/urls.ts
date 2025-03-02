export const urls = {
  auth: {
    login: "auth/login",
    refreshToken: "auth/refresh-token",
  },
  userProfile: {
    userProfile: "user-profile",
  },
  uploadModel: {
    upload: "upload",
  },
  serverModel: {
    server: "server",
    serverById: (serverId: string) => `server/${serverId}`,
  },
};
