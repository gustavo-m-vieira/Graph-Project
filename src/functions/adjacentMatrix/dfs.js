/**
* @name dfs
* @description Runs Depth First Search on a graph.
* @param {Number} s - start vertice
* @param {Set[]} graph - Graph
*/
export function dfs(s, graph) {
  const visited = new Set();
  const fathers = new Array(graph.length);
  const levels = new Array(graph.length);
  levels[s] = 0;

  const dfsAux = (v) => {
    visited.add(v);

    for (let node = 1; node <= graph.length; node += 1) {
      if (graph[v][node]) {
        if (!visited.has(node)) {
          fathers[node] = v;
          levels[node] = levels[v] + 1;

          dfsAux(node);
        }
      }
    }
  };

  dfsAux(s);

  return {
    fathers,
    levels,
  };
}
