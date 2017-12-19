const db = require('../server/db')
const { User, Company } = require('../server/db/models')
const Sequelize = require('sequelize');
const csv = require('fast-csv');
const fs = require('fs')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  /*let q1 = "COPY companies (id, fractal_index) FROM 'D:\\GitHub\\coderate\\script\\companies.csv' WITH (FORMAT csv, HEADER true);";
  let q2 = "COPY users (id, communication_score, coding_score, title, \"companyId\") FROM 'D:\\GitHub\\coderate\\script\\score-records.csv' WITH (FORMAT csv, HEADER true);";
  db.query(q1)
  .catch(error => console.log('DB copy error company table\n', error))
  .then(() => {
    db.query(q2).catch(error => console.log('DB copy error user table\n', error));
  })*/
  Promise.resolve(part1()).then(() => part2()).catch(err => console.log(err));
  console.log(`seeded successfully`)
}

function part1(){
  var stream = fs.createReadStream("D:\\GitHub\\coderate\\script\\companies.csv");  
  let csvStream = csv
  .fromStream(stream, {headers : true})
  .on("data", function(data){
    Company.create(data).then(company => console.log("id ",company.id,", fractal_index ",company.fractal_index));    
  })
  .on("end", function(){      
      console.log("companies done");
  }); 
}

function part2(){
  var stream = fs.createReadStream("D:\\GitHub\\coderate\\script\\score-records.csv");  
  let csvStream = csv
  .fromStream(stream, {headers : true})
  .on("data", function(data){
    User.create(data).then(user => console.log("id ",user.id));    
  })
  .on("end", function(){      
      console.log("users done");
  }); 
}

// Execute the `seed` function
seed();

/*
 * synchronous calls
 */
console.log('seeding...')
