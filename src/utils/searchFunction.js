export const filterProducts = (
  {
    opDesc,
    opAsce,
    opAZ,
    opZA,
    opSinOrden,
    search,
    generos,
    keyF,
    bpmMin,
    bpmMax,
    precioMin,
    precioMax,
  },
  lista
) => {
  let nuevaLista = lista.slice();

  if (search != "undefined") {
    let swich = false;
    let arrauxFinal = [];
    let arrString = search.replaceAll("%20", " ").trim().split("");

    arrString.map((ele) => {
      if (ele == " " && swich == false) {
        arrauxFinal.push(ele);
        swich = true;
      } else if (ele !== " ") {
        arrauxFinal.push(ele);
        swich = false;
      }
    });
    let stringFromArr = arrauxFinal.toString().toLowerCase();
    let finalString = stringFromArr.replace(/,/g, "");
    nuevaLista = nuevaLista.filter((ele) => {
      return (
        ele.nombre.toLowerCase().includes(finalString) ||
        ele.autor.toLowerCase().includes(finalString) ||
        ele.descripcion.toLowerCase().includes(finalString)
      );
    });
  }
  if (generos.length) {
    nuevaLista = nuevaLista.filter((x) => {
      return generos.every((p) => {
        return x.genero?.includes(p);
      });
    });
  }
  if (keyF) {
    if (keyF === "All") {
    } else if (keyF) {
      nuevaLista = nuevaLista.filter((z) => {
        return z.key.includes(keyF);
      });
    }
  }
  if (bpmMin) {
    nuevaLista = nuevaLista.filter((x) => {
      return x.tiempo >= parseInt(bpmMin);
    });
  }
  if (bpmMax) {
    nuevaLista = nuevaLista.filter((x) => {
      return x.tiempo <= parseInt(bpmMax);
    });
  }
  if (precioMin) {
    nuevaLista = nuevaLista.filter((x) => {
      return x.licencias[0].precio >= parseInt(precioMin);
    });
  }
  if (precioMax) {
    nuevaLista = nuevaLista.filter((x) => {
      return x.licencias[0].precio <= parseInt(precioMax);
    });
  }

  if (opDesc) {
    nuevaLista.sort((a, b) => a.ataque - b.ataque);
  } else if (opAsce) {
    nuevaLista.sort((a, b) => b.ataque - a.ataque);
  } else if (opAZ) {
    nuevaLista.sort((a, b) => {
      if (b.nombre.toLowerCase() > a.nombre.toLowerCase()) {
        return -1;
      }
      if (b.nombre.toLowerCase() < a.nombre.toLowerCase()) {
        return 1;
      }
      return 0; //Array.prototype.sort() expects a value to be returned at the end of arrow function
    });
  } else if (opZA) {
    nuevaLista.sort((a, b) => {
      if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
        return -1;
      }
      if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
        return 1;
      }
      return 0; //Array.prototype.sort() expects a value to be returned at the end of arrow function
    });
  }
  if (opSinOrden) {
    return nuevaLista;
  }
  return nuevaLista;
};

export const busqueda = (lista, search) => {
  let nuevaLista = lista.slice();

  if (search) {
    nuevaLista = nuevaLista.filter((ele) => {
      return ele.nombre.toLowerCase().includes(search.toLowerCase());
    });
  }
  return nuevaLista;
};
