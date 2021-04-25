/**
 *
 * @name components
 * @param {Array()} graph
 * @param {Function()} func
 * @returns {Object[]} connectedComponents
 */

export function components(graph, func) {
  const visitedNodes = new Set();
  const connectedComponents = [];

  const addVisitedNodes = (arrayofVisited) => arrayofVisited.forEach((visited) => {
    visitedNodes.add(visited);
  });

  for (let node = 1; node < graph.length; node += 1) {
    if (!visitedNodes.has(node)) {
      const { visited, inducedTree } = func({ sourceNode: node, graph, shouldGenerateInducedTree: true });
      connectedComponents.push(inducedTree);
      addVisitedNodes(visited);
    }
  }
  return connectedComponents.sort(({ nodes: nodesA }, { nodes: nodesB }) => {
    if (nodesA < nodesB) return 1;
    if (nodesA > nodesB) return -1;
    return 0;
  });
}
