/**
* @name createEmptyMatrix
* @description Receives a number and create a matrix with its size.
* @param {Number} size - size of matrix
*/
function createEmptyMatrix(size = 0) {
  const matrix = new Array(size + 1);
  for (let index = 0; index <= size; index += 1) {
    matrix[index] = [];
    for (let index2 = 0; index2 <= size; index2 += 1) {
      matrix[index].push(0);
    }
  }

  return matrix;
}

/**
* @name createGraph
* @description Receives an array of edges an returns a graph.
* @param {Number[]} edges - an array of Edges
* @param {Number} qtdNodes - amount of nodes
*/
export function createGraph(edges, qtdNodes) {
  console.log({ edges, qtdNodes });
  const graph = createEmptyMatrix(qtdNodes);

  for (const [node1, node2] of edges) {
    // console.log({ node1, node2 });
    graph[node1][node2] = 1;
    graph[node2][node1] = 1;
  }

  return graph;
}
