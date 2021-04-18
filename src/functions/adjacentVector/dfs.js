/**
* @name dfs
* @description Runs Depth First Search on a graph.
* @param {Number} s - start vertice
* @param {Set[]} graph - Graph
*/
export function dfs(s, graph) {
  const visited = new Set();
  const fathers = new Array(graph.length + 1);
  const levels = new Array(graph.length + 1);
  levels[s] = 0;

  const dfsAux = (v) => {
    visited.add(v);

    for (const node of graph[v]) {
      if (!visited.has(node)) {
        fathers[node] = v;
        levels[node] = levels[v] + 1;

        dfsAux(node);
      }
    }
  };

  dfsAux(s);

  return {
    fathers,
    levels,
  };
}
