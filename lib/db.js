import mysql from "mysql";
const connectionUri = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const db = mysql.createConnection(connectionUri);

db.connect((err) => {
  if (err) {
    console.error("Error occured while trying to connect to the database", err);
  }
});

export default db;
