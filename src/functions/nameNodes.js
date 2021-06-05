export function nameNodes(Buffer) {
  const bufferAsString = Buffer.toString();
  const nestedEdges = bufferAsString.split('\n');
  const nodeToName = {};
  const nameToNode = {};
  nestedEdges.forEach((edge) => {
    const [node, name] = edge.split(',');
    nodeToName[node] = name;
    nameToNode[name] = node;
  });

  return {
    nameToNode,
    nodeToName,
  };
}
