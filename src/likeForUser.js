import fs from 'fs/promises';

const isUser = async (page, message, startingId) => {
  const selector =
    '.Profile > div.Profile__info_block > div.Profile__follow_wrap > div';
  const postCountSelector = '.Profile__counters__item_count';
  const likedSelector = '.Post__footer__actions > div.secondary';

  await page.goto(`https://ton.place/id${startingId}`);

  await page.waitForSelector(selector);

  const postsCount = await page.$(postCountSelector);

  const value = await page.evaluate((el) => el.textContent, postsCount);

  if (value > 0) {
    console.log(startingId);
    await fs.appendFile('./ids.json', `${startingId}\n`);
    const subscribeElement = await page.$(selector);
    await page.waitForTimeout(randomInteger(400, 500));
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
      const likedElement = await page.$$(likedSelector);
      await likedElement[0].click();
      await page.waitForTimeout(randomInteger(1200, 1300));
    } catch (err) {
      console.log(err); // TypeError: failed to fetch
    }
    // await likedElement[0].click();
    // await page.waitForTimeout(randomInteger(1200, 1300));
  }
};

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

const massLikes = async (page) => {
  const likedSelector = '.Post__footer__actions > div.secondary';
  const likedElements = await page.$$(likedSelector);
  for (let i = 0; i < likedElements.length; i++) {
    await likedElements[1].click();
    await page.waitForTimeout(randomInteger(500, 600));
  }
};

export default isUser;
