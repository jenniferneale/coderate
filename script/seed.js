const db = require('../server/db')
const { User, Company } = require('../server/db/models')
const Sequelize = require('sequelize');

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  let q1 = "COPY companies (id, fractal_index) FROM 'D:\\GitHub\\coderate\\script\\companies.csv' WITH (FORMAT csv, HEADER true);";
  let q2 = "COPY users (id, communication_score, coding_score, title, \"companyId\") FROM 'D:\\GitHub\\coderate\\script\\score-records.csv' WITH (FORMAT csv, HEADER true);";
  db.query(q1)
  .catch(error => console.log('DB copy error company table\n', error))
  .then(() => {
    db.query(q2).catch(error => console.log('DB copy error user table\n', error));
  })
.then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })
  console.log(`seeded successfully`)
}

// Execute the `seed` function
seed();

/*
 * synchronous calls
 */
console.log('seeding...')
