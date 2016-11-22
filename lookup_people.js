const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let argv = process.argv.slice(2);

function correctDate(date) {
  let dateObj = new Date(date);
  let day = dateObj.getUTCDate();
  let month = dateObj.getUTCMonth() + 1;
  let year = dateObj.getUTCFullYear();
  let correctedDate = year + "-" + month + "-" + day;
  return correctedDate;
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query('SELECT * FROM famous_people WHERE (last_name = $1::varchar OR first_name = $1::varchar)', [argv[0]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    } else {
      let niceDate = correctDate(result.rows[0].birthdate);

      console.log("- " + result.rows[0].id + ": " + result.rows[0].first_name + " " + result.rows[0].last_name + ", born " + niceDate);
    }
    client.end();
  });
});

