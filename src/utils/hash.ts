import { hashSync } from "bcrypt";
import appConfig from "@consts/appConfig";

/**
 * Захешировать значение
 */
export const hash = (value: string): string => {
  return hashSync(value, appConfig.BCRYPT_ROUNDS_COUNT);
};
