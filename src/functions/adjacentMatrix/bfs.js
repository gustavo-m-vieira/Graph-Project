/**
* @name bfs
* @description Runs Breadth First Search on a graph.
* @param {Number} s - start vertice
* @param {Set[]} graph - Graph
*/

function findMinimumPath(sourceNode, targetNode, fathers) {
  const minimumPath = [];
  let currentNode = targetNode;
  while (currentNode !== sourceNode) {
    minimumPath.push(currentNode);
    currentNode = fathers[currentNode];
  }
  minimumPath.push(sourceNode);

  return {
    minimumPathSize: minimumPath.length,
    minimumPath: minimumPath.reverse(),
  };
}

export function bfs(sourceNode, graph, targetNode) {
  const size = graph.length;
  const visited = new Array(size);
  const fathers = new Array(size);
  const levels = new Array(size);
  fathers[sourceNode] = null;
  levels[sourceNode] = 0;
  let queue = [sourceNode];
  visited[sourceNode] = true;
  let foundNode = false;
  let currentNode;

  while (queue.length) {
    ([currentNode, ...queue] = queue);

    for (let node = 1; node <= graph.length; node += 1) {
      if (graph[currentNode][node]) {
        if (!visited[node]) {
          queue.push(node);
          visited[node] = true;
          levels[node] = levels[currentNode] + 1;
          fathers[node] = currentNode;
          if (targetNode && node === targetNode) {
            foundNode = true;
            break;
          }
        }
      }
    }
    if (targetNode && foundNode) {
      break;
    }
  }
  if (targetNode && foundNode) {
    return {
      ...findMinimumPath(sourceNode, targetNode, fathers),
      foundNode,
      fathers,
      levels,
    };
  }

  return {
    fathers,
    levels,
  };
}
