import minimist from 'minimist';
import util from 'util';
import { Graph } from '../classes';

util.inspect.defaultOptions.depth = null;
const { path = './src/testFiles/testInput/rede_colaboracao.txt' } = minimist(process.argv.slice(2));

/**
* @name distance
* @description Function to be executed for study cases.
* @command npx -p @babel/core -p @babel/node babel-node --presets @babel/preset-env ./src/EstudoDeCaso/5-rede_colaboracao.js
*/
const graph = new Graph({ memoryStructure: 'adjacent vector', filePath: path });
graph.giveNameToNodes('./src/testFiles/testInput/rede_colaboracao_vertices.txt');
console.log('Graph loaded!');
const dijkstraNodeValue = graph.nameToNode['Edsger W. Dijkstra'];
graph.dijkstraAlgorithm(dijkstraNodeValue); // Dijkstra

async function distance(startNode, targetNode) {
  try {
    let { distanceToTarget, minimumPath } = graph.getMinDistPath(startNode, targetNode);
    console.log(`Distance: ${distanceToTarget}`);
    minimumPath = minimumPath.map((node) => graph.nodeToName[node]);
    console.log('Minimum Path:');
    console.log(minimumPath);
  } catch (error) {
    console.log('Something went wrong', { error });
  }
}

// eslint-disable-next-line no-unused-vars
const targetNodes = ['Alan M. Turing', 'J. B. Kruskal', 'Jon M. Kleinberg', 'Éva Tardos', 'Daniel R. Figueiredo'];
for (const node of targetNodes) {
  console.log(`Target Node: ${node}\n`);
  distance(dijkstraNodeValue, graph.nodeToName[node]);
  console.log('----------------------------');
}
