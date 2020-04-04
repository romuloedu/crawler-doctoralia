const robots = {
    input: require('./robots/input.js'),
    doctoralia: require('./robots/doctoralia.js')
};

async function start() {
    robots.input();
    await robots.doctoralia();
}

start();