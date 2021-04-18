/**
* @name bfs
* @description Runs Breadth First Search on a graph.
* @param {Number} s - start vertice
* @param {Set[]} graph - Graph
*/
export function bfs(s, graph, targetNode) {
  const size = graph.length;
  const visited = new Array(size + 1);
  const fathers = new Array(size + 1);
  const levels = new Array(size);
  fathers[s] = null;
  levels[s] = 0;
  let queue = [s];
  visited[s] = true;

  while (queue.length) {
    ([s, ...queue] = queue);

    for (let node = 1; node <= graph.length; node += 1) {
      if (graph[s][node]) {
        if (!visited[node]) {
          queue.push(node);
          visited[node] = true;
          levels[node] = levels[s] + 1;
          fathers[node] = s;
          // if (targetNode &&)
        }
      }
    }
  }
}
