import { getLastNode } from '../getLastNode';

/**
* @name createEmptyMatrix
* @description Receives a number and create a matrix with its size.
* @param {Number} size - size of matrix
*/
function createEmptyMatrix(size) {
  const matrix = new Array(size + 1);
  for (let index = 0; index <= size + 1; index += 1) {
    matrix[index] = [];
    for (let index2 = 0; index2 <= size + 1; index2 += 1) {
      matrix[index].push(0);
    }
  }

  return matrix;
}

/**
* @name createGraph
* @description Receives an array of edges an returns a graph.
* @param {Number[]} edges - an array of Edges
*/
export function createGraph(edges) {
  const lastNode = getLastNode(edges);
  const graph = createEmptyMatrix(lastNode);

  for (const [node1, node2] of edges) {
    graph[node1][node2] = 1;
    graph[node2][node1] = 1;
  }

  return graph;
}
