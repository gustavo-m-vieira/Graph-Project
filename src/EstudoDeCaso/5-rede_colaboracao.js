import minimist from 'minimist';
import util from 'util';
import { Graph } from '../classes';

util.inspect.defaultOptions.depth = null;
const { path = './src/testFiles/testInput/colaboradores.txt' } = minimist(process.argv.slice(2));

/**
* @name distance
* @description Function to be executed for study cases.
* @command npx -p @babel/core -p @babel/node babel-node --presets @babel/preset-env ./src/EstudoDeCaso/5-rede_colaboracao.js
*/
const graph = new Graph({ memoryStructure: 'adjacent vector', filePath: path });
console.log('Graph loaded!');
graph.dijkstraAlgorithm(2722); // Dijkstra
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

// eslint-disable-next-line no-unused-vars
const targetNodes = ['Alan M. Turing', 'J. B. Kruskal', 'Jon M. Kleinberg', 'Éva Tardos', 'Daniel R. Figueiredo'];
const targetMappedNumbers = [11365, 471365, 5709, 11386, 343930];
for (const node of targetMappedNumbers) {
  console.log(`Target Node: ${node}\n`);
  distance(node);
  console.log('----------------------------');
}
