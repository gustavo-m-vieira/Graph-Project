/**
* @name calculateDiameter
* @description Calculate the diameter of the graph.
* @param {func} func - bfs function
* @param {Class} graph - Graph
*/
export function calculateDiameter(graph, func) {
  const { GraphStructure } = graph;
  const biggestLevels = [];
  for (let node = 1; node < GraphStructure.length; node += 1) {
    let { levels } = func({ sourceNode: node, graph });

    levels = levels.filter((level) => level);

    biggestLevels.push(Math.max.apply(null, levels));
  }
  return Math.max.apply(null, biggestLevels);
}
