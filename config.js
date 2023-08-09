const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASS,
  db_port: process.env.DB_PORT,
};