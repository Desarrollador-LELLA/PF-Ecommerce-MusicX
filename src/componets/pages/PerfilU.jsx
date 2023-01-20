import React from "react"
import "../../css/perfil.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faPenToSquare, faImage, faEnvelope, faLock, faBook, faUserCheck} from '@fortawesome/free-solid-svg-icons'

const perfilUS = () => { 
    return (
        
        <section class="seccion-perfil-usuario">
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
                <h3 class="titulo">SERGIO BLANCO</h3>
                <p class="texto">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div class="perfil-usuario-footer">
                <ul class="lista-datos">
                    
                    
                    <li><i><FontAwesomeIcon icon={faUser} /></i> UsuarioID : </li>
                    <li><i><FontAwesomeIcon icon={faEnvelope} /></i> Correo: </li>
                    
                  
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
export default perfilUS;