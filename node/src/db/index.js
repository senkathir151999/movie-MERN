const mysql = require('mysql2/promise');

let pool;
// let connection;

module.exports = {
  getConnection: () => pool.getConnection(),
  init: async (config) => {
    // Create the database connection
    pool = await mysql.createPool({
      connectionLimit: config.CONNECTION_LIMIT,
      host: config.MYSQL_HOST,
      user: config.MYSQL_USER,
      password: config.MYSQL_PASSWORD,
      database: config.MYSQL_DB,
    });
  },
  getPool: () => pool,
};
