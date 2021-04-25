/**
* @name calculateDiameter
* @description Calculate the diameter of the graph.
* @param {func} func - bfs function
* @param {Set[]} graph - Graph
*/
export function calculateDiameter(graph, func) {
  const biggestLevels = [];
  for (let node = 1; node < graph.length; node += 1) {
    let { levels } = func({ sourceNode: node, graph });
    levels = levels.filter((level) => level);
    biggestLevels.push(Math.max.apply(null, levels));
  }
  return Math.max.apply(null, biggestLevels);
}
