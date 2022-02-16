const sendMessage = async (page, message, startingId) => {
  const selector =
    '.Profile > div.Profile__info_block > div.Profile__follow_wrap > div.default';
  const link =
    '.Profile > div.Profile__info_block > div.Profile__follow_wrap > a > div.default';

  await page.goto(`https://ton.place/id${startingId}`);

  await page.waitForSelector(selector);
  await page.waitForTimeout(randomInteger(1000, 1100));
  const subscribeElement = await page.$(selector);
  await subscribeElement.click();
  await page.waitForTimeout(randomInteger(1200, 1300));
  const messageElement = await page.$(link);
  await page.waitForTimeout(randomInteger(1500, 1600));
  await messageElement.click();

  const element3 = await page.$('.SendForm__input_wrap');
  await element3.click();

  // await element3.click();
  // await element3.type(message);
  // await element3.press('K');
  // await page.waitForTimeout(randomInteger(120, 250));
  // await element3.press('i');
  // await page.waitForTimeout(randomInteger(120, 250));
  // await element3.press('l');
  // await page.waitForTimeout(randomInteger(120, 250));
  // await element3.press('l');
  // await page.waitForTimeout(randomInteger(120, 250));
  // await element3.press('Space');
  // await page.waitForTimeout(randomInteger(120, 250));
  // await element3.press('a');
  // await page.waitForTimeout(randomInteger(120, 250));
  // await element3.press('l');
  // await page.waitForTimeout(randomInteger(120, 250));
  // await element3.press('l');
  // await page.waitForTimeout(randomInteger(120, 250));
  // await element3.press('Space');
  // await page.waitForTimeout(randomInteger(120, 250));
  // await element3.press('H');
  // await page.waitForTimeout(randomInteger(120, 250));
  // await element3.press('u');
  // await page.waitForTimeout(randomInteger(120, 250));
  // await element3.press('m');
  // await page.waitForTimeout(randomInteger(120, 250));
  // await element3.press('a');
  // await page.waitForTimeout(randomInteger(120, 250));
  // await element3.press('n');
  // await page.waitForTimeout(randomInteger(120, 250));
  // await element3.press('s');
};
