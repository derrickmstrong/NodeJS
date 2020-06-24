const fs = require('fs');
const rp = require('request-promise');

// Part 2 - Crawl Reddit and Extract data via request-promise into local file
rp('https://reddit.com/r/popular.json')
  .then((res) => JSON.parse(res))
  .then((data) => {
    let articleArr = [];
    data.data.children.forEach((item) => {
      let obj = {
        title: item.data.title,
        url: item.data.url,
        author: item.data.author,
      };
      articleArr.push(obj);
    });
    fs.writeFileSync(
      './popular-articles.json',
      JSON.stringify(articleArr),
      (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }
    );
  })
  .catch((err) => console.log(err));
