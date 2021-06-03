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

    const vectorNodes = graph.memoryStructure === 'adjacent matrix' ? undefined : Object.keys(GraphStructure[u]);
    const length = graph.memoryStructure === 'adjacent matrix'
      ? GraphStructure[u].length : vectorNodes.length;

    for (let nodePosition = 0; nodePosition < length; nodePosition += 1) {
      let node;
      let weight;

      if (graph.memoryStructure === 'adjacent matrix') {
        // eslint-disable-next-line no-continue
        if (!GraphStructure[u][nodePosition]) continue;

        node = nodePosition;
        weight = GraphStructure[u][nodePosition];
      } else {
        node = vectorNodes[nodePosition];
        weight = GraphStructure[u][node];
      }

      if (cost[node] > weight) cost[node] = weight;
    }
  }
}
