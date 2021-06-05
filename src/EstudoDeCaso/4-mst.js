import minimist from 'minimist';
import util from 'util';
import { Graph } from '../classes';

util.inspect.defaultOptions.depth = null;
const { path = './src/testFiles/testInput/grafo_W_1_proc.txt' } = minimist(process.argv.slice(2));

/**
* @name mst
* @description Function to be executed for study cases.
* @command npx -p @babel/core -p @babel/node babel-node --presets @babel/preset-env ./src/EstudoDeCaso/4-mst.js
*/
const graph = new Graph({ memoryStructure: 'adjacent vector', filePath: path });
console.log('Graph loaded!');
graph.generateMST(1); // MST

// Now open the file in testFiles/testAnswerFiles
