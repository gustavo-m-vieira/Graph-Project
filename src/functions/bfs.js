import { calculateMinimumPath } from './calculateMinimumPath';
// eslint-disable-next-line import/no-cycle
import { Graph } from '../classes';

/**
* @name bfs
* @description Runs Breadth First Search on a graph.
* @param {Number} sourceNode - start vertice
* @param {Class} graph - Graph
* @param {Number} [targetNode] - Final vertice
* @param {boolean} shouldGenerateInducedTree - If true, bfs will generate an induced tree
*/
export function bfs({
  sourceNode, graph, targetNode, shouldGenerateInducedTree = false,
}) {
  console.log({ graph });
  const { GraphStructure } = graph;

  const inducedTree = shouldGenerateInducedTree
    ? new Graph({ size: GraphStructure.length, memoryStructure: graph.memoryStructure, startNode: sourceNode }) : undefined;
  const visited = new Array(GraphStructure.length);

  let queue = [sourceNode];
  const fathers = new Array(GraphStructure.length);
  const levels = new Array(GraphStructure.length);
  levels[sourceNode] = 0;
  visited[sourceNode] = true;
  let foundNode;
  let minimumPath;
  let minimumPathSize;

  let currentNode;

  while (queue.length) {
    ([currentNode, ...queue] = queue);
    for (let nodePosition = 1; nodePosition <= GraphStructure[currentNode].length; nodePosition += 1) {
      let node = GraphStructure[currentNode][nodePosition];
      if (graph.memoryStructure === 'adjacent matrix') {
        // eslint-disable-next-line no-continue
        if (!node) continue;
        node = nodePosition;
      }
      if (node && !visited[node]) {
        queue.push(node);
        visited[node] = true;
        fathers[node] = currentNode;
        levels[node] = (levels[currentNode] || 0) + 1;
        if (shouldGenerateInducedTree) inducedTree.addEdge(currentNode, node);
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
  for (let node = 1; node < GraphStructure.length; node += 1) {
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
