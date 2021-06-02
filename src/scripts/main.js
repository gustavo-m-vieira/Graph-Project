import minimist from 'minimist';
import util from 'util';
import { Graph } from '../classes';

util.inspect.defaultOptions.depth = null;
const { path = './src/testFiles/testInput/grafo_W_1.txt' } = minimist(process.argv.slice(2));

/**
* @name Main
* @description Main Function.
* @command npx -p @babel/core -p @babel/node babel-node --presets @babel/preset-env ./src/scripts/main.js
*/
async function main() {
  try {
    const graph = new Graph({ memoryStructure: 'adjacent matrix', filePath: path });
    console.log(graph);
    graph.calculateDiameter();
    graph.saveGraphInfosFile();
    console.log(graph.runDFS(4));
  } catch (error) {
    console.log('Something went wrong', { error });
  }
}

main();
