import { di } from "@config";
import { AuthService } from "@services";
import { LogoutType } from "@schemas/client";
import { AppFastifyHandler, AppFastifyRequest, SuccessCode } from "@types";

export const logoutHandler: AppFastifyHandler<LogoutType> = async (
  req: AppFastifyRequest<LogoutType>,
  reply
) => {
  const authService = di.container.resolve<AuthService>(AuthService.name);

  await authService.destroySession({ sessionId: req.session!.id });

  reply.code(SuccessCode.OK).send({
    alert: true,
    message: "Вы успешно вышли из аккаунта",
  });
};
