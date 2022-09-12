import Stack from "./stack.js";
import Queue from "./Queue.js";
import Graph from "./Graph.js";

const cars = new Stack();

//Stack: Works like stacking books. Add / remove from the start (or end).
console.log("Stack----------");
cars.push("Honda");
cars.push("Toyota");
cars.push("Mazda");
console.log(cars.getSize());
console.log(cars.pop());
console.log(cars.getSize());
console.log(cars);
console.log(cars.peek());
console.log(cars.isEmpty());

//Queue - add elements to the end  - remove from start .
console.log("Queue----------");

const people = new Queue();
people.enqueue("Bob");
people.enqueue("Ben");
people.enqueue("Linda");
people.enqueue("Sally");
console.log(people.getSize());
console.log(people.peek());
people.dequeue();
console.log(people);
console.log(people.getSize());

//Graph - nodes connected via edges. Edges can have weight ->find shortest path between nodes.
//BFS - Breadth-First-Search
//DFS - Depth-First-Search

// Sally ---  Tim     Jeff
//           / \      /
// John - Ann - Lee - Ron

let g = new Graph();

g.addNode("Sally");
g.addNode("Tim");
g.addNode("John");
g.addNode("Ann");
g.addNode("Lee");
g.addNode("Ron");
g.addNode("Jeff");

g.showNodes();
// Ann: []
// Jeff: []
// John: []
// Lee: []
// Ron: []
// Tim: []
// Sally: []

g.addEdge("Tim", "Sally");
g.addEdge("Tim", "Ann");
g.addEdge("Tim", "Lee");
g.addEdge("Ann", "John");
g.addEdge("Ann", "Lee");
g.addEdge("Ron", "Lee");
g.addEdge("Ron", "Jeff");

g.showNodes();
// Ann:  ['Tim', 'John', 'Lee']
// Jeff: ['Ron']
// John: ['Ann']
// Lee:  ['Tim', 'Ann', 'Ron']
// Ron:  ['Lee', 'Jeff']
// Tim:  ['Sally', 'Ann', 'Lee']
// Sally: ['Tim']

let names = [];
for (const key in g.getNodes()) {
  names.push(key);
}
// ------------ elements
const bfsBtn = document.querySelector("#bfs-btn");
const dfsBtn = document.querySelector("#dfs-btn");
const startBtn = document.querySelector("#start-btn");
const que = document.getElementById("show-queue");

// ------------ helper functions
const hideQueue = () => {
  if (que.style.display === "none") return;
  return que.classList.add("hide");
};
const showQueue = () => {
  if (que.style.display === "block") return;
  return que.classList.remove("hide");
};
hideQueue();

const resetNameColors = () => {
  names.map((person) => {
    const personEl = document.getElementById(person.toLowerCase());
    personEl.style.color = "black";
    personEl.style.fontWeight = "400";
  });
};

const toggleBfsBtn = () => {
  bfsBtn.style.opacity = "1";
  dfsBtn.style.opacity = "0.5";
  startBtn.textContent = "Start Search";
  resetNameColors();
  return;
};
toggleBfsBtn();

const toggleDfsBtn = () => {
  dfsBtn.style.opacity = "1";
  bfsBtn.style.opacity = "0.5";
  startBtn.textContent = "Start Search";
  hideQueue();
  resetNameColors();
  return;
};


const capitalize = (str) => str && str[0].toUpperCase() + str.slice(1);

// -------------- event functions
const startSearch = (e) => {
  const name1 = document.querySelector("#name1").value.toLowerCase();
  const name2 = document.querySelector("#name2").value.toLowerCase();

  const correctNames = names.filter((node) => {
    return node.toLowerCase() === name1 || node.toLowerCase() === name2;
  });

  if (correctNames.length !== 2) {
    alert("please enter any of the names from the graph above");
    return;
  }

  resetNameColors();
  
  if (bfsBtn.style.opacity === '1') {
    showQueue();
    return g.bfs(capitalize(name1), capitalize(name2));
  }
  return g.dfs(capitalize(name1), capitalize(name2));
};

bfsBtn.addEventListener("click", toggleBfsBtn);
dfsBtn.addEventListener("click", toggleDfsBtn);
startBtn.addEventListener("click", startSearch);
window.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === "Enter") {
    return startSearch();
  }
  return false;
});
