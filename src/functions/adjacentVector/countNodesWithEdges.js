/**
* @name countNodesWithEdges
* @description Return the number of nodes with edges.
* @param {Number[][]} graph - vector
*/
export function countNodesWithEdges(graph) {
  let count = 0;
  graph.forEach((nodeSet) => {
    if (nodeSet.size) count += 1;
  });

  return count;
}
