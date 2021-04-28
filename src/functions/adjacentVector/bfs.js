import { calculateMinimumPath } from '../calculateMinimumPath';
// eslint-disable-next-line import/no-cycle
import { Graph } from '../../classes';

/**
* @name bfs
* @description Runs Breadth First Search on a graph.
* @param {Number} s - start vertice
* @param {Set[]} graph - Graph
*/
export function bfs({
  sourceNode, graph, targetNode, shouldGenerateInducedTree = false,
}) {
  const inducedTree = shouldGenerateInducedTree ? new Graph({ size: graph.length, memoryStructure: 'adjacent vector', startNode: sourceNode }) : undefined;
  const visited = new Array(graph.length);

  let queue = [sourceNode];
  const fathers = new Array(graph.length);
  const levels = new Array(graph.length);
  levels[sourceNode] = 0;
  visited[sourceNode] = true;
  let foundNode;
  let minimumPath;
  let minimumPathSize;

  let s;

  while (queue.length) {
    ([s, ...queue] = queue);

    for (const node of graph[s]) {
      if (!visited[node]) {
        queue.push(node);
        visited[node] = true;
        fathers[node] = s;
        levels[node] = levels[s] + 1;
        if (shouldGenerateInducedTree) inducedTree.addEdge(s, node);
        if (targetNode && node === targetNode) {
          foundNode = true;
          break;
        }
      }
    }

    if (targetNode && foundNode) break;
  }
  // console.log({ levels });
  if (targetNode && foundNode) ({ minimumPath, minimumPathSize } = calculateMinimumPath(targetNode, sourceNode, fathers));

  if (shouldGenerateInducedTree) inducedTree.checkIfShouldRegenerate();

  const visitedNodes = [];
  for (let node = 1; node < graph.length; node += 1) {
    if (visited[node]) visitedNodes.push(node);
  }

  return {
    minimumPath,
    foundNode,
    fathers,
    minimumPathSize,
    levels,
    inducedTree,
    visited: visitedNodes,
  };
}
