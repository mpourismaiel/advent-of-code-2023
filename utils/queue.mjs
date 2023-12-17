export class PriorityQueue {
  constructor(compare) {
    this._items = [];
    this._compare = compare;
  }

  push(item) {
    let child = this._items.push(item) - 1;
    // Satisfy heap by recursively comparing to parent node.
    while (child !== 0) {
      const parent = (child - 1) >>> 1;
      if (this._priority(parent, child) === parent) {
        break;
      }
      this._swap(parent, child);
      child = parent;
    }
  }

  pop() {
    const length = this._items.length;
    if (length !== 0) {
      this._swap(0, length - 1);
      const result = this._items.pop();
      // Satisfy heap by recursively comparing to child nodes.
      let parent = 0;
      while (true) {
        const child = (parent << 1) + 1;
        const high = this._priority(this._priority(parent, child), child + 1);
        if (high === parent) {
          break;
        }
        this._swap(parent, high);
        parent = high;
      }
      return result;
    }
  }

  _priority(parent, child) {
    return child < this._items.length &&
      this._compare(this._items[parent], this._items[child]) > 0
      ? child
      : parent;
  }

  _swap(parent, child) {
    const temp = this._items[parent];
    this._items[parent] = this._items[child];
    this._items[child] = temp;
  }

  get length() {
    return this._items.length;
  }

  peek() {
    return this._items[0];
  }
}
