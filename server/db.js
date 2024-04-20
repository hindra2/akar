const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "10.193.31.211",
  port: 5432,
  database: "akar",
});

module.exports = pool;
