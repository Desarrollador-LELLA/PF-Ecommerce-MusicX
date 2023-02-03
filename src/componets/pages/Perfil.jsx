import React, { useEffect, useState } from "react";
import "../../css/perfil.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPenToSquare, faEnvelope, faLock, faBook, faUserCheck, faCheck } from '@fortawesome/free-solid-svg-icons';
import { detalle_usuario_cliente } from "../../redux/actions/usuarioAction.js";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { actualizaDocumento, subirArchivoMetodo } from "../../utils/metodosFirebase";
import { Link } from "react-router-dom";
import ModalChangePas from "./ModalChangePas";

const Perfil = () => {
    const { usuarioAuth } = useSelector(state => state.auth);
    const [datosu, setDatosu] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dU();
    }, []);

    const dU = async () => {
        const wea = await detalle_usuario_cliente(usuarioAuth.id);
        setDatosu(wea.result);
    };

    const onchageavatar = async (e) => {
        const extension = e.target.files[0].type.substring(6, e.target.files[0].type.length);
        await subirArchivoMetodo(`usuarios/avatars/${usuarioAuth.id}/avatar.${extension}`, e.target.files[0], async (url) => {
            const uno = await actualizaDocumento('usuarios', usuarioAuth.id, { data: { imagen: url } })
            setDatosu({ ...datosu, imagen: url })
        })
    };

    return (
        <>
            <section className="seccion-perfil-usuario">
                <div className="perfil-usuario-header">
                    <div className="perfil-usuario-portada">
                        <div className="perfil-usuario-avatar">
                            <img src={datosu.imagen} alt="img-avatar" width={'166px'} height='166px' />
                            <button className="boton-avatar">
                                <i><FontAwesomeIcon icon={faPenToSquare} /></i>
                                <Form.Control
                                    style={{ opacity: 0 }}
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg"
                                    color="transparent"
                                    onChange={onchageavatar}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="perfil-usuario-body">
                    <div className="perfil-usuario-bio text-light">
                        <h3 className="titulo">{datosu.nombre + " " + datosu.apellido}</h3>
                        <p className="texto">{datosu.descripcion}</p>
                    </div>
                    <div className="perfil-usuario-footer text-light">
                        <ul className="lista-datos">
                            {datosu.rol === "Admin" && <li><i><FontAwesomeIcon icon={faUser} /></i> UsuarioID : {datosu.id} </li>}
                            <li><i><FontAwesomeIcon icon={faEnvelope} /></i> Correo: {datosu.correo}</li>
                            {datosu.rol === "Admin" && <li><i><FontAwesomeIcon icon={faCheck} /></i> Rol: {datosu.rol}</li>}
                        </ul>
                        <ul className="lista-datos">
                            <li><i><FontAwesomeIcon icon={faUserCheck} /></i> Registro: {datosu.fechaCreacion && new Date(datosu.fechaCreacion.seconds * 1000).toString()}</li>
                        </ul>

                        {datosu.rol === "Cliente" && <div className="boton-irABiblioteca">
                            <Link to="/bibloteca">
                                <button type="onClick" className="boton-biblioteca">
                                    <i><FontAwesomeIcon icon={faBook} /></i> Biblioteca
                                </button>
                            </Link>
                        </div>}
                        <div className="boton-editar-info">
                            <Link to={`/editarUsuario/${usuarioAuth.id}`}>
                                <button type="onClick" className="boton-editar" >
                                    <i><FontAwesomeIcon icon={faPenToSquare} /></i> editar
                                </button>
                            </Link>
                        </div>
                        <div className="boton-cambiar-P">
                            <button type="submit" className="boton-cambiarP" onClick={handleShow}>
                                <i><FontAwesomeIcon icon={faLock} /></i> cambiar contraseña
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <ModalChangePas show={show} handleClose={handleClose}/>
        </>
    );
};
export default Perfil;