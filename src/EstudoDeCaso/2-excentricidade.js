import minimist from 'minimist';
import util from 'util';
import { Graph } from '../classes';

util.inspect.defaultOptions.depth = null;
const { path = './src/testFiles/testInput/grafo_W_1.txt' } = minimist(process.argv.slice(2));

/**
* @name excentricidade
* @description Study case for excentricity of nodes.
* @command npx -p @babel/core -p @babel/node babel-node --presets @babel/preset-env ./src/EstudoDeCaso/2-excentricidade.js
*/
async function excentricidade(node) {
  try {
    const graph = new Graph({ memoryStructure: 'adjacent vector', filePath: path });
    const { excentricity, mostDistantNode } = graph.excentricity(node);
    console.log('\t\tExcentricity:');
    console.log(excentricity);
    console.log('\n\t\t\tMost distant node:');
    console.log(mostDistantNode);
  } catch (error) {
    console.log('Something went wrong', { error });
  }
}
const targetNodes = [10, 20, 30, 40, 50];
for (const node of targetNodes) {
  console.log(`Node being analyzed: ${node}\n`);
  excentricidade(node);
  console.log('----------------------------');
}
