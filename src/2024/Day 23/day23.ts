import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

// Create a graph class to make things easier to read
class Graph {
  #edges: string[][];
  #nodes: string[];
  #graph: { [key: string]: string[] };

  constructor(input: InputType) {
    this.#edges = input.map((line) => line.split('-'));
    this.#nodes = [...new Set<string>(this.#edges.flat())];

    this.#graph = {};
    for (let [left, right] of this.#edges) {
      if (!this.#graph[left]) this.#graph[left] = [];
      this.#graph[left].push(right);

      if (!this.#graph[right]) this.#graph[right] = [];
      this.#graph[right].push(left);
    }
  }

  getEdges(): string[][] {
    return this.#edges;
  }

  adjacent(node: string) {
    return this.#graph[node];
  }

  // Check if two nodes form an edge
  hasEdge(a: string, b: string): boolean {
    return (
      this.#edges.filter((value) => value.join('-') === `${a}-${b}` || value.join('-') === `${b}-${a}`)?.length === 1
    );
  }

  getNodes(): string[] {
    return this.#nodes;
  }

  // Get all triangles, the given node forms
  getTriangles(node: string): string[][] {
    const combinations = this.#getCombinations(this.adjacent(node));
    const validCombiniations = combinations.filter((nodes) => this.hasEdge(nodes[0], nodes[1]));
    return validCombiniations.map((edge) => [node, ...edge].sort());
  }

  getGraph(): { [key: string]: string[] } {
    return this.#graph;
  }

  // Returns all possible combinations of the input, e.g. [1,2,3] => [[1,2][1,3][2,3]]
  #getCombinations(nodes: string[]): string[][] {
    let combinations: string[][] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        combinations.push([nodes[i], nodes[j]]);
      }
    }
    return combinations;
  }
}

export const partOne = (input: InputType): number => {
  const graph = new Graph(input);

  // Get all triangles of all nodes
  const triangles = graph
    .getNodes()
    .map((node) => graph.getTriangles(node))
    .flat();

  // Only consider the triangles, that contain nodes starting with 't'
  // Divide the length by three, because we have the same triangle three times in the array (one for each node)
  return triangles.filter((tri) => tri.some((n) => n.startsWith('t'))).length / 3;
};

export const partTwo = (input: InputType): string => {
  const graph = new Graph(input);

  // Get the all triangles for each node as before
  const triangles = graph.getNodes().map((node) => graph.getTriangles(node));

  // We want to search for the best clique (https://en.wikipedia.org/wiki/Clique_(graph_theory)).
  // That clique is the largest set of computers that are all connected to each other.
  // So we need to find the max number of triangles a node has
  // - that is the number of triangles we are looking for in each node
  let maxSizeOfTriangles = 0;
  for (let tris of triangles) {
    maxSizeOfTriangles = Math.max(maxSizeOfTriangles, tris.length);
  }

  // Filter out all triangles, that don't have the maximum size
  // Flatten the result with a depth of 2 so we get an array of all nodes, that are
  // not in the clique we are looking for.
  // Put it in a set so we get a distinct list.
  const notInMaxClique = new Set(triangles.filter((tris) => tris.length < maxSizeOfTriangles).flat(2));

  // Now all we have to do is filtering out all nodes, that are in the set we created above.
  return graph
    .getNodes()
    .filter((node) => !notInMaxClique.has(node))
    .sort((a, b) => a.localeCompare(b))
    .join(',');
};
