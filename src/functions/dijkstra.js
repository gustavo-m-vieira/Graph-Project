import Heap from 'heap-js';
/**
 * @name dijkstra
 * @description run dijsktra algorithm on a non-negative weighted graph
 * @param {Class} graph - Graph
 * @param {Number} startNode
 * @returns {Object} dist - Key: value = node : Distance to node; prev - Key = node , Value = father of node
 */
export function dijkstra(graph, startNode) {
  console.log('Checking for edges with negative weights...');
  graph.edges.forEach((edge) => {
    // Edge[2] represents the weight of the edge
    if (Number(edge[2]) < 0) {
      throw new Error('Dijkstra wont work properly on negative weights');
    }
  });
  console.log('Done');
  // Creating custom comparator to be used in the heap structure
  const customComparator = ({ distance: a }, { distance: b }) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };
  // Creating custom comparator of objects:
  const objectComparator = (a, b) => {
    if (a.value === b.value) return true;
    return false;
  };
  // Starting heap, dist(distance) , prev(father of node), explored (whether the node has already been explored or not);
  const queue = new Heap(customComparator);
  const dist = {};
  const prev = {};
  const explored = {};
  // Starting node has a distance of 0
  dist[startNode.toString()] = 0;
  // For each node in the graph, start its distance to start node to infinity
  console.log('Initializing values for each node!');
  graph.nodes.forEach((node) => {
    const key = node.toString();
    if (node !== startNode) {
      dist[key] = Infinity;
      prev[key] = null;
    }
    queue.push({ value: key, distance: dist[key] });
    explored[key] = false;
  });
  console.log('Start of While loop!');
  while (!queue.isEmpty()) {
    const u = queue.pop().value;
    const uKey = u.toString();
    explored[uKey] = true;
    const neighbors = Object.keys(graph.getNodeNeighborhood(u));
    for (const neighbor of neighbors) {
      const neighborKey = neighbor.toString();
      if (explored[neighborKey] === false) {
        if (dist[neighborKey] > dist[uKey] + graph.getEdgeWeight(u, neighbor)) { // Condicao de dijkstra
          queue.remove({ value: neighborKey, distance: dist[neighborKey] }, objectComparator); // Atualizacao do heap e do vetor dist
          dist[neighborKey] = dist[uKey] + graph.getEdgeWeight(u, neighbor);
          queue.add({ value: neighbor, distance: dist[neighborKey] });
          prev[neighborKey] = u;
        }
      }
    }
  }
  return { dist, prev };
}
