const path = require('path');
const fs = require('fs');

let chirpsPath = path.join(__dirname, '../chirps.json');

// Part 1 - Write json array to file
const chirps = [
  {
    username: 'Derrick M',
    message: 'Test 1',
  },
  {
    username: 'Derrick S',
    message: 'Test 10',
  },
  {
    username: 'Derrick A',
    message: 'Test 100',
  },
  {
    username: 'Derrick D',
    message: 'Test 1000',
  },
  {
    username: 'Derrick X',
    message: 'Test 10000',
  },
];
const chirpsData = JSON.stringify(chirps);
fs.writeFileSync('./chirps.json', chirpsData, () => console.log('done'));

// Part 2 - Console.log chirps.json
fs.readFile(
  chirpsPath,
  {
    encoding: 'utf-8',
  },
  (err, data) => {
    console.log(data);

    const chirpsData = JSON.parse(data);
    chirpsData.forEach((item) => {
      console.log(item.username);
    });
  }
);