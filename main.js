import Estructura from "./structure.js";
import Base from "./Base.js";
class App {
  constructor() {
    this._structure = new Estructura();
    this._btnAdd = document.getElementById("btnAdd");
    this._btnAdd.addEventListener("click", this.addProduct);
    this._btnSearch = document.getElementById("btnSearch");
    this._btnSearch.addEventListener("click", this.search);
    this._btnList = document.getElementById("btnList");
    this._btnList.addEventListener("click", this.list);
    this._btnListInv = document.getElementById("btnListInv");
    this._btnListInv.addEventListener("click", this.listInv);
  }

  addProduct = () => {
    let info = document.getElementById("info");
    let inpName = document.getElementById("txtName");
    let inpMin = document.getElementById("txtMinutes");

    let minutes = Number(inpMin.value);
    let name = inpName.value;
    // deben estar llenos todos los campos para que se puede crear el producto;
    if (name && Math.sign(minutes) > 0) {
      inpMin.value = "";
      inpName.value = "";
    } else {
      info.innerHTML +=
        "<h3>ERROR:Todos los campos deben llenarse para agregar la base y los minutos no pueden ser menor a 1</h3>";
      return;
    }
    let base = new Base(name, minutes);
    let added = this._structure.add(base);
    if (added) {
      info.innerHTML += `Base agregada: ${base.info()}`;
    } else {
      info.innerHTML +=
        "<h3>Esta base no puede ser agregada porque ya existe</h3>";
    }
  };

  search = () => {
    let info = document.getElementById("info");
    let name = document.getElementById("txtName").value.toUpperCase();
    let search = this._structure.search(name);
    if (search == null) {
      info.innerHTML += "<h3>Este nombre de base no se ha encontrado</h3>";
    } else {
      info.innerHTML += `<h3>Encontramos: ${search.info()} <h3>`;
    }
  };

  list = () => {
    let info = document.getElementById("info");
    info.innerHTML += `<p>LISTADO DE BASES: ${this._structure.list()}<p>`;
  };

  listInv = () => {
    let info = document.getElementById("info");
    info.innerHTML += `<p>LISTADO INVERTIDO DE BASES: ${this._structure.listInv()}<p>`;
  };
}
new App();
