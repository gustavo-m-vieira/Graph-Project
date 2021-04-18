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

    for (const node of graph[v]) {
      if (!visited.has(node)) dfsAux(node);
    }
  };

  dfsAux(s);
}
