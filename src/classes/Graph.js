import fs from 'fs';
import * as GraphAsAdjacentVector from '../functions/adjacentVector';
// eslint-disable-next-line import/no-cycle
import * as GraphAsAdjacentMatrix from '../functions/adjacentMatrix';

import {
  catchEdges,
  getDegrees,
  calculateDiameter,
} from '../functions';

/**
* @name Graph
* @description A class that represents a Graph.
* @param {Object} event
* @param {'adjacent vector' , 'adjacent matrix'} memoryStructure - if should represents as an array or a matrix
* @param {String} [filePath] - path to the file
* @param {Buffer} [Buffer] - Buffer of informations
*/
export class Graph {
  constructor({
    memoryStructure, filePath, buffer, size,
  }) {
    if (!filePath && !buffer && !size) throw new Error('Missing filePath or buffer or size.');
    const Buffer = filePath ? fs.readFileSync(filePath) : buffer;

    const {
      edges,
      qtdNodes,
    } = Buffer ? catchEdges(Buffer) : { edges: [], qtdNodes: size };

    this.edges = edges;
    this.nodes = qtdNodes;
    this.saveFunctions(memoryStructure);

    this.GraphStructure = this.createGraph(this.edges, qtdNodes);
    this.saveDegreesInfos();
  }

  saveFunctions(memoryStructure) {
    let functions;

    switch (memoryStructure) {
      case 'adjacent vector':
        functions = GraphAsAdjacentVector;
        break;
      case 'adjacent matrix':
        functions = GraphAsAdjacentMatrix;
        break;
      default:
        throw Error('memoryStructure should be one of this options: "adjacent vector" or "adjacent matrix".');
    }

    Object.entries(functions).forEach(([key, value]) => { this[key] = value; });
  }

  saveDegreesInfos() {
    const {
      lowestDegree,
      highestDegree,
      medianDegree,
      averageDegree,
    } = getDegrees(this.edges);

    this.lowestDegree = lowestDegree;
    this.highestDegree = highestDegree;
    this.medianDegree = medianDegree;
    this.averageDegree = averageDegree;
  }

  saveGraphInfosFile(path = './src/testFiles/testAnswerFiles/graphInfos.txt') {
    this.checkIfShouldRegenerate();

    let fileAsString = '';
    fileAsString += `\nNº Nodes = ${this.nodes}`;
    fileAsString += `\nNº Edges = ${this.edges.length}`;
    fileAsString += `\nLowest Degree = ${this.lowestDegree}`;
    fileAsString += `\nHighest Degree = ${this.highestDegree}`;
    fileAsString += `\nMedian Degree = ${this.medianDegree}`;
    fileAsString += `\nAverage Degree = ${this.averageDegree}`;
    fileAsString += `\nDiameter = ${this.diameter || 'not calculated'}`;

    fs.writeFileSync(path, fileAsString);
  }

  runBFS(sourceNode) {
    this.checkIfShouldRegenerate();

    if (!sourceNode) throw new Error('Missing sourceNode');
    if (sourceNode > this.GraphStructure.length - 1) throw new Error('Node does not exists');

    return this.bfs(sourceNode, this.GraphStructure);
  }

  runDFS(sourceNode) {
    this.checkIfShouldRegenerate();

    if (!sourceNode) throw new Error('Missing sourceNode');
    if (sourceNode > this.GraphStructure.length - 1) throw new Error('Node does not exists');

    return this.dfs(sourceNode, this.GraphStructure);
  }

  findMinimumPath(sourceNode, targetNode) {
    this.checkIfShouldRegenerate();

    if (!sourceNode || !targetNode) throw new Error('Missing sourceNode e/or targetNode');
    if (sourceNode > this.GraphStructure.length - 1) throw new Error('Node does not exists');
    if (targetNode > this.GraphStructure.length - 1) throw new Error('Node does not exists');

    const {
      minimumPath,
      minimumPathSize,
    } = this.bfs(sourceNode, this.GraphStructure, targetNode);

    return {
      minimumPath,
      minimumPathSize,
    };
  }

  addEdge(sourceNode, targetNode) {
    if (!sourceNode || !targetNode) throw new Error('Missing sourceNode e/or targetNode');
    this.edges.push([sourceNode, targetNode]);
    this.shouldRegenerate = true;
  }

  checkIfShouldRegenerate() {
    if (this.shouldRegenerate) {
      this.GraphStructure = this.createGraph(this.edges, this.nodes);
      this.saveDegreesInfos();
    }
    this.shouldRegenerate = false;
  }

  calculateDiameter() {
    this.checkIfShouldRegenerate();

    this.diameter = calculateDiameter(this.GraphStructure, this.bfs);

    return this.diameter;
  }
}
