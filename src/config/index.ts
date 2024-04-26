import { config as configEnv } from "dotenv";
import { Joi } from "celebrate";

configEnv();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "staging", "production", "test")
    .default("development"),

  PORT: Joi.number().default(8080),

  BCRYPT_ROUND: Joi.string().default("10").required(),

  ACCESS_TOKEN_EXPIRY: Joi.string().default("1d").required(),

  REFRESH_TOKEN_EXPIRY: Joi.string().default("1yr").required(),

  IMAGEKIT_PUBLIC_KEY: Joi.string().default("public_RrLswADV33Vl/Sl07h6LAfzMQUI="),

  ACCESS_TOKEN_SECRET: Joi.string().default("67c8d762-ecff-4ff7-00b99c6eae64"),

  REFRESH_TOKEN_SECRET: Joi.string().default("67c1212-ecff-4ff7-00b99c6eae64"),

  IMAGEKIT_PRIVATE_KEY: Joi.string().default("private_HSNO9C7S8kdRdScl0+YwmzBmX6U="),

  IMAGEKIT_URL_ENDPOINT: Joi.string().default("https://ik.imagekit.io/g2d2jnbqu"),
})
  .unknown()
  .required();

export const MERCHANT_PRODUCTS = "/merchant-products";

const { value: envVariables } = envVarsSchema.validate(process.env, {
  abortEarly: false,
});

export default envVariables;
