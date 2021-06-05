import fs from 'fs';

function getMinorCost(visited, cost, nodes) {
  let minorCost = Infinity;
  let minorCostVertice = null;
  for (let node = 1; node <= nodes.length; node += 1) {
    if (cost[node] < minorCost && !visited[node]) {
      minorCost = cost[node];
      minorCostVertice = node;
    }
  }

  return minorCostVertice;
}

export function prim(graph, o, fileName) {
  const filePath = `./src/testFiles/testAnswerFiles/${fileName}`;

  const {
    GraphStructure,
    nodes,
  } = graph;

  const cost = new Array(GraphStructure.length);
  const parent = new Array(GraphStructure.length);

  for (const node of nodes) cost[node] = Infinity;

  const visited = new Array(GraphStructure.length);
  cost[o] = 0;
  parent[o] = -1;

  for (let index = 0; index < nodes.length; index += 1) {
    const u = getMinorCost(visited, cost, nodes);
    visited[u] = true;

    for (let node = 1; node <= nodes.length; node += 1) {
      if (GraphStructure[u][node] && !visited[node] && cost[node] > graph.getEdgeWeight(u, node)) {
        cost[node] = graph.getEdgeWeight(u, node);
        parent[node] = u;
      }
    }
  }

  console.log({
    visited,
    cost,
    parent,
  });

  let file = '';
  let jumpLine = false;
  for (let index = 1; index <= nodes.length; index += 1) {
    // eslint-disable-next-line no-continue
    if (parent[index] === -1) continue;
    if (jumpLine) file += '\n';
    file += `${parent[index]} ${index} ${graph.getEdgeWeight(index, parent[index])}`;
    jumpLine = true;
  }
  console.log({ file });
  fs.writeFileSync(filePath, file, {});
}
