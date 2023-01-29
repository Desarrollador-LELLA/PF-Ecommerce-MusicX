import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import style from "../../css/productoCreate.module.css";
import { db } from "../../firebaseInicial/firebase";
import { collection, addDoc, documentId } from "firebase/firestore";
import css from "../../css/detailproducto.module.css";

const ProductoCreate = () => {
  const tipoLicencias = [
    {
      nombre: "Licencia Tipo 1",
      descripcion: " Descricion para Licencia 1",
    },
    {
      nombre: "Licencia Tipo 2",
      descripcion: " Descricion para Licencia 2",
    },
    { nombre: "Licencia Tipo 3", descripcion: " Descricion para Licencia 3" },
  ];
  const [licencia, setLicencia] = useState({});
  const [LicenCreadas, setLicenCreadas] = useState([]);
  const [popUp, setPopUp] = useState({
    state: false,
  });
  const [EstadoTipoLi, setEstadoTipoLi] = useState(tipoLicencias);

  const navegar = useNavigate();
  const [producto, setProducto] = useState({
    nombre: "",
    autor: "",
    descripcion: "",
    precio: 0,
    key: "",
    tiempo: 0,
    imagen: "",
  });

  const [errores, setErrores] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ValidoProducto = ({
    nombre,
    autor,
    descripcion,
    precio,
    key,
    tiempo,
    imagen,
  }) => {
    const e = {};
    let valido = true;
    const regex = /^[0-9].*$/;

    if (nombre.toString().trim().length === 0) {
      e.nombre = "El nombre esta Vacio";
      valido = false;
    } else if (nombre.length > 30) {
      e.nombre = "El nombre no puede tener mas de 30 Caracteres";
      valido = false;
    }

    if (autor.toString().trim().length === 0) {
      e.autor = "El autor esta Vacio";
      valido = false;
    } else if (autor.length > 30) {
      e.autor = "El autor no puede tener mas de 30 Caracteres";
      valido = false;
    }

    if (descripcion.toString().trim().length === 0) {
      e.descripcion = "La descripcion esta vacio";
      valido = false;
    } else if (descripcion.length > 30) {
      e.descripcion = "La descripcion no puede tener mas de 30 Caracteres";
      valido = false;
    }

    if (key.toString().trim().length === 0) {
      e.key = "El Key esta vacio";
      valido = false;
    } else if (key.length > 30) {
      e.key = "El Key no puede tener mas de 30 Caracteres";
      valido = false;
    }

    if (regex.test(precio) !== true) {
      e.precio = "El precio debe ser un numero o decimal";
      valido = false;
    } else if (precio.value === 0) {
      e.precio = "El precio debe ser mayor a cero";
      valido = false;
    }

    if (tiempo.toString().trim().length === 0) {
      e.tiempo = "El Tiempo esta Vacio";
      valido = false;
    } else if (regex.test(tiempo) !== true) {
      e.tiempo = "El Tiempo debe ser un numero";
      valido = false;
    } else if (tiempo.value === 0) {
      e.tiempo = "El Tiempo debe ser mayor a cero";
      valido = false;
    }

    return { ...e, valido };
  };

  const handlePopUp = () => {
    setPopUp({
      state: !popUp.state,
    });
  };

  const handlerLicencia = (e) => {
    const { name, value } = e.target;
    console.log(name + value);
    setLicencia({
      ...licencia,
      [name]: value,
    });
    if (e.target.id === "ListaTipo") {
      const parrafo = document.getElementById("ParrafoDescripcion");
      tipoLicencias.forEach((element) => {
        if (element.nombre === e.target.value) {
          parrafo.innerHTML = element.descripcion;
        }
      });
    }
  };

  const handlerAgregarLicen = (e) => {
    const filtradoTipoLicencia = EstadoTipoLi.filter(
      (licen) => licen.nombre !== licencia.TipoLicencia
    );
    setEstadoTipoLi(filtradoTipoLicencia);
    setLicenCreadas([
      ...LicenCreadas,
      {
        ...licencia,
        descripcion: document.getElementById("ParrafoDescripcion").innerHTML,
      },
    ]);
    setLicencia({});
    handlePopUp();
  };

  const handlerEliminar = (e) => {
    console.log(e.target.value);
    const filtrado = LicenCreadas.filter(
      (licen) => licen.TipoLicencia !== e.target.id
    );
    setLicenCreadas(filtrado);
    switch (e.target.id) {
      case "Licencia Tipo 1":
        return setEstadoTipoLi([tipoLicencias[0], ...EstadoTipoLi]);
      case "Licencia Tipo 2":
        return setEstadoTipoLi([tipoLicencias[1], ...EstadoTipoLi]);
      case "Licencia Tipo 3":
        return setEstadoTipoLi([tipoLicencias[2], ...EstadoTipoLi]);
      default: {
        return;
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });

    setErrores(
      ValidoProducto({
        ...producto,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (errores.valido) {
        await addDoc(collection(db, "productos"), {
          ...producto,
          licencias: LicenCreadas,
          deshabilitado: false,
        });
        navigate("/producto_lista");
      }
    } catch (err) {
      console.log("Error generado :", err);
    }
  };

  return (
    <div>
      <Container className="my-3">
        <Card className={`${style.registroProducto} m-auto`}>
          <Form className="card card-body" onSubmit={(e) => handleSubmit(e)}>
            <div className={style.productoCreate_title}>
              Creacion de Producto (Admin)
            </div>
            <div className="form-group input-group input-group-text my-3 d-flex justify-content-between">
              <Form.Label>Nombre producto :</Form.Label>
              <Form.Control
                name="nombre"
                type="text"
                className={`${style.textbox}`}
                placeholder="Ingrese nombre producto"
                onChange={handleInputChange}
                isInvalid={!!errores.nombre}
              />
              <Form.Control.Feedback type={"invalid"}>
                {errores.nombre}
              </Form.Control.Feedback>
            </div>
            <div className="form-group input-group input-group-text my-3 d-flex justify-content-between">
              <Form.Label>Autor producto :</Form.Label>
              <Form.Control
                name="autor"
                type="text"
                className={`${style.textbox}`}
                placeholder="Ingrese autor producto"
                onChange={handleInputChange}
                isInvalid={!!errores.autor}
              />
              <Form.Control.Feedback type={"invalid"}>
                {errores.autor}
              </Form.Control.Feedback>
            </div>
            <div className="form-group input-group input-group-text my-3 d-flex justify-content-between">
              <Form.Label>Descripcion producto :</Form.Label>
              <Form.Control
                name="descripcion"
                type="text"
                className={`${style.textbox}`}
                placeholder="Ingrese descripcion producto"
                onChange={handleInputChange}
                isInvalid={!!errores.descripcion}
              />
              <Form.Control.Feedback type={"invalid"}>
                {errores.descripcion}
              </Form.Control.Feedback>
            </div>
            <div className="form-group input-group input-group-text my-3 d-flex justify-content-between">
              <Form.Label>Key producto :</Form.Label>
              <Form.Control
                name="key"
                type="text"
                className={`${style.textbox}`}
                placeholder="Ingrese key producto"
                onChange={handleInputChange}
                isInvalid={!!errores.key}
              />
              <Form.Control.Feedback type={"invalid"}>
                {errores.key}
              </Form.Control.Feedback>
            </div>
            <div className="form-group input-group input-group-text my-3 d-flex justify-content-between">
              <Form.Label>Precio producto :</Form.Label>
              <Form.Control
                name="precio"
                type="text"
                className={`${style.textbox}`}
                placeholder="Ingrese precio producto"
                onChange={handleInputChange}
                isInvalid={!!errores.precio}
              />
              <Form.Control.Feedback type={"invalid"}>
                {errores.precio}
              </Form.Control.Feedback>
            </div>
            <div className="form-group input-group input-group-text my-3 d-flex justify-content-between">
              <Form.Label>Tiempo producto :</Form.Label>
              <Form.Control
                name="tiempo"
                type="number"
                className={`${style.textbox}`}
                placeholder="Ingrese tiempo producto"
                onChange={handleInputChange}
                isInvalid={!!errores.tiempo}
              />
              <Form.Control.Feedback type={"invalid"}>
                {errores.tiempo}
              </Form.Control.Feedback>
            </div>
            <div className="form-group input-group input-group-text my-3 d-flex justify-content-between">
              <Form.Label>Imagen producto :</Form.Label>
              <Form.Control
                name="imagen"
                type="text"
                className={`${style.textbox} float-right`}
                placeholder="Ingrese url producto"
                onChange={handleInputChange}
                isInvalid={!!errores.imagen}
              />
              <Form.Control.Feedback type={"invalid"}>
                {errores.imagen}
              </Form.Control.Feedback>
            </div>

            <div className={css.divAgregarLicencias}>
              <Button className={`btn btn-secondary`} onClick={handlePopUp}>
                Agregar Licencia
              </Button>
              <div className={`${css.divLicencias} shadow-sm `}>
                <ListGroup>
                  {LicenCreadas?.map((obj, indx) => (
                    <div key={indx}>
                      <Card className={`${css.cardProducto}`}>
                        <Card.Body id={indx}>
                          <h4>{obj.TipoLicencia}</h4>
                          {`Descripcion: ${obj.descripcion} Valor: ${obj.precio}`}
                          <Button
                            name="boton"
                            className="float-end btn btn-primary"
                            id={obj.TipoLicencia}
                            onClick={handlerEliminar}
                          >
                            X
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </div>

            <div className="form-group input-group input-group-text my-3">
              <Button
                className={`${style.button} text-center btn btn-primary`}
                type="submit"
                variant="primary"
              >
                Registrar
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
      {
        // POP UP ----------- Ronaldo
      }
      <Modal show={popUp.state}>
        <ModalHeader>Incerta las Licencias</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tipo Licencia</Form.Label>
              <Form.Select
                id="ListaTipo"
                name="TipoLicencia"
                onChange={handlerLicencia}
              >
                <option>Seleccionar</option>
                {EstadoTipoLi?.map((licen) => (
                  <option>{licen.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Sube el archivo para tu licencia</Form.Label>
              <Form.Control
                onChange={handlerLicencia}
                name="archivo"
                type="file"
                size="sm"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Precio Licencia</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  onChange={handlerLicencia}
                  name="precio"
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Text>Col</InputGroup.Text>
              </InputGroup>
              <Form.Label>
                <p id="ParrafoDescripcion"></p>
              </Form.Label>
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              onClick={handlerAgregarLicen}
            >
              Agregar Licencia
            </Button>
            <Button variant="primary" type="button" onClick={handlePopUp}>
              Cerrar
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default ProductoCreate;
