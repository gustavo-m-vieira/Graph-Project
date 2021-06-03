import heap from 'heap';

/**
 * @name dijkstra
 * @description run dijsktra algorithm on a non-negative weighted graph
 * @param {Class} graph - Graph
 * @param {Number} startNode
 * @returns {Object} dist - Key: value = node : Distance to node; prev - Key = node , Value = father of node
 */
export function dijkstra(graph, startNode) {
  // Checking if there is a negative weight in the graph
  graph.edges.forEach((edge) => {
    // Edge[2] represents the weight of the edge
    if (Number(edge[2]) < 0) {
      throw new Error('Dijkstra wont work properly on negative weights');
    }
  });
  // Creating custom comparator to be used in the heap structure
  const customComparator = ({ distance: a }, { distance: b }) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };
  // Starting heap, dist
  const queue = heap(customComparator);

  const dist = {};
  const prev = {};
  // Starting node has a distance of 0
  dist[startNode.toString()] = 0;
  // For each node in the graph, start its distance to start node to infinity
  graph.nodes.forEach((node) => {
    const key = node.toString();
    if (node !== startNode) {
      dist[key] = Infinity;
      prev[key] = null;
    }
    queue.push({ value: node, distance: dist[key] });
  });
  while (!queue.empty()) {
    const u = queue.pop().value;
    const uKey = u.toString();
    const neighbors = graph.neighbors(u);
    neighbors.forEach((neighbor) => {
      const neighborKey = neighbor.toString();
      if (dist[neighborKey] > dist[uKey] + graph.weight(u, neighbor)) {
        dist[neighborKey] = dist[uKey] + graph.weight(u, neighbor);
        prev[neighborKey] = u;
        queue.updateitem({ value: neighbor, distance: dist[neighborKey] });
      }
    });
  }
  return { dist, prev };
}
