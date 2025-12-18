import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DBNAME as string,
  process.env.DBUSER as string,
  process.env.DBPASS as string,
  {
    host: process.env.DBHOST,
    dialect: "mysql",
    logging: false,
  }
);

export const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully!");
  } catch (err) {
    console.error("MySQL connection failed:", err);
  }
};
