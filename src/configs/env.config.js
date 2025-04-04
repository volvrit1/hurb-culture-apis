import { configDotenv } from "dotenv";
import { cleanEnv, str, num } from "envalid";

configDotenv();

const env = cleanEnv(process.env, {
  PORT: num({ default: 5000 }),
  JWT_SECRET: str(),
  DB_URI: str(),
  RAZORPAY_SECRET:str(),
  RAZORPAY_ID:str()
});

export default env;
