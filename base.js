export default class Base {
  constructor(name, minutes) {
    this._name = name.toUpperCase();
    this._minutes = minutes;
    this._next = null;
    this._prev = null;
  }

  info() {
    return `<div> <p>(${this._name})>${this._minutes}min</p></div>`;
  }
  getName() {
    return this._name;
  }
  getMinutes() {
    return this._minutes;
  }
}
