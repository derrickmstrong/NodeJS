const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

let downloaderPath = path.join(__dirname, '../downloads');

// Advanced
rp('https://reddit.com/r/popular.json')
  .then((body) => {
    JSON.parse(body).data.children.forEach((item) => {
      if (
        path.extname(`${item.data.url}`) == '.jpg' ||
        path.extname(`${item.data.url}`) == '.gif' ||
        path.extname(`${item.data.url}`) == '.png'
      ) {
        rp(item.data.url).then((res) => {
          fs.appendFileSync(
            `./downloads/${item.data.id}.jpg`,
            res,
            'base64',
            (err) => {
              if (err) throw err;
              console.log('The file has been saved!');
            }
          );
        });
      }
    });
  })
  .catch((err) => console.log(err));
