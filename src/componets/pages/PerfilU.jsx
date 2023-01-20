import React, { useEffect, useState } from "react"
import "../../css/perfil.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faPenToSquare, faImage, faEnvelope, faLock, faBook, faUserCheck, faCheck} from '@fortawesome/free-solid-svg-icons'
import {detalle_usuario_cliente} from "../../redux/actions/usuarioAction.js"


const PerfilU = () => { 
    const [datosu, setDatosu] = useState({});
    useEffect(()=>{
        dU()
    
    
    }, [])
    const dU = async () => {
            setDatosu ( await detalle_usuario_cliente("1ksOKnusALXbuRmJkjYAcDS1H2E3"))
        
    
    
    }

    return (
        
        <section class="seccion-perfil-usuario">
            {console.log(datosu.data())}
        <div class="perfil-usuario-header">
            <div class="perfil-usuario-portada">
                <div class="perfil-usuario-avatar">
                    <img src="/img/logo1.png" alt="img-avatar"/>
                    <button type="button" class="boton-avatar">
                    <i><FontAwesomeIcon icon={faImage} /></i>
                    </button>
                </div>
                <button type="button" class="boton-portada">
                    <i><FontAwesomeIcon icon={faPenToSquare} /></i> Cambiar fondo
                </button>
            </div>
        </div>
        <div class="perfil-usuario-body">
            <div class="perfil-usuario-bio">
                <h3 class="titulo">{datosu.data().nombre + datosu.data().apellido}</h3>
                <p class="texto">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div class="perfil-usuario-footer">
                <ul class="lista-datos">
                    
                    
                    <li><i><FontAwesomeIcon icon={faUser} /></i> UsuarioID : {datosu.data().id} </li>
                    <li><i><FontAwesomeIcon icon={faEnvelope} /></i> Correo: {datosu.data().correo}</li>
                    <li><i><FontAwesomeIcon icon={faCheck} /></i> Rol: {datosu.data().rol}</li>
                  
                </ul>
                <ul class="lista-datos">
                    <li><i><FontAwesomeIcon icon={faUserCheck} /></i> Registro.</li>
                </ul>
                <div class="boton-irABiblioteca">
                <button type="button" class="boton-biblioteca">
                <i><FontAwesomeIcon icon={faBook} /></i> Biblioteca
               </button>
               </div>
               <div class="boton-editar-info">
                 <button type="button" class="boton-editar">
                    <i><FontAwesomeIcon icon={faPenToSquare} /></i> editar
                </button>
                </div>
                <div class="boton-cambiar-P">
                <button type="button" class="boton-cambiarP">
                <i><FontAwesomeIcon icon={faLock} /></i> cambiar contraseña
                </button>
                </div>
                
            </div>
            
        </div>
    </section>
    );
};
export default PerfilU;