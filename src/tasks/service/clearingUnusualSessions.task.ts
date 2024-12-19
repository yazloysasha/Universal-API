import { di } from "@config";
import { TaskHandler } from "@types";
import { AuthService } from "@services";

export const clearingUnusualSessionsTask: TaskHandler = async (ctx) => {
  const authService = di.container.resolve<AuthService>(AuthService.name);

  await authService.clearInactiveSessions();
};