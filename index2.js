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
  console.log(elements);
  // пробегаем каждый элемент / run through each element
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    // ждем какое то время что бы прикинуться человеком / We wait some time to pretend to be human
    await page.waitForTimeout(randomInteger(min || 100, max || 1100));

    // кликаем по элементу / click on an item
    await element.click();
  }
};

const newParser = async (page, selector, link) => {
  await page.goto('https://ton.place/id1');
  await page.waitForSelector(selector);
  await page.waitForTimeout(randomInteger(1000, 1100));
  const element = await page.$(selector);
  console.log(element);
  // await element.click();
  // await page.goto('https://ton.place/id20003');
  // const element2 = await page.$(selector);
  // console.log(element2);
  await element.click();
  await page.waitForTimeout(randomInteger(1200, 1300));
  const element2 = await page.$(link);
  await page.waitForTimeout(randomInteger(1500, 1600));
  await element2.click();

  const element3 = await page.$('.SendForm__input_wrap');
  console.log(element3);
  //   const response = await fetch('https://example.com');
  await element3.click();
  await element3.press('K');
  await page.waitForTimeout(randomInteger(120, 250));
  await element3.press('i');
  await page.waitForTimeout(randomInteger(120, 250));
  await element3.press('l');
  await page.waitForTimeout(randomInteger(120, 250));
  await element3.press('l');
  await page.waitForTimeout(randomInteger(120, 250));
  await element3.press('Space');
  await page.waitForTimeout(randomInteger(120, 250));
  await element3.press('a');
  await page.waitForTimeout(randomInteger(120, 250));
  await element3.press('l');
  await page.waitForTimeout(randomInteger(120, 250));
  await element3.press('l');
  await page.waitForTimeout(randomInteger(120, 250));
  await element3.press('Space');
  await page.waitForTimeout(randomInteger(120, 250));
  await element3.press('H');
  await page.waitForTimeout(randomInteger(120, 250));
  await element3.press('u');
  await page.waitForTimeout(randomInteger(120, 250));
  await element3.press('m');
  await page.waitForTimeout(randomInteger(120, 250));
  await element3.press('a');
  await page.waitForTimeout(randomInteger(120, 250));
  await element3.press('n');
  await page.waitForTimeout(randomInteger(120, 250));
  await element3.press('s');
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
  // const cookiesString = await fs.readFile('./cookies.json');
  // const cookies = JSON.parse(cookiesString);

  // запихиваем в наш браузер придедущие куки / shove the following cookies into our browser
  // await page.setCookie(...cookies);

  // переходит в ton / goes to ton
  await page.goto('https://ton.place/feed');

  // перезаписываем наши куки каждые 30 секунд / overwrite our cookies every 30 seconds
  saveCookies(page);
  await newParser(
    page,
    '.Profile > div.Profile__info_block > div.Profile__follow_wrap > div.default',
    '.Profile > div.Profile__info_block > div.Profile__follow_wrap > a > div.default'
  );
  // кликаем по кнопке Поиска / click the Search button
  // await onClicks(page, '.Header__right');

  // кликаем по кнопке Люди / click on the People button
  // await onClicks(page, '._peoples');

  // await onClicks(page, '.Button__icon');
  // await onClicks(page, '.Select__indicators');

  // Фоловимся / follow
  //   while (1) {
  //     await onClicks(
  //       page,
  //       '.UserCell > div.UserCell__follow > div.default',
  //       2000,
  //       4000
  //     );
  //   }
}

getPic();
