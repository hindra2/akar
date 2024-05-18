const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "aws-0-us-east-1.pooler.supabase.com",
  port: 5432,
  database: "akar",
});

module.exports = pool;
