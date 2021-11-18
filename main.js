import Estructura from "./structure.js";
import Base from "./Base.js";
class App {
  constructor() {
    this._structure = new Estructura();
    this._btnAdd = document.getElementById("btnAdd");
    this._btnAdd.addEventListener("click", this.addProduct);
    this._btnSearch = document.getElementById("btnSearch");
    this._btnSearch.addEventListener("click", this.search);
  }

  addProduct = () => {
    let info = document.getElementById("info");
    let inpName = document.getElementById("txtName");
    let inpMin = document.getElementById("txtMinutes");

    let minutes = Number(inpMin.value);
    let name = inpName.value;
    // deben estar llenos todos los campos para que se puede crear el producto;
    if (name && Math.sign(minutes) !== -1) {
      inpMin.value = "";
      inpName.value = "";
    } else {
      info.innerHTML +=
        "<h3>ERROR:Todos los campos deben llenarse para agregar la base y los minutos no pueden ser negativos</h3>";
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
      info.innerHTML += "<h3>Este codigo de producto no se ha encontrado</h3>";
    } else {
      info.innerHTML += `<h3>Encontramos: ${search.info()} <h3>`;
    }
  };
}
new App();
