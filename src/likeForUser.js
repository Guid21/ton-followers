import fs from 'fs/promises';
import fetch from 'node-fetch';
import randomInteger from '../utils/randomInteger.js';

const isUser = async (page, str, startingId) => {
  const selector =
    '.Profile > div.Profile__info_block > div.Profile__follow_wrap > div';
  const postCountSelector = '.Profile__counters__item_count';
  const likedSelector = '.Post__footer__actions > div.secondary';

  await page.goto(`https://ton.place/id${startingId}`);

  await page.waitForSelector(selector);

  const postsCount = await page.$(postCountSelector);
  const value = await page.evaluate((el) => el.textContent, postsCount);
  if (value > 0) {
    // const selectorText = await page.evaluate(
    //   (el) => el.textContent,
    //   subscribeElement
    // );
    // console.log(selectorText);
    // if (selectorText == 'Подписаться' || 'Подписаться в ответ')
    //   await subscribeElement.click();
    // await page.waitForTimeout(randomInteger(400, 500));

    // massLikes(page);

    try {
      console.log(startingId);
      await fs.appendFile('./ids.json', `${startingId}\n`);
      await fs.writeFile('./lastIds.txt', `${startingId}`);
      // fetch(`https://api.ton.place/profile/${startingId}`);
      //   .then((res) => res.json())
      //   .then((text) => fs.writeFile('./text.json', text));
      // // .then((text) => fs.writeFile('./text.json', JSON.parse(text)));
      // const subscribeElement = await page.$(selector);
      // await page.waitForTimeout(randomInteger(400, 500));
      const likedElement = await page.$$(likedSelector);
      await likedElement[0].click();
      await page.waitForTimeout(randomInteger(1200, 1300));
    } catch (err) {
      await fs.appendFile('./ids.json', ` FAIL   ${startingId}\n        `);
      // const subscribeElement = await page.$(selector);
      // await page.waitForTimeout(randomInteger(400, 500));
      // const likedElement = await page.$$(likedSelector);
      // await likedElement[0].click();
      // await page.waitForTimeout(randomInteger(1200, 1300));
      console.log(err); // TypeError: failed to fetch
    }
    // await likedElement[0].click();
    // await page.waitForTimeout(randomInteger(1200, 1300));
  }
};

export default isUser;
