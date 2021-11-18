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
    } else {
      base._next = this._head;
      base._prev = this._tail;
      this._tail._next = base;
      this._tail = base;
      this._head._prev = this._tail;
      console.log(this._head);
      console.log(base);

      return true;
    }
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
}
