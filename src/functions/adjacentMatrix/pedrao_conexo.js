// export function components(graph, func) {
//   const checker = (totalOfComponents, originalGraph) => originalGraph.every((v) => totalOfComponents.includes(v));
//   let components = new Set();
//   let setzin = set ();
//   let copiadografo = graph.copy();

//   while (!checker(components, graph)) {
//     const { visited } = func(graph);
//     components = new Set([...components, ...visited]);

//   }
// }

export function components(graph, func) {
  const nodes = new Set();
  const connectedComponents = [];
  for (let i = 1; i < graph.length; i += 1) nodes.add(i);

  const checker = (arrayofVisited) => arrayofVisited.forEach((visited) => nodes.remove(visited));
  for (const node of nodes) {
    const { visited, inducedTree } = func(node);
    connectedComponents.push(inducedTree);
    checker(visited);
  }
  return connectedComponents;
}
