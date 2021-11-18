export default class Estructura {
  constructor() {
    this._head = null;
    this._tail = null;
  }

  add(base) {
    if (this._head == null) {
      this._head = base;
      base._next = base;
      base._prev = base;
      this._tail = base;
      return true;
    } else if (!this.search(base.getName())) {
      base._next = this._head;
      base._prev = this._tail;
      this._tail._next = base;
      this._tail = base;
      this._head._prev = this._tail;
      console.log(this._head);
      console.log(base);
      return true;
    }
    return false;
  }

  search(nombre) {
    if (nombre == this._tail.getName()) {
      return this._tail;
    } else {
      let i = this._head;
      while (i._next != this._head) {
        if (i.getName() == nombre) {
          return i;
        }
        i = i._next;
      }
      return null;
    }
  }

  list() {
    if (this._head == null) {
      return "No hay bases en esta ruta";
    } else {
      return this._list(this._head);
    }
  }

  _list(node) {
    if (node == this._tail) {
      return node.info();
    } else {
      return `${node.info()} ${this._list(node._next)}`;
    }
  }

  listInv() {
    if (this._head == null) {
      return "No hay bases en esta ruta";
    } else {
      return this._listInv(this._tail);
    }
  }

  _listInv(node) {
    if (node == this._head) {
      return node.info();
    } else {
      return `${node.info()} ${this._listInv(node._prev)}`;
    }
  }
}
