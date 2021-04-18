import fs from 'fs';
import * as GraphAsArray from '../functions/array';
import * as GraphAsMatrix from '../functions/matrix';
import {
  catchEdges,
  getDegrees,
} from '../functions';

/**
* @name Graph
* @description A class that represents a Graph.
* @param {Object} event
* @param {'matrix' , 'array'} memoryStructure - if should represents as an array or a matrix
* @param {String} [filePath] - path to the file
* @param {Buffer} [Buffer] - Buffer of informations
*/
export class Graph {
  constructor({ memoryStructure, filePath, buffer }) {
    const Buffer = buffer || fs.readFileSync(filePath);

    this.edges = catchEdges(Buffer);
    this.saveDegreesInfos();
    this.saveFunctions(memoryStructure);

    this.GraphStructure = this.createGraph(this.edges);
  }

  saveFunctions(memoryStructure) {
    let functions;

    switch (memoryStructure) {
      case 'array':
        functions = GraphAsArray;
        break;
      case 'matrix':
        functions = GraphAsMatrix;
        break;
      default:
        throw Error('memoryStructure should be one of this options: "array" or "matrix".');
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
    let fileAsString = '';
    fileAsString += `\nNº Nodes = ${this.GraphStructure.length}`;
    fileAsString += `\nNº Edges = ${this.edges.length}`;
    fileAsString += `\nLowest Degree = ${this.lowestDegree}`;
    fileAsString += `\nHighest Degree = ${this.highestDegree}`;
    fileAsString += `\nMedian Degree = ${this.medianDegree}`;
    fileAsString += `\nAverage Degree = ${this.averageDegree}`;

    fs.writeFileSync(path, fileAsString);
  }
}
