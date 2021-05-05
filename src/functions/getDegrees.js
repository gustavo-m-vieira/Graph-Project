/**
 * @name getDegrees
 * @description Gets information about the graph nodes' degrees
 * @param {Number[]} edges - an array of edges
 */

export function getDegrees(edges) {
  const degrees = {};

  for (const [node1, node2] of edges) {
    degrees[node1] = (degrees[node1] || 0) + 1;
    degrees[node2] = (degrees[node2] || 0) + 1;
  }

  const sortedDegreesArray = Object.values(degrees).sort((a, b) => a - b);
  const [lowestDegree] = sortedDegreesArray;
  const [highestDegree] = sortedDegreesArray.slice(-1);
  const averageDegree = sortedDegreesArray.reduce((a, b) => a + b, 0) / sortedDegreesArray.length;

  let medianDegree;
  if (sortedDegreesArray.length % 2 === 0) {
    medianDegree = (sortedDegreesArray[sortedDegreesArray.length / 2 - 1] + sortedDegreesArray[sortedDegreesArray.length / 2]) / 2.0;
  } else {
    medianDegree = sortedDegreesArray[Math.floor(sortedDegreesArray.length / 2)];
  }

  return {
    lowestDegree,
    highestDegree,
    medianDegree: medianDegree || undefined,
    averageDegree: averageDegree || undefined,
    degrees,
  };
}
