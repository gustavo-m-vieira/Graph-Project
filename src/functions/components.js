/**
 *
 * @name components
 * @param {Array()} graph
 * @param {Function()} func - usually a bfs
 * @returns {Object[]} connectedComponents
 */

export function components(graph, func) {
  const visitedNodes = new Set();
  let connectedComponents = [];

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

  connectedComponents = connectedComponents.map((tree) => {
    tree.nodes = tree.getNodesWithEdges();
    return tree;
  });
  return connectedComponents.sort(({ nodes: nodesA }, { nodes: nodesB }) => {
    if (nodesA < nodesB) return 1;
    if (nodesA > nodesB) return -1;
    return 0;
  });
}
