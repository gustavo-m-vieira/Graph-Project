# Graph-Project
## VER 2.0!
 Hello! We've upgraded our library to allow working with non-negative weighted graphs! The primary changes are:
 * __Polimorfism__: We've heard your complaints and now our library works properly with only 1 function for each functionality, no matter how the graph is represented (choices are still limited to 'adjacent vector' and 'adjacent matrix').
 * __Dijkstra Algorithm__: We now support finding minimum path and distance between nodes. For non-weighted graphs, BFS is used. Check out the [dijkstra algorithm](https://github.com/gustavo-m-vieira/Graph-Project/blob/main/src/functions/dijkstra.js)
 * __Excentricity__: What is maximum distance between a node and every other in a graph? You can find it out, alongside which node is the most distant one, [here](https://github.com/gustavo-m-vieira/Graph-Project/blob/ef8a98fcee7499b882332cc836532019fbfa47f8/src/classes/Graph.js#L226)
 * __Minimum Spanning Tree__ : 
 * __Test Example - Collaboration Network!__: We've gathered a graph from Ratton's website that represents a collaboration net. [here](https://github.com/gustavo-m-vieira/Graph-Project/blob/main/src/EstudoDeCaso/5-rede_colaboracao.js) you can check for yourself our library working! Although the collaboration net is old and doesn't represents the reality, it's pretty dense, requiring a lot of time to run through it.
 
 The new functionality of our Graph class can be found from lines [210 and below](https://github.com/gustavo-m-vieira/Graph-Project/blob/3b6cbd6ece36245d7128d4dab87887b31cbbf06c/src/classes/Graph.js#L210)
 
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
