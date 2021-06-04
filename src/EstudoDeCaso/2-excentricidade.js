import minimist from 'minimist';
import util from 'util';
import { performance } from 'perf_hooks';
import { Graph } from '../classes';

util.inspect.defaultOptions.depth = null;
const { path = './src/testFiles/testInput/grafo_W_3_proc.txt' } = minimist(process.argv.slice(2));

/**
* @name excentricidade
* @description Study case for excentricity of nodes.
* @command npx -p @babel/core -p @babel/node babel-node --presets @babel/preset-env ./src/EstudoDeCaso/2-excentricidade.js
*/
const graph = new Graph({ memoryStructure: 'adjacent vector', filePath: path });
console.log('Graph loaded!');
async function excentricidade(node) {
  try {
    const { excentricity, mostDistantNode } = graph.getExcentricity(node);
    console.log(`Excentricity: ${excentricity}`);
    console.log(`Most distant node: ${mostDistantNode}`);
  } catch (error) {
    console.log('Something went wrong', { error });
  }
}
const targetNodes = [10, 20, 30, 40, 50];
const t0 = performance.now();
for (const node of targetNodes) {
  console.log(`Node being analyzed: ${node}\n`);
  excentricidade(node);
  console.log('----------------------------');
}
const t1 = performance.now();
console.log((t1 - t0) / 5.0);
