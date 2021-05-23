const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: true,
});

function getPopulation(name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
        `SELECT Population FROM country WHERE Name = ? AND code = ?`,[name, code] ,
    function (err, result) {
        if (err) cb(err);
        if (result.length === 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  };


/* vulnerable query that will return all the records in the database because 1=1 always true

conn.query(`SELECT Population FROM ${Country} WHERE Name = 'anyName' AND code = 'AnyCountryCode' OR 1=1`,

*/
getPopulation("Netherlands", "NLD", (err, results) => {
    if (err) throw err;
    console.log(`Population: ${results}`);
  });