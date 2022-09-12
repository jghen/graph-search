//BFS - Breadth-First-Search
//DFS - Depth-First-Search
export default class Graph {
  #nodes;
  constructor() {
    this.#nodes = {};
  }

  addNode(node) {
    this.#nodes[node] = [];
  }

  addEdge(source, destination) {
    if (!this.#nodes[source] || !this.#nodes[destination]) {
      return false;
    }

    if (!this.#nodes[source].includes(destination)) {
      this.#nodes[source].push(destination);
    }

    if (!this.#nodes[destination].includes(source)) {
      this.#nodes[destination].push(source);
    }
  }

  showNodes() {
    console.log(this.#nodes);
  }

  getNodes() {
    return this.#nodes;
  }

  bfs(source, destination) {
    const queue = [source]; //initiate a queue with starting point source.
    const visited = {}; //map;

    const printColor = (person, iteration, neighbors) => {
      if (person === null) return;
      const personEl = document.getElementById(person.toLowerCase());

      setTimeout(() => {
        return (personEl.style.color = "red"); //current red
      }, iteration * 2000);

      if (visited[person]) {
        setTimeout(() => {
          return (personEl.style.color = "lightgrey"); //visited turn blue
        }, iteration * 2000 /* + neighbors.length * 1000 */ + 2000);
      }
    };

    const displayQueue = (queue, iteration) => {
      const q = queue.map((neighbors) => neighbors);
      const qEl = document.getElementById("queue");
      qEl.value = "";
      qEl.style.fontWeight = "700";
      setTimeout(() => {
        qEl.value = `[${q.join(", ")}]`;
      }, iteration * 2000);
    };

    let counter = 0;
    while (queue.length) {
      counter = counter + 1;

      let current = queue.shift();

      if (visited[current]) {
        continue;
      }
      if (current === destination) {
        setTimeout(() => {
          const finalPerson = document.getElementById(current.toLowerCase());
          finalPerson.style.color = "blue";
          finalPerson.style.fontWeight = "bold";
        }, counter * 2000);
        return true;
      }

      visited[current] = true;

      let neighbor = this.#nodes[current];
      printColor(current, counter, neighbor);

      for (let i = 0; i < neighbor.length; i++) {
        if (!queue.includes(neighbor[i]) && !visited[neighbor[i]]) {
          queue.push(neighbor[i]);
        }
      }
      displayQueue(queue, counter);
    }
    return false;
  }

  dfs(source, destination, visited = {}) {
    const printColor = (person, visitedPersons) => {
      if (person === null) return;
      const personEl = document.getElementById(person.toLowerCase());

      setTimeout(() => {
        return (personEl.style.color = "red");
      }, visitedPersons * 1000);
    };

    let names = [];
    for (const key in visited) {
      names.push(key);
    }
    printColor(source, names.length);

    if (source === destination) {
      setTimeout(() => {
        const finalPerson = document.getElementById(source.toLowerCase());
        finalPerson.style.color = "blue";
        finalPerson.style.fontWeight = "bold";
        finalPerson.style.marginLeft = "41px"; //to counter bold. Maybe translateX -1px?
      }, names.length * 1000);
      return true;
    }

    if (visited[source]) {
      return false;
    }

    visited[source] = true;

    const neighbors = this.#nodes[source];

    for (let i = 0; i < neighbors.length; i++) {
      if (this.dfs(neighbors[i], destination, visited)) {
        return true;
      }
    }
    return false;
  }
}
