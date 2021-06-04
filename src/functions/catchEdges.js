/**
* @name catchEdges
* @description Receives a Buffer and returns an array with edges and its length.
* @param {Buffer} Buffer - a Buffer
*/
export function catchEdges(Buffer) {
  const bufferAsString = Buffer.toString();
  const [qtdNodes, ...nestedEdges] = bufferAsString.split('\n');

  const edges = [];
  const edgesWithNoWeight = [];
  nestedEdges.forEach((edge) => {
    // eslint-disable-next-line prefer-const
    let [node1, node2, weight] = edge.split(' ');
    // if ((node1 > node2)) ([node1, node2] = [node2, node1]);

    // node1 = parseInt(node1, 10);
    // node2 = parseInt(node2, 10);
    weight = parseFloat(weight);

    // if (!edgesWithNoWeight.includes(`${node1} ${node2}`)) {
    // if (Number.isInteger(node1) && Number.isInteger(node2)) {
    // edgesWithNoWeight.push(`${node1} ${node2}`);
    edges.push([node1, node2, weight]);
    // }
    // }
  });

  return {
    edges,
    edgesWithNoWeight,
    qtdNodes,
  };
}
