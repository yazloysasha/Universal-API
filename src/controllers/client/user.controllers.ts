import { AppFastifyRoute } from "@types";
import { authPreHandler } from "@middleware";
import { getUserHandler } from "@handlers/client";
import { GetUserType, getUserSchema } from "@schemas/client";

/**
 * Получить данные пользователя
 */
export const getUserController: AppFastifyRoute<GetUserType> = {
  url: "/user",
  method: "GET",
  schema: getUserSchema,
  preHandler: authPreHandler(),
  handler: getUserHandler,
};
