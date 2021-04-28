import fs from 'fs';
// eslint-disable-next-line import/no-cycle
import * as GraphAsAdjacentVector from '../functions/adjacentVector';
// eslint-disable-next-line import/no-cycle
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
    this.connectedComponents();
    let fileAsString = '';
    fileAsString += `\nNº Nodes = ${this.nodes}`;
    fileAsString += `\nNº Edges = ${this.edges.length}`;
    fileAsString += `\nLowest Degree = ${this.lowestDegree}`;
    fileAsString += `\nHighest Degree = ${this.highestDegree}`;
    fileAsString += `\nMedian Degree = ${this.medianDegree.toFixed(2)}`;
    fileAsString += `\nAverage Degree = ${this.averageDegree.toFixed(2)}`;
    fileAsString += `\nDiameter = ${this.diameter || 'not calculated'}`;
    fileAsString += this.componentsInfo ? `\n${this.componentsInfo}` : '';

    fs.writeFileSync(path, fileAsString);
  }

  runBFS(sourceNode, shouldGenerateInducedTree = false) {
    this.checkIfShouldRegenerate();

    if (!sourceNode) throw new Error('Missing sourceNode');
    if (sourceNode > this.GraphStructure.length - 1) throw new Error('Node does not exists');

    return this.bfs({ sourceNode, graph: this.GraphStructure, shouldGenerateInducedTree });
  }

  runDFS(sourceNode, shouldGenerateInducedTree = false) {
    this.checkIfShouldRegenerate();

    if (!sourceNode) throw new Error('Missing sourceNode');
    if (sourceNode > this.GraphStructure.length - 1) throw new Error('Node does not exists');

    return this.dfs({ sourceNode, graph: this.GraphStructure, shouldGenerateInducedTree });
  }

  findMinimumPath(sourceNode, targetNode) {
    this.checkIfShouldRegenerate();

    if (!sourceNode || !targetNode) throw new Error('Missing sourceNode e/or targetNode');
    if (sourceNode > this.GraphStructure.length - 1) throw new Error('Node does not exists');
    if (targetNode > this.GraphStructure.length - 1) throw new Error('Node does not exists');

    const {
      minimumPath,
      minimumPathSize,
    } = this.bfs({ sourceNode, graph: this.GraphStructure, targetNode });

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

  connectedComponents(func = this.bfs) {
    this.checkIfShouldRegenerate();
    this.components = components(this.GraphStructure, func);

    [this.biggestComponent] = this.components;
    [this.smallestComponent] = this.components.slice(-1);
    this.numberOfComponents = this.components.length;

    let ComponentsAsStrings = 'Connected Components Info:';

    ComponentsAsStrings += `\n\tNumber of components: ${this.numberOfComponents}`;
    for (let component = 0; component < this.numberOfComponents; component += 1) {
      ComponentsAsStrings += `\n\tComponent: ${component + 1}`;
      ComponentsAsStrings += `\n\t\tEdges: ${this.components[component].edges.length}`;
      ComponentsAsStrings += `\n\t\tNodes: ${this.components[component].nodes}\n`;
    }
    ComponentsAsStrings += '\n-------------------------';
    ComponentsAsStrings += `\n\tBiggest Component Edges: ${this.biggestComponent.edges.length}`;
    ComponentsAsStrings += `\n\tBiggest Component Nodes: ${this.biggestComponent.nodes}\n`;
    ComponentsAsStrings += `\n\tSmallest Component Edges: ${this.smallestComponent.edges.length}`;
    ComponentsAsStrings += `\n\tSmallest Component Nodes: ${this.smallestComponent.nodes}`;

    this.componentsInfo = ComponentsAsStrings;

    return this.componentsInfo;
  }

  getNodesWithEdges() {
    this.checkIfShouldRegenerate();
    return this.countNodesWithEdges(this.GraphStructure);
  }
}
