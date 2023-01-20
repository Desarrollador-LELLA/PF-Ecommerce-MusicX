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