import minimist from 'minimist';
import fs from 'fs';
import { catchEdges } from '../functions';

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

  return edges;
}

main();
