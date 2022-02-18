import puppeteer from 'puppeteer';
import isUser from './src/likeForUser.js';
import fs from 'fs';
import fetch from 'node-fetch';
import saveCookies from './src/saveCookies.js';
import config from './config.js';
import randomInteger from './utils/randomInteger.js';
import likeForGuys from './src/likeFoGuys.js';

const { min, max } = config;

const contents = fs.readFileSync('./lastids.txt', 'utf8');
const automin = Number(contents) + 1;

const selector = 'div.Button';

async function getPic() {
  // конфигурируем наш браузер / configure our browser
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: './user_data',
  });

  // запускаем наш браузер / Launch our browser
  const page = await browser.newPage();
  await page.goto('https://ton.place/feed');
  await page.waitForTimeout(randomInteger(1200, 1300));

  // await loop(min, max, page);
  await likeForGuys(page, 41543);
  saveCookies(page);
}

getPic();

const loop = async (automin, max, page) => {
  for (let i = min; i < max; i++) {
    await isUser(page, 'All done', i);
    await page.waitForTimeout(randomInteger(1200, 1300));
  }
};

// const links = await page.evaluate((startingId) => {
//   alert('COOCIE'); // 2. should be defined now
// });

// const likedForGuys = async (page) => {
//   await page.goto('https://ton.place/id1');
//   const likedElement = await page.$(
//     '#root > div > div.Content__wrap > div.ScrollView._ScrollView > div.ptr.PullToRefresh > div.ptr__children > div.Profile > div:nth-child(2) > div:nth-child(1) > div.Post__footer > div.Post__footer__actions > div:nth-child(1)'
//   );
//   console.log(likedElement);
//   await likedElement.click();
//   await page.waitForTimeout(randomInteger(1200, 1300));
// };
