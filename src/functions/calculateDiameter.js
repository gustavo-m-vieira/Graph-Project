export function calculateDiameter(graph, func) {
  const biggestLevels = new Array(graph.length);
  for (let node = 1; node <= graph.length; node += 1) {
    const { levels } = func(node, graph);
    biggestLevels.push(Math.max.apply(null, levels));
  }
  return Math.max.apply(null, biggestLevels);
}
