const settings = require("./settings");

var knex = require('knex')
({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    ssl      : true

  }
});




let firstName = process.argv[2];
let lastName = process.argv[3];
let birthDate = process.argv[4];

knex.insert([{first_name: firstName, last_name: lastName,birthdate: birthDate}]).into("famous_people").then(function(id) {
  console.log(id);
});
  knex.destroy();
