# Graph-Project

## VER 2.0!

Hello! We've upgraded our library to allow working with non-negative weighted graphs! The primary changes are:

- **Polimorfism**: We've heard your complaints and now our library works properly with only 1 function for each functionality, no matter how the graph is represented (choices are still limited to 'adjacent vector' and 'adjacent matrix').
- **Dijkstra Algorithm**: We now support finding minimum path and distance between nodes. For non-weighted graphs, BFS is used. Check out the [dijkstra algorithm](https://github.com/gustavo-m-vieira/Graph-Project/blob/main/src/functions/dijkstra.js)
- **Excentricity**: What is maximum distance between a node and every other in a graph? You can find it out, alongside which node is the most distant one, [here](https://github.com/gustavo-m-vieira/Graph-Project/blob/ef8a98fcee7499b882332cc836532019fbfa47f8/src/classes/Graph.js#L226)
- **Minimum Spanning Tree**: Using Prim's algorithm, the library is now able to generate a file containing the generated Tree. Our new functionality also returns its cost. Check it out [here](https://github.com/gustavo-m-vieira/Graph-Project/blob/main/src/functions/prim.js)
- **Test Example - Collaboration Network!**: We've gathered a graph from Ratton's website that represents a collaboration net. [here](https://github.com/gustavo-m-vieira/Graph-Project/blob/main/src/EstudoDeCaso/5-rede_colaboracao.js) you can check for yourself our library working! Although the collaboration net is old and doesn't represent the reality, it's pretty dense, requiring a lot of time to run through it.

The new functionality of our Graph class can be found from lines [210 and below](https://github.com/gustavo-m-vieira/Graph-Project/blob/3b6cbd6ece36245d7128d4dab87887b31cbbf06c/src/classes/Graph.js#L210)

#### New functions:

#### Graph.dijkstraAlgorithm(startNode):

    Sets the graph properties 'dist' and 'prev'
    Dist : distance from startNode to every other. Key: node; Value: distance from startNode to node.
    Prev : object of 'fathers'. Whenever a node 'u' is analyzed, all its neighbors that havent been discovered will have prev[neighbor] = u.
    Key: node; Value: Parent of node;

#### Graph.getMinDistPath(startNode, targetNode):

    Finds the minimum distance and the minimum path between 2 the startNode and targetNode.
    If it's a weighted graph, it will call dijkstra's algorithm, if it's an unweighted graph, it will run a BFS search.
    Returns the distance between the startNode and targetNode.
    Returns the path between startNode and targetNode. Iterates over the 'Prev' object until the startNode is found.

#### Graph.getExcentricity(node)

    Returns the maximum distance from the node and also the most distant node.

#### Graph.getEdgeWeight(u, v)

    Returns the weight between nodes 'u' and 'v'.

#### Graph.getNodeNeighborhood(u):

    Returns all neighbors of node 'u'.

For instructions on how to use our library, [Go to the Bottom](#Botton)

## VER 1.0

Hello! This is our first practice project for the 'Graph Theory' course!

We got txt files from Ratton's website as inputs and we saved the outputs [here](https://github.com/gustavo-m-vieira/Graph-Project/tree/main/src/testFiles/testAnswerFiles)

The output contains detailed information about each graph component, as well as information about the nodes' degrees.
Due to computational problems (graph too large, better environments with more memory and processing power is necessary) we couldn't process grafo_5 and grafo_6.

Also, due to github's 100MB max repository space, we werent able to upload the test files (grafo_1,grafo_2,grafo_3...). If you want to test our library by yourself, make sure to write the correct path to the file that contains the graph to be analized [here at line 6](https://github.com/gustavo-m-vieira/Graph-Project/blob/main/src/scripts/main.js)

## How to use our library: <a name="Botton"></a>

Clone into our repository and run 'npm install' from the main folder, where 'package.json' is present, that will install all the dependencies the library currently uses.
For graph analysis, create a new instance of the class 'Graph', importing it from "src/classes/Graph.js"
