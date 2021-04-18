import fs from 'fs';
import * as GraphAsArray from '../functions/array';
import * as GraphAsMatrix from '../functions/matrix';
import {
  catchEdges,
  getDegrees,
} from '../functions';

export class Graph {
  constructor({ memoryStructure, filePath, buffer }) {
    const Buffer = buffer || fs.readFileSync(filePath);

    this.edges = catchEdges(Buffer);

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

    this.GraphStructure = this.createGraph(this.edges);
    this.saveDegreesInfos();
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
}
