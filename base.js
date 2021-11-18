export default class Base {
  constructor(name, minutes) {
    this._name = name.toUpperCase();
    this._minutes = minutes;
    this._next = null;
    this._prev = null;
  }

  info() {
    return `<div>(${this._name})>${this._minutes}min</div>`;
  }
  getName() {
    return this._name;
  }
  getMinutes() {
    return this._minutes;
  }
}
