// eslint-disable-next-line import/no-cycle
import { Graph } from '../../classes';
import { calculateMinimumPath } from '../calculateMinimumPath';

/**
* @name bfs
* @description Runs Breadth First Search on a graph.
* @param {Number} s - start vertice
* @param {Set[]} graph - Graph
*/
export function bfs(sourceNode, graph, targetNode, shouldGenerateInducedTree = false) {
  const inducedTree = shouldGenerateInducedTree ? new Graph({ size: graph.length, memoryStructure: 'adjacent matrix' }) : undefined;
  const size = graph.length;
  const visited = new Array(size);
  const fathers = new Array(size);
  const levels = new Array(size);
  fathers[sourceNode] = null;
  levels[sourceNode] = 0;
  let queue = [sourceNode];
  visited[sourceNode] = true;
  let foundNode = false;
  let currentNode;

  while (queue.length) {
    ([currentNode, ...queue] = queue);

    for (let node = 1; node <= graph.length; node += 1) {
      if (graph[currentNode][node]) {
        if (!visited[node]) {
          queue.push(node);
          visited[node] = true;
          levels[node] = levels[currentNode] + 1;
          fathers[node] = currentNode;
          if (shouldGenerateInducedTree) inducedTree.addEdge(currentNode, node);
          if (targetNode && node === targetNode) {
            foundNode = true;
            break;
          }
        }
      }
    }
    if (targetNode && foundNode) {
      break;
    }
  }
  let minimumPath;
  let minimumPathSize;
  if (targetNode && foundNode) ({ minimumPath, minimumPathSize } = calculateMinimumPath(targetNode, sourceNode, fathers));

  if (shouldGenerateInducedTree) inducedTree.checkIfShouldRegenerate();

  return {
    minimumPath,
    foundNode,
    fathers,
    minimumPathSize,
    levels,
    inducedTree,
  };
}
