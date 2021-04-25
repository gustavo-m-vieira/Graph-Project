/**
* @name countNodesWithEdges
* @description Return the number of nodes with edges.
* @param {Number[][]} graph - matrix
*/
export function countNodesWithEdges(graph) {
  let count = 0;
  graph.forEach((nodeArray) => {
    if (nodeArray.find((node) => node === 1)) count += 1;
  });

  return count;
}
