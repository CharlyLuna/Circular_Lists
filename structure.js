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

  createCard(base, hour, time) {
    if (!this.search(base)) {
      return "Esta base no existe";
    }
    let count = 0;
    let stop = false;
    let min = 0;
    let parada = this.search(base)._next;
    let message = `(${base})>${this._timeFormat(hour, min)}`;

    while (count < time && !stop) {
      min += parada.getMinutes();
      message += ` (${parada.getName()})>${this._timeFormat(hour, min)}`;
      count += parada.getMinutes();
      parada = parada._next;
      console.log(count);
      //Si el tiempo para llegar a la sig parada es mayor al limite se acaba el recorrido;
      if (count + parada.getMinutes() > time) {
        stop = true;
      }
    }
    return message;
  }

  _timeFormat(hour, minutes) {
    //Añadimos condicion para cuando se inicie a las 24h se cambie a 0:00;
    if (hour == 24) {
      hour = 0;
    }
    if (minutes >= 60) {
      //En caso de que al sumar los minutos la hora sea igual a 24 se cambia a 0:00;
      if (hour + Math.trunc(minutes / 60) >= 24) {
        hour += Math.trunc(minutes / 60) - 24;
        minutes += -60 * Math.trunc(minutes / 60);
      } else {
        hour += Math.trunc(minutes / 60);
        minutes += -60 * Math.trunc(minutes / 60);
      }
    }
    //Se acomoda el formato de los minutos iniciando por 0;
    if (minutes.toString().length < 2) {
      return `${hour}:0${minutes}`;
    }
    return `${hour}:${minutes}`;
  }
}
