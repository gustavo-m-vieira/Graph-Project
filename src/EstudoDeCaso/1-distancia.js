import minimist from 'minimist';
import util from 'util';
import { Graph } from '../classes';

util.inspect.defaultOptions.depth = null;
const { path = './src/testFiles/testInput/grafo_W_3_proc.txt' } = minimist(process.argv.slice(2));

/**
* @name distance
* @description Function to be executed for study cases.
* @command npx -p @babel/core -p @babel/node babel-node --presets @babel/preset-env ./src/EstudoDeCaso/1-distancia.js
*/
const graph = new Graph({ memoryStructure: 'adjacent vector', filePath: path });
console.log('Graph loaded!');
graph.dijkstraAlgorithm(1);
async function distance(targetNode) {
  try {
    const { distanceToTarget, minimumPath } = graph.getMinDistPath(1, targetNode);
    console.log(`Distance: ${distanceToTarget}`);
    console.log('Minimum Path:');
    console.log(minimumPath);
  } catch (error) {
    console.log('Something went wrong', { error });
  }
}

const targetNodes = [10, 20, 30, 40, 50];
for (const node of targetNodes) {
  console.log(`Target Node: ${node}\n`);
  distance(node);
  console.log('----------------------------');
}
