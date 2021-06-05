function getMinorCost(vertices, cost) {
  let minorCost = Infinity;
  let minorCostVertice = null;
  for (const vertice in vertices.values()) {
    if (cost[vertice] < minorCost) {
      minorCost = cost[vertice];
      minorCostVertice = vertice;
    }
  }

  return minorCostVertice;
}

export function prim(graph, o) {
  const {
    GraphStructure,
    nodes,
  } = graph;

  const cost = new Array(GraphStructure.length);

  for (const node of nodes) cost[node] = Infinity;

  const vertices = new Set(nodes);
  const s = new Set();

  while (s.size !== nodes.length) {
    const u = getMinorCost(vertices, cost);
    s.add(u);

    const neighbors = graph.getNodeNeighborhood(u);

    for (const node in neighbors) {
      if (cost[node] > neighbors[node]) cost[node] = neighbors[node];
    }
  }
}
