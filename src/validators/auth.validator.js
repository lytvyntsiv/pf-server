import Joi from "joi";

export const loginSchema = Joi.object({
  address: Joi.string()
    .pattern(/^0x[a-fA-F0-9]{40}$/)
    .required(),
  message: Joi.string()
    .pattern(/^Sign this message to login: [a-z0-9-]{36}$/)
    .required(),
  signature: Joi.string()
    .pattern(/^0x[a-fA-F0-9]{130}$/)
    .required(),
});
