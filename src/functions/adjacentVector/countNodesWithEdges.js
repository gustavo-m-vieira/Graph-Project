/**
* @name countNodesWithEdges
* @description Return the number of nodes with edges.
* @param {Number[][]} graph - vector
*/
export function countNodesWithEdges(graph) {
  const nodeWithEdges = [];
  for (let index = 0; index < graph.length; index += 1) {
    if (graph[index].size) nodeWithEdges.push(index);
  }

  return {
    count: nodeWithEdges.length,
    nodeWithEdges,
  };
}
