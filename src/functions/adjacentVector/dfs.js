// eslint-disable-next-line import/no-cycle
import { Graph } from '../../classes';

/**
* @name dfs
* @description Runs Depth First Search on a graph.
* @param {Number} sourceNode - start vertice
* @param {Set[]} graph - Graph
* @param {boolean} shouldGenerateInducedTree - If true, bfs will generate an induced tree
*/
export function dfs({ sourceNode, graph, shouldGenerateInducedTree = false }) {
  const visited = new Set();
  const fathers = new Array(graph.length);
  const levels = new Array(graph.length);
  levels[sourceNode] = 0;
  const inducedTree = shouldGenerateInducedTree ? new Graph({ size: graph.length, memoryStructure: 'adjacent vector' }) : undefined;

  const dfsAux = (v) => {
    visited.add(v);

    for (const node of graph[v]) {
      if (!visited.has(node)) {
        fathers[node] = v;
        levels[node] = levels[v] + 1;
        if (shouldGenerateInducedTree) inducedTree.addEdge(v, node);
        dfsAux(node);
      }
    }
  };

  dfsAux(sourceNode);

  if (shouldGenerateInducedTree) inducedTree.checkIfShouldRegenerate();

  return {
    fathers,
    levels,
    inducedTree,
  };
}
