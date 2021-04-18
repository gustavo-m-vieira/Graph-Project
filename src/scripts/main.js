import minimist from 'minimist';
import { Graph } from '../classes';

const { path = './src/testFiles/testInputFiles/test1.txt' } = minimist(process.argv.slice(2));

/**
* @name Main
* @description Main Function.
* @command npx -p @babel/core -p @babel/node babel-node --presets @babel/preset-env ./src/scripts/main.js --path {PATH}
*/
async function main() {
  const graph = new Graph({ memoryStructure: 'adjacent vector', filePath: path });

  console.log({ graph });

  graph.saveGraphInfosFile();
}

main();
