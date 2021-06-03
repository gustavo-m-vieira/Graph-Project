import Heap from 'heap-js';

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
  const queue = new Heap(customComparator);
  // console.log(queue);

  const dist = {};
  const prev = {};
  // Starting node has a distance of 0
  dist[startNode.toString()] = 0;
  // For each node in the graph, start its distance to start node to infinity
  graph.nodes.forEach((node) => {
    node += 1;
    const key = node.toString();
    if (node !== startNode) {
      dist[key] = Infinity;
      prev[key] = null;
    }
    queue.push({ value: key, distance: dist[key] });
  });
  const explored = [];
  while (!queue.isEmpty()) {
    const u = queue.pop().value;
    const uKey = u.toString();
    explored.push(uKey);
    const neighbors = Object.keys(graph.getNodeNeighborhood(u));
    for (const neighbor of neighbors) {
      const neighborKey = neighbor.toString();
      if (!explored.includes(neighborKey)) {
        if (dist[neighborKey] > dist[uKey] + graph.getEdgeWeight(u, neighbor)) {
          queue.remove({ value: neighbor, distance: dist[neighborKey] });
          dist[neighborKey] = dist[uKey] + graph.getEdgeWeight(u, neighbor);
          queue.add({ value: neighbor, distance: dist[neighborKey] });
          prev[neighborKey] = u;
        }
      }
    }
  }
  return { dist, prev };
}
