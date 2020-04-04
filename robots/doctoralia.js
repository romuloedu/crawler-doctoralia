const puppeteer = require("puppeteer");

async function robot() {
    console.log('> [text-robot] Starting...');

    await getPage();

    async function getPage() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.doctoralia.com.br');
        await page.screenshot({ path: 'example.png' });
        await browser.close();
    };
}

module.exports = robot;