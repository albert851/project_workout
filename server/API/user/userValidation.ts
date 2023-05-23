import Joi, { boolean } from "joi";
import { joiPasswordExtendCore } from "joi-password";

const joiPassword = Joi.extend(joiPasswordExtendCore);

export const UserValidation = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string(),
  password: joiPassword
    .string()
    .min(4)
    .max(16)
    .minOfSpecialCharacters(1)
    // .minOfLowercase(1)
    // .minOfUppercase(1)
    // .minOfNumeric(1)
    // .noWhiteSpaces()
    .required(),
  repeatPassword: Joi.ref("password"),
});
