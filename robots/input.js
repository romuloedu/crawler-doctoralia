const readline = require("readline-sync");
const state = require("./state.js");

function robot() {
    const content = {
    }

    
    content.searchTerm = askAndReturnCityQuery();
    state.save(content);

    function askAndReturnCityQuery() {
        return readline.question('Informe a cidade que deseja obter os médicos: ');
    }
}

module.exports = robot;