import randomInteger from '../utils/randomInteger.js';

const likeForGuys = async (page, startingId) => {
  const likedSelector = '.Post__footer__actions > div.secondary';
  const inputSelector =
    '#root > div > div.Modal__wrap > div > div.CommentForm > div.CommentForm__content > div.CommentForm__input_wrap';
  const sendMessageSelector =
    '#root > div > div.Modal__wrap > div > div.CommentForm > div.CommentForm__content > div:nth-child(3)';
  const backSelector =
    '#root > div > div.Modal__wrap > div > div.Header.hasBack > div.Header__back';

  const secLikeSelector =
    '#root > div > div.Content__wrap > div.ScrollView._ScrollView > div.ptr.PullToRefresh > div.ptr__children > div.Profile > div:nth-child(2) > div:nth-child(2) > div.Post__footer > div.Post__footer__actions > div:nth-child(1)';
  const secCommentSelector =
    '#root > div > div.Content__wrap > div.ScrollView._ScrollView > div.ptr.PullToRefresh > div.ptr__children > div.Profile > div:nth-child(2) > div:nth-child(2) > div.Post__footer > div.Post__footer__actions > div:nth-child(2)';

  const thirdLikeSelector =
    '#root > div > div.Content__wrap > div.ScrollView._ScrollView > div.ptr.PullToRefresh > div.ptr__children > div.Profile > div:nth-child(2) > div:nth-child(3) > div.Post__footer > div.Post__footer__actions > div:nth-child(1)';
  const thirdCommentSelector =
    '#root > div > div.Content__wrap > div.ScrollView._ScrollView > div.ptr.PullToRefresh > div.ptr__children > div.Profile > div:nth-child(2) > div:nth-child(3) > div.Post__footer > div.Post__footer__actions > div:nth-child(2)';

  await page.waitForTimeout(randomInteger(1200, 1300));
  await page.goto(`https://ton.place/id${startingId}`);
  await page.waitForSelector(likedSelector);
  const likedElement = await page.$$(likedSelector);

  await likedElement[0].click();
  await page.waitForTimeout(randomInteger(1200, 1300));
  await likedElement[1].click();
  await page.waitForTimeout(randomInteger(1200, 1300));

  await page.waitForSelector(inputSelector);
  const inputElement = await page.$(inputSelector);
  inputElement.click();
  await page.waitForTimeout(randomInteger(1500, 1600));
  await inputElement.type('Хех, удачи в развитии канала');

  const sendMessageElement = await page.$(sendMessageSelector);
  sendMessageElement.click();
  await page.waitForTimeout(randomInteger(1200, 1300));
  const backElement = await page.$(backSelector);
  console.log(backElement ? 1 : 0);
  backElement.click();

  await page.waitForTimeout(randomInteger(1500, 1600));
  await page.waitForSelector(secLikeSelector);
  const likedElement2 = await page.$$(secLikeSelector);
  await likedElement2[0].click();
  const commentElement2 = await page.$$(secCommentSelector);
  await commentElement2[0].click();
  await page.waitForTimeout(randomInteger(1200, 1300));
  await page.waitForSelector(inputSelector);
  const inputElement2 = await page.$(inputSelector);
  inputElement2.click();
  await page.waitForTimeout(randomInteger(500, 600));
  await inputElement2.type(
    // 'TON.PLACE мне очень нравится эта задумка но боты задолбали'
    // 'Хех, удачи в развитии канала'
    'Лол'
  );

  const sendMessageElement2 = await page.$(sendMessageSelector);
  sendMessageElement2.click();
  await page.waitForTimeout(randomInteger(1500, 1600));
  const backElement2 = await page.$(backSelector);
  backElement2.click();

  await page.waitForTimeout(randomInteger(1500, 1600));
  await page.waitForSelector(thirdLikeSelector);
  const likedElement3 = await page.$$(thirdLikeSelector);
  await likedElement3[0].click();
  const commentElement3 = await page.$$(thirdCommentSelector);
  await commentElement3[0].click();
  await page.waitForTimeout(randomInteger(1200, 1300));
  await page.waitForSelector(inputSelector);
  const inputElement3 = await page.$(inputSelector);
  inputElement3.click();
  await page.waitForTimeout(randomInteger(1200, 1300));
  await inputElement3.type(
    // 'TON.PLACE мне очень нравится эта задумка но боты задолбали'
    // 'Хех, удачи в развитии канала'
    'классная сеть, за лайки дают TON'
  );

  const sendMessageElement3 = await page.$(sendMessageSelector);
  sendMessageElement3.click();
  await page.waitForTimeout(randomInteger(500, 600));
  const backElement3 = await page.$(backSelector);
  backElement3.click();
};

export default likeForGuys;

// https://ton.place/sub_lxrvx
