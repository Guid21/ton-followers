import puppeteer from 'puppeteer';
import isUser from './src/likeForUser.js';
import fs from 'fs/promises';

const saveCookies = (page) => {
  setInterval(async () => {
    const cookies = await page.cookies();
    await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
  }, 30 * 1000);
};

const min = 26172;
const max = 27000;

/**
 * Кликаем по кнопочкам / Clicking the buttons
 *
 * @param {number} page puppeteer.Page.
 * @param {number} selector puppeteer.Page.
 * @param {number} min минимальная граница ожидания. / minimum expectation limit.
 * @param {number} max максимальная граница ожидания. / maximum expectation limit.
 */

async function getPic() {
  // конфигурируем наш браузер / configure our browser
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: './user_data',
  });

  // запускаем наш браузер / Launch our browser
  const page = await browser.newPage();

  await page.goto('https://ton.place/feed');

  // перезаписываем наши куки каждые 30 секунд / overwrite our cookies every 30 seconds
  await loop(min, max, page);
  saveCookies(page);
}

getPic();

const loop = async (min, max, page) => {
  for (let i = min; i < max; i++) {
    await isUser(page, 'All done', i);
    await page.waitForTimeout(randomInteger(1200, 1300));
  }
};

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};
