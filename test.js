const puppeteer = require('puppeteer');
const url = 'https://www.harriscountyfws.org/GageDetail/Index/530';

async function scrapeEpisodeLinks() {
    let browser = await puppeteer.launch({ headless: false }); //headless:false so we can watch the browser as it works 
    let page = await browser.newPage(); //open a new page
    await page.goto(url); //access the podcasts page
    
    let episodes_details = await page.evaluate(() => {
      //Extract each episode's basic details
      let table = document.querySelector(".dxgvTable_DevEx");
      let episode_panels = Array.from(table.children); 
      
      // Loop through each episode and get their details 
      let episodes_info = episode_panels.map(episode_panel => {
        let datetime = episode_panel.querySelector(".dxgv").textContent;
        return { datetime };
      });
      return episodes_info;
    });
    
    console.log(episodes_details)
    // Close the browser when everything is done 
    await browser.close() 
   }
   scrapeEpisodeLinks()
