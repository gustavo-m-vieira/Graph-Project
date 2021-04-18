/**
* @name catchEdges
* @description Receives a Buffer and returns an array with edges.
* @param {Buffer} Buffer - a Buffer
*/
export function catchEdges(Buffer) {
  const bufferAsString = Buffer.toString();
  const [, ...nestedEdges] = bufferAsString.split('\n');
  return nestedEdges.map((edge) => edge.split(' ').map((node) => parseInt(node, 10)));
}
