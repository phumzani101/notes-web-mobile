import * as dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || "8000",
  mongoUri: process.env.DATABASE || "mongodb://localhost:27017/notesdb",
  jwtSecret: process.env.JWT_SECRET || "secret",
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  sendgridEmailFrom: process.env.SENDGRID_EMAIL_FROM,
};
export default config;
