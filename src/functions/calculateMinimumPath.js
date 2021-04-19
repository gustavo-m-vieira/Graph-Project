/**
* @name calculateMinimumPath
* @description Calculates minimum path and its length.
* @param {Number} targetNode - final vertice
* @param {Number} sourceNode - initial vertice
* @param {Number[]} fathers - Array of node's fathers
*/
export function calculateMinimumPath(targetNode, sourceNode, fathers) {
  const minimumPath = [];
  let currentNode = targetNode;
  while (currentNode !== sourceNode) {
    minimumPath.push(currentNode);
    currentNode = fathers[currentNode];
  }
  minimumPath.push(sourceNode);

  return {
    minimumPathSize: minimumPath.length,
    minimumPath: minimumPath.reverse(),
  };
}
