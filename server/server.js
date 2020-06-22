const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

let chirpsPath = path.join(__dirname, '../chirps.json');
let redditPath = path.join(__dirname, '../reddit.js');
let downloaderPath = path.join(__dirname, '../popular-downloader.js');

// Part 1 - Console.log chirps.json
fs.readFile(
  chirpsPath,
  {
    encoding: 'utf-8',
  },
  (err, data) => {
    console.log(data);
  }
);

// Part 2 - Crawl Reddit and Extract data via request-promise into local file
rp('https://reddit.com/r/popular.json')
  .then((body) =>
    JSON.parse(body).data.children.forEach((item) => {
      fs.appendFileSync(
        redditPath,
        `<h1>${item.data.title}</h1>\n<p>Author: ${item.data.author}</p>\n<p>URL: ${item.data.url}</p>\n\n`
      );
    })
  )
  .catch((err) => console.log(err));

// Advanced
// FIXME: I am able to return the results as an array in the console but not in my js file
let results = [];
rp('https://reddit.com/r/popular.json')
  .then((body) => {
    JSON.parse(body).data.children.forEach((item) => {
      if (
        path.extname(`${item.data.url}`) == '.jpg' ||
        path.extname(`${item.data.url}`) == '.gif' ||
        path.extname(`${item.data.url}`) == '.png'
      ) {
        results.push(`"${item.data.title}"`)
      }
    });
    console.log(results)
    return fs.appendFileSync(downloaderPath, results);
  })
  .catch((err) => console.log(err));
