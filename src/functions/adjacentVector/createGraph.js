/**
* @name createGraph
* @description Receives an array of edges an returns a graph.
* @param {Number[]} edges - an array of Edges
* @param {Number} qtdNodes - amount of nodes
*/
export function createGraph(edges, qtdNodes) {
  const graph = new Array(qtdNodes + 1);

  for (const [node1, node2] of edges) {
    if (!graph[node1]) graph[node1] = new Set();
    graph[node1].add(node2);

    if (!graph[node2]) graph[node2] = new Set();
    graph[node2].add(node1);
  }

  return graph;
}
