class AppRoutes {
  [x: string]: any;
  public shared: SharedRoutes;

  /**
   * The AppRoutes class defines the `getInstance` method that lets clients access
   * the unique AppRoutes instance.
   */
  private static instance: AppRoutes;
  /**
   * The AppRoutes's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.shared = new SharedRoutes();
  }
  /**
   * The static method that controls the access to the singleton instance.
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): AppRoutes {
    if (!this.instance) {
      return (AppRoutes.instance = new AppRoutes());
    }
    return this.instance;
  }
}

class SharedRoutes {
  getHomePagePath(): string {
    return "/";
  }

  getLoginPagePath(): string {
    return "/login";
  }

  getServersPath(): string {
    return "/servers";
  }

  getServerPath(serverId: string): string {
    return this.getServersPath() + `/${serverId}`;
  }

  getInvitePath(): string {
    return "/invite";
  }

  getInviteByIdPath(inviteId: string): string {
    return this.getInvitePath() + `/${inviteId}`;
  }
}

export const appRoutesObj = AppRoutes.getInstance();
