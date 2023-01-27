export const erroresList = (error) => {
    const lista = [
        { recibido: 'Firebase: Error (auth/email-already-in-use).', mostrar: 'El Correo ya esta Registrado' },
    ];

    const hayError = lista.find(x => x.recibido === error.message);
    if (hayError) {
        return hayError.mostrar;
    }

    return error.message;
};

export const paginacion = (cantItems, paginaActual, items) => {
    const cantPaginas = Math.ceil(cantItems / items);
    const paginasBar = [
      1,
      paginaActual > 3 && cantPaginas > 5 ? true : false,
      cantPaginas >= 2
        ? paginaActual > 3 && cantPaginas > 4
          ? paginaActual - 1 > cantPaginas - 3
            ? cantPaginas - 3
            : paginaActual - 1
          : 2
        : false,
      cantPaginas >= 3
        ? paginaActual > 3 && cantPaginas > 4
          ? paginaActual > cantPaginas - 2
            ? cantPaginas - 2
            : paginaActual
          : 3
        : false,
      cantPaginas >= 4
        ? paginaActual > 3 && cantPaginas > 4
          ? paginaActual + 1 > cantPaginas - 1
            ? cantPaginas - 1
            : paginaActual + 1
          : 4
        : false,
      paginaActual < cantPaginas - 2 && cantPaginas > 5 ? true : false,
      cantPaginas >= 5 ? cantPaginas : false,
    ];
  
    const fin = paginaActual * items;
    const inicio = fin - items;
    return { paginasBar, inicio, fin, cantPaginas };
  };