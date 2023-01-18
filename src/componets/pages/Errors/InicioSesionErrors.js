export const validateMail=(input)=> {
    let errors= {}
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (!input.text){
        errors.correo = "Debe ingresar un correo"
    } else 
    if (input.text.split('')[0] === ' '){
        errors.correo = "No puedes utilizar espacios"
    }else
    if(!emailRegex.test(input.text)){
        errors.correo= "Error de formato -> micorreo@example.com"
    }

    return errors;
}

export const validatePass=(input)=> {
    let errors= {}

    if(input.password.length < 6){
        errors.contraseña = "Debe tener 6 cáracteres o mas"
    }

    return errors;
}
