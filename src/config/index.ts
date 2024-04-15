import { config as configEnv } from "dotenv";
import { Joi } from "celebrate";

configEnv();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "staging", "production", "test")
    .default("development"),

  PORT: Joi.number().default(8080),

  MAGIC_TOKEN_EXPIRY: Joi.string().default("30m"),

  BCRYPT_ROUND: Joi.string().default("10").required(),

  REFRESH_TOKEN_EXPIRY: Joi.string().default("1yr").required(),

  IMAGEKIT_PUBLIC_KEY: Joi.string().default("public_3YeVHec1oUGs0hvfrwLnekiP/lE="),

  IMAGEKIT_PRIVATE_KEY: Joi.string().default("private_v/bV5Ej/VtP68qYaymL4o9l2mm4="),

  IMAGEKIT_URL_ENDPOINT: Joi.string().default("https://ik.imagekit.io/vxzwvhywo/"),
})
  .unknown()
  .required();

const { value: envVariables } = envVarsSchema.validate(process.env, {
  abortEarly: false,
});

export default envVariables;
