//
export default class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item); //push to end
  }

  dequeue() {
    return this.items.shift(); //remove from start
  }

  peek() {
    if (this.items.length === 0) {
      return null;
    }
    return this.items[0]; //peek item at start
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.items.length === 0;
  }

}