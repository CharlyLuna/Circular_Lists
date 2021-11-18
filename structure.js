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
}
