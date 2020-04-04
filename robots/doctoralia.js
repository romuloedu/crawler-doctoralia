const puppeteer = require("puppeteer");
const state = require("./state.js");

async function robot() {
    console.log('> [text-robot] Starting...');
    const content = state.load();

    content.doctors = await getPage(content.searchTerm);
    state.save(content);
    console.log(content);

    async function getPage(searchTerm) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(`https://www.doctoralia.com.br/pesquisa?q=&loc=${searchTerm}`);

        const scrapResult = await page.evaluate(() => {
            const doctors = [];
            document.querySelectorAll('div.dp-doctor-card.dp-doctor-card-md')
                .forEach(doctor => {
                    const name = doctor.querySelector("h3 > a").innerText;

                    const specialties = doctor.querySelector("h4") == null
                        ? ""
                        : doctor.querySelector("h4").innerText;

                    const attendingTelemedicine = doctor.querySelector("p.text-calm") == null
                        ? false
                        : true;

                    doctors.push({
                        name: name,
                        specialties: specialties,
                        attendingTelemedicine: attendingTelemedicine,
                    });
                });
            return doctors;
        });

        await browser.close();
        return scrapResult;
    };
}

module.exports = robot;