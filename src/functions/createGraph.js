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
* @name createVectorGraph
* @description Receives an array of edges an returns a graph.
* @param {Number[]} edges - an array of Edges
* @param {Number} qtdNodes - amount of nodes
*/
function createVectorGraph(edges, qtdNodes) {
  const graph = [];
  for (let index = 0; index <= qtdNodes; index += 1) {
    graph[index] = [];
  }

  for (const [node1, node2] of edges) {
    graph[node1].push(node2);

    graph[node2].push(node1);
  }

  return graph;
}

/**
* @name createMatrixGraph
* @description Receives an array of edges an returns a graph.
* @param {Number[]} edges - an array of Edges
* @param {Number} qtdNodes - amount of nodes
*/
function createMatrixGraph(edges, qtdNodes) {
  const graph = createEmptyMatrix(qtdNodes);

  for (const [node1, node2] of edges) {
    graph[node1][node2] = 1;
    graph[node2][node1] = 1;
  }

  return graph;
}

/**
* @name createGraph
* @description Receives an array of edges an returns a graph.
* @param {Number[]} edges - an array of Edges
* @param {Number} qtdNodes - amount of nodes
* @param {string} memoryStructure - type of graph
*/
export function createGraph(edges, qtdNodes, memoryStructure) {
  if (memoryStructure === 'adjacent matrix') {
    return createMatrixGraph(edges, qtdNodes);
  } if (memoryStructure === 'adjacent vector') {
    return createVectorGraph(edges, qtdNodes);
  }
  throw Error('memoryStructure should be one of this options: "adjacent vector" or "adjacent matrix".');
}
