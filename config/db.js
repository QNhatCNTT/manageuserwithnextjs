const mysql = require("serverless-mysql")();

mysql.config({
  host: "localhost",
  database: "manageuserdb",
  user: "root",
  password: "12345a",
  port: 3306,
});

async function executeQuery({ query, value }) {
  try {
    await mysql.connect();
    const results = await mysql.query(query, value);
    await mysql.end();
    return results;
  } catch (error) {
    return { error };
  }
}

export { executeQuery };
