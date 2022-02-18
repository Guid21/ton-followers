import fs from 'fs/promises';
const saveCookies = (page) => {
  setInterval(async () => {
    const cookies = await page.cookies();
    await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
  }, 30 * 1000);
};

export default saveCookies;
