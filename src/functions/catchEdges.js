/**
* @name catchEdges
* @description Receives a Buffer and returns an array with edges.
* @param {Buffer} Buffer - a Buffer
*/
export function catchEdges(Buffer) {
  const bufferAsString = Buffer.toString();
  const [qtdNodes, ...nestedEdges] = bufferAsString.split('\n');

  const edges = nestedEdges.map((edge) => {
    const nodes = edge.split(' ');
    if ((nodes.length === 2) && (nodes[0] > nodes[1])) return `${nodes[1]} ${nodes[0]}`;
    return edge;
  });

  const filteredEdges = [...new Set(edges)].map((edge) => edge.split(' ').map((node) => parseInt(node, 10)));

  return {
    edges: filteredEdges.filter(([node1, node2]) => Number.isInteger(node1) && Number.isInteger(node2)),
    qtdNodes,
  };
}
