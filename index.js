const state = require("./robots/state.js");

const robots = {
    input: require('./robots/input.js'),
    doctoralia: require('./robots/doctoralia.js')
};

async function start() {
    robots.input();
    await robots.doctoralia();

    const content = state.load();
    console.log(content);
}

start();