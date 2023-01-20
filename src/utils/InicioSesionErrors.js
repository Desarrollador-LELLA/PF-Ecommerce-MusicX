export const validateMail = (input) => {
  let errors = {};
  let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  if (!input.text) {
    errors.correo = "Debe ingresar un correo";
  } else if (input.text.split("")[0] === " ") {
    errors.correo = "No puedes utilizar espacios";
  } else if (!emailRegex.test(input.text)) {
    errors.correo = "Formato de correo invalido";
  }

  return errors;
};

export const validatePass = (input) => {
  let errors = {};

  if (input.password.length < 6 || input.password.length > 40) {
    errors.contraseña = "La contraseña debe contener de 6 a 40 caracteres";
  }

  return errors;
};


export const catchInicio = (error) => {
  const posiblesErrores = [
    {
      worngPass: "Firebase: Error (auth/wrong-password).",
      worngPassCatch: "Contraseña incorrecta.",
      noExist: "Firebase: Error (auth/user-not-found).",
      noExistCatch: "Aun no tienes una cuenta",
      manyAttemps:
        "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).",
      manyAttempsCatch:
        "Demasiados intentos fallidos, restaura tu contraseña o intentalo mas tarde.",
      invalidMail:"Firebase: Error (auth/invalid-email).",
      invalidMailCatch: "Formato de correo invalido"
    },
  ];

  const errorPass = posiblesErrores.find((x) => x.worngPass === error.message);
  const errorUsser = posiblesErrores.find((x) => x.noExist === error.message);
  const errorAttempts = posiblesErrores.find((x) => x.manyAttemps === error.message);
  const errorInvalidMail = posiblesErrores.find((x) => x.invalidMail === error.message);

  if (errorPass) {
    return errorPass.worngPassCatch;
  } else if (errorUsser) {
    return errorUsser.noExistCatch;
  } else if (errorAttempts) {
    return errorAttempts.manyAttempsCatch;
  }else if (errorInvalidMail) {
    return errorInvalidMail.invalidMailCatch;
  }

  return error.message;
};
