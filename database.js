require("dotenv").config();

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const query = pool.query.bind(pool);

module.exports = {
  pool,
  query
};

const afterAll=async () => {
  await pool.end();
};

pool
  .query("select * from movies")
  .then((result) => {
    const [movies] = result;
    console.log(movies);
  })
  .catch((err) => {
    console.error(err);
  });