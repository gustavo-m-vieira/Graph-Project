// eslint-disable-next-line import/no-cycle
import { Graph } from '../classes';

/**
* @name dfs
* @description Runs Depth First Search on a graph.
* @param {Number} sourceNode - start vertice
* @param {Set[]} graph - Graph
* @param {boolean} shouldGenerateInducedTree - If true, bfs will generate an induced tree
*/
export function dfs({ sourceNode, graph, shouldGenerateInducedTree = false }) {
  const { GraphStructure } = graph;

  const visited = new Set();
  const fathers = new Array(GraphStructure.length);
  const levels = new Array(GraphStructure.length);
  levels[sourceNode] = 0;
  const inducedTree = shouldGenerateInducedTree ? new Graph({ size: GraphStructure.length, memoryStructure: graph.memoryStructure }) : undefined;

  const dfsAux = (v) => {
    visited.add(v);
    for (let nodePosition = 1; nodePosition < GraphStructure[v].length; nodePosition += 1) {
      let node = GraphStructure[v][nodePosition];
      if (graph.memoryStructure === 'adjacent matrix') {
        // eslint-disable-next-line no-continue
        if (!node) continue;
        node = nodePosition;
      }
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
