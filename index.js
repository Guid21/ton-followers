const puppeteer = require('puppeteer');
const fs = require('fs').promises;

/**
 * Возвращает рандомное число. / Returns a random number.
 *
 * @param {number} min минимальная граница. / minimum boundary.
 * @param {number} max максимальная граница. / maximum boundary.
 */
const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

/**
 * Записывает наши куки в ./cookies.json / Writes our cookies to ./cookies.json
 *
 * @param {number} page puppeteer.Page.
 */
const saveCookies = (page) => {
  setInterval(async () => {
    const cookies = await page.cookies();
    await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
  }, 30 * 1000);
};

/**
 * Кликаем по кнопочкам / Clicking the buttons
 *
 * @param {number} page puppeteer.Page.
 * @param {number} selector puppeteer.Page.
 * @param {number} min минимальная граница ожидания. / minimum expectation limit.
 * @param {number} max максимальная граница ожидания. / maximum expectation limit.
 */
const onClicks = async (page, selector, min, max) => {
  // дожидаемся пока прогрузится элемент / wait for the element to load
  await page.waitForSelector(selector);

  // получаем элемент по селектору / we get the item by the selector
  const elements = await page.$$(selector);

  // пробегаем каждый элемент / run through each element
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    // ждем какое то время что бы прикинуться человеком / We wait some time to pretend to be human
    await page.waitForTimeout(randomInteger(min || 100, max || 1100));

    // кликаем по элементу / click on an item
    await element.click();
  }
};

async function getPic() {
  // конфигурируем наш браузер / configure our browser
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: './user_data',
  });

  // запускаем наш браузер / Launch our browser
  const page = await browser.newPage();

  // достаем куки / pull out the cookies
  const cookiesString = await fs.readFile('./cookies.json');
  const cookies = JSON.parse(cookiesString);

  // запихиваем в наш браузер придедущие куки / shove the following cookies into our browser
  await page.setCookie(...cookies);

  // переходит в ton / goes to ton
  await page.goto('https://ton.place/feed');

  // перезаписываем наши куки каждые 30 секунд / overwrite our cookies every 30 seconds
  saveCookies(page);

  // кликаем по кнопке Поиска / click the Search button
  await onClicks(page, '.Header__right');

  // кликаем по кнопке Люди / click on the People button
  await onClicks(page, '._peoples');

  // Фоловимся / follow
  await onClicks(
    page,
    '.UserCell > div.UserCell__follow > div.default',
    3000,
    6000
  );
}

getPic();
