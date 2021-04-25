/**
* @name catchEdges
* @description Receives a Buffer and returns an array with edges.
* @param {Buffer} Buffer - a Buffer
*/
export function catchEdges(Buffer) {
  const bufferAsString = Buffer.toString();
  const [qtdNodes, ...nestedEdges] = bufferAsString.split('\n');

  const edges = nestedEdges.map((edge) => edge.split(' ').map((node) => parseInt(node, 10)));

  return {
    edges: edges.filter(([node1, node2]) => Number.isInteger(node1) && Number.isInteger(node2)),
    qtdNodes,
  };
}
