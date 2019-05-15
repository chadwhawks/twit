
const puppeteer = require('puppeteer');
const url = 'https://www.harriscountyfws.org/GageDetail/Index/530';
var twit = require('twit');
var config = require('./config.js');
var Twitter = new twit(config);

  
async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto(url);
  console.log(await page.title());
  const datetime = await page.evaluate(() => {
    let datetime_DOM = document.querySelectorAll("#StreamElevationCumulativeGridView_DXDataRow0 > td ").item(1).innerText;
    return datetime_DOM;
      });

  const level = await page.evaluate(() => {
    let level_DOM = document.querySelectorAll("#StreamElevationCumulativeGridView_DXDataRow0 > td ").item(2).innerText;
    return level_DOM;
      });
    
  console.log(datetime);
  console.log(level);
  
  await browser.close();    

  Twitter.post('statuses/update', { status: `timestamp - ${datetime} level - ${level}` }, function(err, data, response) {
    console.log(data)
  }) 
}
  
main();
