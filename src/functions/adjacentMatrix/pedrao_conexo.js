/**
 *
 * @name components
 * @param {Array()} graph
 * @param {Function()} func
 * @returns {Object[]} connectedComponents
 */

export function components(graph, func) {
  const nodes = new Set();
  const connectedComponents = [];
  for (let i = 1; i < graph.length; i += 1) nodes.add(i);

  const checker = (arrayofVisited) => arrayofVisited.forEach((visited) => nodes.remove(visited));
  for (const node of nodes) {
    const { visited, inducedTree } = func(node);
    connectedComponents.push(inducedTree);
    checker(visited);
  }
  return connectedComponents.sort(({ nodes: nodesA }, { nodes: nodesB }) => {
    if (nodesA < nodesB) return 1;
    if (nodesA > nodesB) return -1;
    return 0;
  });
}
