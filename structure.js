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
      return true;
    }
    return false;
  }

  search(nombre) {
    if (this._head == null) {
      return null;
    }
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
    //En caso de que la primera parada ya exceda el tiempo limite,no se avanza a la parada;
    if (count + parada.getMinutes() > time) {
      stop = true;
    }
    while (count < time && !stop) {
      min += parada.getMinutes();
      message += ` (${parada.getName()})>${this._timeFormat(hour, min)}`;
      count += parada.getMinutes();
      parada = parada._next;
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

  delete(name) {
    let aux = this._head;
    if (this._head == null) {
      return null;
    }
    //Cuando se quiera eliminar el inicio y sea el unico que hay;
    if (name == this._head.getName() && this._head._next == this._head) {
      this._head = null;
      this._tail = null;
      return aux;
    } else if (name == this._head.getName()) {
      //Cuando se quiera eliminar el primero
      this._tail._next = this._head._next;
      this._head._next._prev = this._tail;
      this._head._next = null;
      this._head._prev = null;
      this._head = this._tail._next;
      return aux;
    } else {
      return this._delete(name, this._head);
    }
  }

  _delete(name, node) {
    if (node == this._tail && node.getName() == name) {
      //Cuando se va a eliminar el ultimo
      node._prev._next = this._head;
      this._head._prev = node._prev;
      this._tail = node._prev;
      node._next = null;
      node._prev = null;
      return node;
    } else if (node.getName() == name) {
      node._prev._next = node._next;
      node._next._prev = node._prev;
      node._next = null;
      node._prev = null;
      return node;
    } else if (node._next == this._head) {
      //Cuando ya hayamos llegado al final y no se encontro el id;
      return null;
    } else {
      return this._delete(name, node._next);
    }
  }
}
