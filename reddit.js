const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

// Part 2 - Crawl Reddit and Extract data via request-promise into local file
rp('https://reddit.com/r/popular.json')
  .then((res) => JSON.parse(res))
  .then((data) => {
    // data.children.forEach((item) => {
    //   fs.appendFileSync(
    //     redditPath,
    //     `<h1>${item.data.title}</h1>\n<p>Author: ${item.data.author}</p>\n<p>URL: ${item.data.url}</p>\n\n`
    //   );
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
