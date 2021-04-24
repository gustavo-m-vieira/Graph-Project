import fs from 'fs';
import * as GraphAsAdjacentVector from '../functions/adjacentVector';
import * as GraphAsAdjacentMatrix from '../functions/adjacentMatrix';
import {
  catchEdges,
  getDegrees,
  calculateDiameter,
  components,
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

    this.edges = Buffer ? catchEdges(Buffer) : [];
    this.saveFunctions(memoryStructure);

    this.GraphStructure = this.createGraph(this.edges, size);
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
    this.nodes = this.GraphStructure.length - 1;
  }

  saveGraphInfosFile(path = './src/testFiles/testAnswerFiles/graphInfos.txt') {
    this.checkIfShouldRegenerate();
    this.connectedComponents();
    let fileAsString = '';
    fileAsString += `\nNº Nodes = ${this.GraphStructure.length - 1}`;
    fileAsString += `\nNº Edges = ${this.edges.length}`;
    fileAsString += `\nLowest Degree = ${this.lowestDegree}`;
    fileAsString += `\nHighest Degree = ${this.highestDegree}`;
    fileAsString += `\nMedian Degree = ${this.medianDegree}`;
    fileAsString += `\nAverage Degree = ${this.averageDegree}`;
    fileAsString += `\nDiameter = ${this.calculateDiameter()}\n`;
    fileAsString += this.componentsInfo;

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
      this.GraphStructure = this.createGraph(this.edges);
      this.saveDegreesInfos();
    }
    this.shouldRegenerate = false;
  }

  calculateDiameter() {
    this.checkIfShouldRegenerate();

    this.diameter = calculateDiameter(this.GraphStructure, this.bfs);

    return this.diameter;
  }

  connectedComponents(func = this.bfs) {
    this.checkIfShouldRegenerate();
    this.components = components(this.GraphStructure, func);
    [this.biggestComponent] = this.components;
    [this.smallestComponent] = this.components.slice(-1);
    this.numberOfComponents = this.components.length;
    let ComponentsAsStrings = '\tConnected Components Info:';
    ComponentsAsStrings += `\nNumber of components: ${this.numberOfComponents}`;
    for (let component = 0; component < this.numberOfComponents; component += 1) {
      ComponentsAsStrings += `\nComponent: ${component + 1}`;
      ComponentsAsStrings += `\n\tSize: ${this.components[component].size}`;
      ComponentsAsStrings += `\n\tNodes: ${this.components[component].nodes}\n`;
    }
    ComponentsAsStrings += '\n-------------------------';
    ComponentsAsStrings += `\nBiggest Component Size: ${this.biggestComponent.size}`;
    ComponentsAsStrings += `\nBiggest Component Nodes: ${this.biggestComponent.nodes}\n`;
    ComponentsAsStrings += `\nSmallest Component Size: ${this.smallestComponent.size}`;
    ComponentsAsStrings += `\nSmallest Component Nodes: ${this.smallestComponent.nodes}`;

    this.componentsInfo = ComponentsAsStrings;

    return this.componentsInfo;
  }
}
