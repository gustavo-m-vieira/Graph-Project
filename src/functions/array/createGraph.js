import { getLastNode } from '../getLastNode';
/**
* @name createGraph
* @description Receives an array of edges an returns a graph.
* @param {Number[]} edges - an array of Edges
*/
export function createGraph(edges) {
  const lastNode = getLastNode(edges);
  const graph = new Array(lastNode);

  for (const [node1, node2] of edges) {
    if (!graph[node1]) graph[node1] = new Set();
    graph[node1].add(node2);

    if (!graph[node2]) graph[node2] = new Set();
    graph[node2].add(node1);
  }

  return graph;
}
