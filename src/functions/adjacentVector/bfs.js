/**
* @name calculateMinimumPath
* @description Calculates minimum path and its length.
* @param {Number} targetNode - final vertice
* @param {Number} sourceNode - initial vertice
* @param {Number[]} fathers - Array of node's fathers
*/
function calculateMinimumPath(targetNode, sourceNode, fathers) {
  const minimumPath = [];
  let currentNode = targetNode;
  while (currentNode !== sourceNode) {
    minimumPath.push(currentNode);
    currentNode = fathers[currentNode];
  }

  return {
    minimumPathSize: minimumPath.length,
    minimumPath: minimumPath.reverse(),
  };
}

/**
* @name bfs
* @description Runs Breadth First Search on a graph.
* @param {Number} s - start vertice
* @param {Set[]} graph - Graph
*/
export function bfs(s, graph, targetNode) {
  const visited = new Array(graph.length);

  let queue = [s];
  const fathers = new Array(graph.length);
  const levels = new Array(graph.length);
  levels[s] = 0;
  visited[s] = true;
  let foundNode;
  let minimumPath;
  let minimumPathSize;

  while (queue.length) {
    ([s, ...queue] = queue);

    for (const node of graph[s]) {
      if (!visited[node]) {
        queue.push(node);
        visited[node] = true;
        fathers[node] = s;
        levels[node] = levels[s] + 1;
        if (targetNode && node === targetNode) {
          foundNode = true;
          break;
        }
      }
    }

    if (targetNode && foundNode) break;
  }

  if (targetNode && foundNode) ({ minimumPath, minimumPathSize } = calculateMinimumPath(targetNode, s, fathers));

  return {
    minimumPath,
    foundNode,
    fathers,
    minimumPathSize,
    levels,
  };
}
