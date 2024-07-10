/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

async function makeText(type, path) {
  try {
    let text;
    if (type === "file") {
      text = fs.readFileSync(path, 'utf8');
    } else if (type === "url") {
      let response = await axios.get(path);
      text = response.data;
    } else {
      console.error(`Unknown type: ${type}`);
      process.exit(1);
    }

    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
}

let [type, path] = process.argv.slice(2);
makeText(type, path);
