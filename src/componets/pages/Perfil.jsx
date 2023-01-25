import React, { useEffect, useState } from "react"
import "../../css/perfil.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPenToSquare, faImage, faEnvelope, faLock, faBook, faUserCheck, faCheck } from '@fortawesome/free-solid-svg-icons'
import { detalle_usuario_cliente } from "../../redux/actions/usuarioAction.js"
import { useSelector } from "react-redux"
import avatar from "../images/img-avatar.png"
import { Form } from "react-bootstrap"
import { mostrarImgen, subirArchivo } from "../../utils/metodosFirebase"


const Perfil = () => {


    const { usuarioAuth } = useSelector(state => state.auth)

    const [datosu, setDatosu] = useState({});
    const [avatar2, setAvatar2] = useState( {avatar} );

    useEffect(() => {
        dU();


    }, []);
    const dU = async () => {
        const wea = await detalle_usuario_cliente(usuarioAuth.id)
        setDatosu(wea.result)

        if (datosu.id) {
            const verfoto = await mostrarImgen(`usuarios/avatars/${datosu.id}`)
            
            setAvatar2({avatar: verfoto})
        }



    }
    const onchageavatar = async (e) => {
        
        await subirArchivo(e.target.files[0], datosu.id)
        

        if (datosu.id !== undefined) {
            const verfoto = await mostrarImgen(`usuarios/avatars/${datosu.id}`)
            setAvatar2(verfoto)
        }

    }


    return (

        <section className="seccion-perfil-usuario">
            {console.log(avatar2)}
            <div className="perfil-usuario-header">
                <div className="perfil-usuario-portada">
                    <div className="perfil-usuario-avatar">
                        <img src={avatar2.avatar} alt="img-avatar" />

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Default file input example</Form.Label>
                            <Form.Control type="file" accept="image/png, image/jpg, image/jpeg" onChange={onchageavatar} />
                        </Form.Group>
                        <button type="file" className="boton-avatar">
                            <i><FontAwesomeIcon icon={faImage} /></i>
                        </button>

                    </div>
                    <button type="button" className="boton-portada">
                        <i><FontAwesomeIcon icon={faPenToSquare} /></i> Cambiar fondo
                    </button>
                </div>
            </div>
            <div className="perfil-usuario-body">
                <div className="perfil-usuario-bio">
                    <h3 className="titulo">{datosu.nombre + " " + datosu.apellido}</h3>
                    <p className="texto">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="perfil-usuario-footer">
                    <ul className="lista-datos">


                        {datosu.rol === "Admin" && <li><i><FontAwesomeIcon icon={faUser} /></i> UsuarioID : {datosu.id} </li>}
                        <li><i><FontAwesomeIcon icon={faEnvelope} /></i> Correo: {datosu.correo}</li>

                        {datosu.rol === "Admin" && <li><i><FontAwesomeIcon icon={faCheck} /></i> Rol: {datosu.rol}</li>}

                    </ul>
                    <ul className="lista-datos">
                        <li><i><FontAwesomeIcon icon={faUserCheck} /></i> Registro: {datosu.fechaCreacion && new Date(datosu.fechaCreacion.seconds * 1000).toString()}</li>
                    </ul>
                    <div className="boton-irABiblioteca">
                        <button type="button" className="boton-biblioteca">
                            <i><FontAwesomeIcon icon={faBook} /></i> Biblioteca
                        </button>
                    </div>
                    <div className="boton-editar-info">
                        <button type="button" className="boton-editar">
                            <i><FontAwesomeIcon icon={faPenToSquare} /></i> editar
                        </button>
                    </div>
                    <div className="boton-cambiar-P">
                        <button type="button" className="boton-cambiarP">
                            <i><FontAwesomeIcon icon={faLock} /></i> cambiar contraseña
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
};
export default Perfil;