import fs from 'fs';

// eslint-disable-next-line import/no-cycle
import {
  catchEdges,
  getDegrees,
  calculateDiameter,
  components,
  createGraph,
  dfs,
  bfs,
  dijkstra,
} from '../functions';

/**
 * @name Graph
 * @description A class that represents a Graph.
 * @param {Object} event
 * @param {'adjacent vector' , 'adjacent matrix'} memoryStructure - if should represents as an array or a matrix
 * @param {String} [filePath] - path to the file
 * @param {Buffer} [Buffer] - Buffer of informations
 * @param {Number} [size] - graph's size
 * @param {Number} [startNode] - a node there is the first added to the graph
 */
export class Graph {
  constructor({
    memoryStructure, filePath, buffer, size, startNode,
  }) {
    this.startNode = startNode;
    this.memoryStructure = memoryStructure;

    if (!filePath && !buffer && !size) throw new Error('Missing filePath or buffer or size.');
    const Buffer = filePath ? fs.readFileSync(filePath) : buffer;
    this.filePath = filePath;
    const {
      edges,
      qtdNodes,
      edgesWithNoWeight,
      graphHasWeights,
    } = Buffer ? catchEdges(Buffer) : { edges: [], qtdNodes: size, edgesWithNoWeight: [] };

    this.edges = edges;
    this.edgesWithNoWeight = edgesWithNoWeight;
    this.size = qtdNodes;
    this.graphHasWeights = graphHasWeights;
    this.nodes = [];
    for (let index = 0; index < this.size; index += 1) this.nodes.push(index);

    this.GraphStructure = createGraph(edges, qtdNodes, memoryStructure);

    // this.saveDegreesInfos();
  }

  saveDegreesInfos() {
    const {
      lowestDegree,
      highestDegree,
      medianDegree,
      averageDegree,
      degrees,
    } = getDegrees(this.edges);

    this.lowestDegree = lowestDegree;
    this.highestDegree = highestDegree;
    this.medianDegree = medianDegree;
    this.averageDegree = averageDegree;
    this.degrees = degrees;
  }

  saveGraphInfosFile(path = './src/testFiles/testAnswerFiles/') {
    let nameOfFileToSave = 'graphInfos';
    nameOfFileToSave = this.filePath
      ? `${nameOfFileToSave}_${this.filePath.split('/').pop()}`
      : `${nameOfFileToSave}.txt`;
    this.checkIfShouldRegenerate();
    this.connectedComponents();
    let fileAsString = '';
    fileAsString += `\nNº Nodes = ${this.size}`;
    fileAsString += `\nNº Edges = ${this.edges.length}`;
    fileAsString += `\nLowest Degree = ${this.lowestDegree}`;
    fileAsString += `\nHighest Degree = ${this.highestDegree}`;
    fileAsString += `\nMedian Degree = ${this.medianDegree.toFixed(2)}`;
    fileAsString += `\nAverage Degree = ${this.averageDegree.toFixed(2)}`;
    fileAsString += `\nDiameter = ${this.diameter || 'not calculated'}`;
    fileAsString += this.componentsInfo ? `\n${this.componentsInfo}` : '';

    fs.writeFileSync(path + nameOfFileToSave, fileAsString);
  }

  runBFS(sourceNode, shouldGenerateInducedTree = false) {
    this.checkIfShouldRegenerate();

    if (!sourceNode) throw new Error('Missing sourceNode');
    if (sourceNode > this.GraphStructure.length - 1) throw new Error('Node does not exists');

    return bfs({ sourceNode, graph: this, shouldGenerateInducedTree });
  }

  runDFS(sourceNode, shouldGenerateInducedTree = false) {
    this.checkIfShouldRegenerate();

    if (!sourceNode) throw new Error('Missing sourceNode');
    if (sourceNode > this.GraphStructure.length - 1) throw new Error('Node does not exists');

    return dfs({ sourceNode, graph: this, shouldGenerateInducedTree });
  }

  findMinimumPath(sourceNode, targetNode) {
    this.checkIfShouldRegenerate();

    if (!sourceNode || !targetNode) throw new Error('Missing sourceNode e/or targetNode');
    if (sourceNode > this.GraphStructure.length - 1) throw new Error('Node does not exists');
    if (targetNode > this.GraphStructure.length - 1) throw new Error('Node does not exists');

    const { minimumPath, minimumPathSize } = bfs({
      sourceNode,
      graph: this,
      targetNode,
    });

    return {
      minimumPath,
      minimumPathSize,
    };
  }

  addEdge(sourceNode, targetNode, weight = 1) {
    if (!sourceNode || !targetNode) throw new Error('Missing sourceNode e/or targetNode');
    if (sourceNode > targetNode) ([sourceNode, targetNode] = [targetNode, sourceNode]);
    if (!this.edgesWithNoWeight.includes(`${sourceNode} ${targetNode}`)) {
      this.edgesWithNoWeight.push(`${sourceNode} ${targetNode}`);
      this.edges.push([sourceNode, targetNode, weight]);
    }

    this.shouldRegenerate = true;
  }

  checkIfShouldRegenerate() {
    if (this.shouldRegenerate) {
      this.GraphStructure = createGraph(
        this.edges,
        this.size,
        this.memoryStructure,
      );
      this.saveDegreesInfos();
    }
    this.shouldRegenerate = false;
  }

  calculateDiameter() {
    this.checkIfShouldRegenerate();

    this.diameter = calculateDiameter(this, bfs);

    return this.diameter;
  }

  connectedComponents(func = bfs) {
    this.checkIfShouldRegenerate();
    this.components = components(this, func);

    [this.biggestComponent] = this.components;
    [this.smallestComponent] = this.components.slice(-1);
    this.numberOfComponents = this.components.length;

    let ComponentsAsStrings = 'Connected Components Info:';

    ComponentsAsStrings += `\n\tNumber of components: ${this.numberOfComponents}`;
    for (
      let component = 0;
      component < this.numberOfComponents;
      component += 1
    ) {
      ComponentsAsStrings += `\n\tComponent: ${component + 1}`;
      ComponentsAsStrings += `\n\t\tSize: ${this.components[component].size}`;
      ComponentsAsStrings += `\n\t\tNodes: ${this.components[component].nodes}\n`;
    }
    ComponentsAsStrings += '\n-------------------------';
    ComponentsAsStrings += `\n\tBiggest Component Size: ${this.biggestComponent.size}`;
    ComponentsAsStrings += `\n\tBiggest Component Nodes: ${this.biggestComponent.nodes}\n`;
    ComponentsAsStrings += `\n\tSmallest Component Size: ${this.smallestComponent.size}`;
    ComponentsAsStrings += `\n\tSmallest Component Nodes: ${this.smallestComponent.nodes}`;

    this.componentsInfo = ComponentsAsStrings;

    return this.componentsInfo;
  }

  removeNodesWithNoEdges() {
    this.saveDegreesInfos();
    this.nodes = Object.keys(this.degrees).map((a) => Number(a));
    if (this.nodes.length === 0) this.nodes = [this.startNode];
    this.size = this.nodes.length;
  }

  dijkstraAlgorithm(startNode) {
    this.checkIfShouldRegenerate();
    const { dist, prev } = dijkstra(this, startNode);
    this.dist = dist;
    this.prev = prev;
  }

  getMinDistPath(startNode, targetNode) {
    if (!this.graphHasWeights) { // Se o grafo nao possuir pesos, a BFS eh utilizada.
      const { minimumPath } = this.findMinimumPath(startNode, targetNode);
      const distanceToTarget = minimumPath.length;
      return { distanceToTarget, minimumPath };
    }
    const targetKey = targetNode.toString();
    const startKey = startNode.toString();
    // 'Stringified' the nodes
    const distanceToTarget = this.dist[targetKey];
    const minimumPath = [targetKey];
    const fathers = this.prev;
    let father = fathers[targetKey];
    while (startKey !== father) {
      const fatherKey = father.toString();
      minimumPath.push(fatherKey);
      father = fathers[fatherKey];
    }
    minimumPath.push(startNode.toString());
    minimumPath.reverse();
    return { distanceToTarget, minimumPath };
  }

  getExcentricity(node) {
    this.checkIfShouldRegenerate();
    const { dist } = dijkstra(this, node);
    let mostDistantNode = node;
    let excentricity = 0;
    for (const [key, value] of Object.entries(dist)) {
      if (value > excentricity) {
        excentricity = value;
        mostDistantNode = key;
      }
    }
    return { excentricity, mostDistantNode };
  }

  getEdgeWeight(u, v) {
    return this.GraphStructure[u][v];
  }

  getNodeNeighborhood(u) {
    if (this.memoryStructure === 'adjacent matrix') {
      const nodes = {};
      for (let nodePosition = 0; nodePosition < this.GraphStructure[u].length; nodePosition += 1) {
        if (this.GraphStructure[u][nodePosition]) nodes[nodePosition] = this.GraphStructure[u][nodePosition];
      }
      return nodes;
    }
    return this.GraphStructure[u];
  }
}
