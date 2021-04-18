import minimist from 'minimist';
import fs from 'fs';
import { createGraph as createGraphAsAnAdjacentArray } from '../functions/array';
import { createGraph as createGraphAsAMatrix } from '../functions/matrix';
import { catchEdges, getDegrees } from '../functions';

const { path } = minimist(process.argv.slice(2));

if (!path) {
  throw new Error('Missing required parameters: path. Try running again with --path param');
}

/**
* @name Main
* @description Main Function.
* @command npx -p @babel/core -p @babel/node babel-node --presets @babel/preset-env ./src/scripts/main.js --path {PATH}
*/
async function main() {
  const Buffer = fs.readFileSync(path);

  console.log({ BufferAsString: Buffer.toString() });

  const edges = catchEdges(Buffer);
  console.log({ edges });

  const {
    lowestDegree,
    highestDegree,
    medianDegree,
    averageDegree,
  } = getDegrees(edges);
  console.log({
    lowestDegree,
    highestDegree,
    medianDegree,
    averageDegree,
  });

  const graphAsArray = createGraphAsAnAdjacentArray(edges);
  console.log({ graphAsArray });

  const graphAsMatrix = createGraphAsAMatrix(edges);
  console.log({ graphAsMatrix });
}

main();
