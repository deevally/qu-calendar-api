import dotenv from "dotenv";
dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,

  PORT: process.env.PORT,
  HOSTNAME: process.env.HOSTNAME,
  MONGO_DB_URL_DEV: process.env.MONGO_DB_URL_DEV,

  MONGO_DB_URL_TEST: process.env.MONGO_DB_URL_TEST,

  MONGO_DB_URL_STAGING: process.env.MONGO_DB_URL_STAGING,

  MONGO_DB_URL_PROD: process.env.MONGO_DB_URL_PROD,

  LOG_LABEL: process.env.LOG_LABEL,
  LOG_LEVEL: process.env.LOG_LEVEL,
  LOG_FILE: process.env.LOG_FILE,


  email_from: process.env.email_from,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

};
