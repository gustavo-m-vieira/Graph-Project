/**
* @name countNodesWithEdges
* @description Return the number of nodes with edges.
* @param {Number[][]} graph - matrix
*/
export function countNodesWithEdges(graph) {
  const nodeWithEdges = [];
  for (let index = 0; index < graph.length; index += 1) {
    if (graph[index].find((node) => node === 1)) nodeWithEdges.push(index);
  }

  return {
    count: nodeWithEdges.length,
    nodeWithEdges,
  };
}
