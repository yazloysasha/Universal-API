import { AppFastifySchema } from "@types";
import { SwaggerContract } from "@contracts";
import { paramsWithUserId } from "./common.schemas";
import { extendedUserSchema } from "@schemas/client";

export const getUserSchema = {
  tags: [SwaggerContract.AdminTag.USERS],
  summary: "Получить одного пользователя",
  security: [{ Bearer: [] }],
  params: paramsWithUserId,
  response: {
    200: {
      description: "Пользователь",
      ...extendedUserSchema,
    },
    401: SwaggerContract.ClientErrorResponseFactory(401),
    403: SwaggerContract.ClientErrorResponseFactory(403),
    404: SwaggerContract.ClientErrorResponseFactory(404),
  },
} as const satisfies AppFastifySchema;

export type GetUserType = typeof getUserSchema;
