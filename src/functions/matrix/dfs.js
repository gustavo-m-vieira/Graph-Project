/**
* @name dfs
* @description Runs Depth First Search on a graph.
* @param {Number} s - start vertice
* @param {Set[]} graph - Graph
*/
export function dfs(s, graph) {
  const visited = new Set();

  const dfsAux = (v) => {
    visited.add(v);

    for (let node = 1; node <= graph.length; node += 1) {
      if (graph[v][node]) {
        if (!visited.has(node)) dfsAux(node);
      }
    }
  };

  dfsAux(s);
}
