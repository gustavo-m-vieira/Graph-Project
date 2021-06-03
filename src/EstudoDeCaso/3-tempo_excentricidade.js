import minimist from 'minimist';
import util from 'util';
import { performance } from 'perf_hooks';
import { Graph } from '../classes';

util.inspect.defaultOptions.depth = null;
const { path = './src/testFiles/testInput/grafo_W_1.txt' } = minimist(process.argv.slice(2));

/**
* @name tempoExcentricidade
* @description Study case for the required time to calculate excentricity of nodes.
* @command npx -p @babel/core -p @babel/node babel-node --presets @babel/preset-env ./src/EstudoDeCaso/3-tempo_excentricidade.js
*/

async function tempoExcentricidade() {
  try {
    const graph = new Graph({ memoryStructure: 'adjacent vector', filePath: path });
    const nodes = [];
    for (let k = 0; k < 100; k += 1) {
      nodes.push(Math.floor((Math.random() * graph.size) + 1));
    }
    const t0 = performance.now();
    for (const node of nodes) {
      graph.getExcentricity(node);
    }
    const t1 = performance.now();

    console.log(`Medium time taken to calculate excentricity of a node: ${(t1 - t0) / 100} ms`);
  } catch (error) {
    console.log('Something went wrong', { error });
  }
}
tempoExcentricidade();
