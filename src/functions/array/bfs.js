/**
* @name bfs
* @description Runs Breadth First Search on a graph.
* @param {Number} s - start vertice
* @param {Set[]} graph - Graph
*/
export function bfs(s, graph) {
  const size = graph.length;
  const visited = new Array(size + 1);

  let queue = [s];
  visited[s] = true;

  while (queue.length) {
    ([s, ...queue] = queue);

    for (const node of graph[s]) {
      if (!visited[node]) {
        queue.push(node);
        visited[node] = true;
      }
    }
  }
}
