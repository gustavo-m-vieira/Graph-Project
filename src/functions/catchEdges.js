/**
* @name catchEdges
* @description Receives a Buffer and returns an array with edges.
* @param {Buffer} Buffer - a Buffer
*/

// Redefining prototype property 'equals' to be able to compare arrays
// In this case, length is always 2 (goal is to compare an array of edges) so this approach is cheap.
// eslint-disable-next-line no-extend-native
Array.prototype.equals = (array) => {
  if (!array) return false;
  if (this.length !== array.length) return false;
  for (let index = 0; index < this.length; index += 1) {
    if (this[index] !== array[index]) return false;
  }
  return true;
};

export function catchEdges(Buffer) {
  const bufferAsString = Buffer.toString();
  const [qtdNodes, ...nestedEdges] = bufferAsString.split('\n');

  let edges = nestedEdges.map((edge) => edge.split(' ').map((node) => parseInt(node, 10)));
  edges = edges.map((edge) => edge.sort());
  // current solution to remove repeated arrays in edges (EXPENSIVE)
  const edgesWithNorepetition = Array.from(new Set(edges.map(JSON.stringify)), JSON.parse);

  // Possible better solution using the overwritten Array.equals method: UNDER DEVELOPMENT!!
  // let edgesWithNoRepetition = edges.reduce((accumulator, currentArray) => {
  // }, []);
  return {
    edges: edgesWithNorepetition.filter(([node1, node2]) => Number.isInteger(node1) && Number.isInteger(node2)),
    qtdNodes,
  };
}
