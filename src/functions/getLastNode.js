/**
* @name getLastNode
* @description Receives an array of edges and return the last node, so we can create the array/matrix
* @param {Number[]} edges - an array of edges
*/
export function getLastNode(edges) {
  const nodes = new Set();
  edges.forEach(([node1, node2]) => {
    nodes.add(node1);
    nodes.add(node2);
  });

  let biggestValue = -1;

  nodes.forEach((node) => { if (node > biggestValue) biggestValue = node; });

  return biggestValue;
}
