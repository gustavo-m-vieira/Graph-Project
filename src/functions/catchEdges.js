/**
* @name catchEdges
* @description Receives a Buffer and returns an array with edges and its length.
* @param {Buffer} Buffer - a Buffer
*/
export function catchEdges(Buffer) {
  let graphHasWeights = false;
  const bufferAsString = Buffer.toString();
  const [qtdNodes, ...nestedEdges] = bufferAsString.split('\n');

  const edges = [];
  nestedEdges.forEach((edge) => {
    // eslint-disable-next-line prefer-const
    let [node1, node2, weight = 1] = edge.split(' ');

    weight = parseFloat(weight);
    if (weight !== 1.0) graphHasWeights = true;

    edges.push([node1, node2, weight]);
  });

  return {
    edges,
    qtdNodes,
    graphHasWeights,
  };
}
