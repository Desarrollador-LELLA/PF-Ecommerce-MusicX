import React, { useState, useEffect } from "react";
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
import css from "../../css/detailproducto.module.css"; // import Ronaldo
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "../../css/productoCreate.module.css";
import { db, storage, allStor, stor } from "../../firebaseInicial/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getKeys } from "../../utils/keysActions";
import { getGeneros } from "../../utils/generosActions";
import { todosDocumentos } from "../../utils/metodosFirebase";

//      Subir imagenes    -   KUC
import {
  actualizaDocumento,
  crearDocumento,
  subirArchivoMetodo,
} from "../../utils/metodosFirebase";

const ProductoCreate = () => {
  //Estados Roanaldo -----------------------------
  const tipoLicencias = [
    {
      nombre: "Licencia Tipo 1",
      descripcion: "Esta licencia entregará al usuario un archivo .mp3",
    },
    {
      nombre: "Licencia Tipo 2",
      descripcion: "Esta licencia entregará al usuario un archivo .wav",
    },

    {
      nombre: "Licencia Tipo 3",
      descripcion:
        "Esta licencia entregará al usuario un archivo .zip o .rar descomprimible que contendrá la pista dividida en canales por stems",
    },
    {
      nombre: "Licencia Tipo 4",
      descripcion:
        "Esta licencia te permitirá obtener todas las credenciales y derechos sobre el beat con todos sus niveles de archivo",
    },
  ];
  const [EstadoTipoLi, setEstadoTipoLi] = useState(tipoLicencias);
  const [licencia, setLicencia] = useState({});
  const [LicenCreadas, setLicenCreadas] = useState([]);
  const [popUp, setPopUp] = useState({
    state: false,
  });
  const [archivo, setArchivo] = useState([]);
  //Estados Roanaldo fin-----------------------------

  const navegar = useNavigate();
  const [imagen, setImagen] = useState(null);

  const [producto, setProducto] = useState({
    nombre: "",
    autor: "",
    descripcion: "",
    key: "",
    tiempo: 0,
  });

  const [url, setURL] = useState(null);
  const [errores, setErrores] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  Aqui traigo los keys
  const [keys, setKeys] = useState([]);

  const llenarKeys = async () => {
    // const list = await getKeys();
    // setKeys(list);
  };

  //  Aqui traigo los generos
  const [generos, setGeneros] = useState([]);

  //  YO USO ESTO PARA CARGAR GENEROS, SI LA COPIE
  //  EN LA FUNCION DE GENEROS USAN COSAS COM SE LOADING Y ESO
  //  YO LA ARME DESDE CERO
  //  no, si yo copio y pego tendria que traerme un monton de cosas
  //  ENTONCES, MIRA ESTO

  const llenarGeneros = async () => {
    // const list = await getGeneros();
    // setGeneros(list);
    
    //  YO ME ACTUALICE EN LA TARDE
    //  TU MODIFICASTE METODOS FIREBASE ?
    
    let lista = [];
    const list = await todosDocumentos("generos", "nombre", null, false);
    setGeneros({ ...generos, lista: list.result});
  };


  //  Aqui cargale los selectbox
  useEffect(() => {
    llenarGeneros();
  }, []);

  //  Segundo ejemplo
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

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

  //-------------------------------handlers Roanldo comienza -----------------------------
  const handlePopUp = () => {
    setPopUp({
      state: !popUp.state,
    });
  };
  const handlerLicencia = (e) => {
    const { name, value } = e.target;
    setLicencia({
      ...licencia,
      [name]: value,
    });
    if (e.target.id === "ListaTipo") {
      const parrafo = document.getElementById("ParrafoDescripcion");
      tipoLicencias.forEach((element) => {
        if (element.nombre === e.target.value) {
          console.log("LINEA 173");
          parrafo.innerHTML = element.descripcion;
        }
      });
    }
  };
  const handlerAgregarLicen = (e) => {
    const filtradoTipoLicencia = EstadoTipoLi.filter(
      (licen) => {
        return licen.nombre !== licencia.TipoLicencia;
      }
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
    const filtrado = LicenCreadas.filter(
      (licen) => {
        return licen.TipoLicencia !== e.target.id;
      }
    );
    setLicenCreadas(filtrado);
    switch (e.target.id) {
      case tipoLicencias[0].nombre:
        return setEstadoTipoLi([tipoLicencias[0], ...EstadoTipoLi]);
      case tipoLicencias[1].nombre:
        return setEstadoTipoLi([tipoLicencias[1], ...EstadoTipoLi]);
      case tipoLicencias[2].nombre:
        return setEstadoTipoLi([tipoLicencias[2], ...EstadoTipoLi]);
      case tipoLicencias[3].nombre:
        return setEstadoTipoLi([tipoLicencias[3], ...EstadoTipoLi]);
      default: {
        return;
      }
    }
  };
  //-------------------------------handlers Roanldo termian -----------------------------

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

  const handleSubirImagen = async (e) => {
    setImagen(e.target.files[0]);
  };
  const handlerSbubirArchivo = async (e) => {
    await setArchivo([...archivo, e.target.files[0]]);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (errores.valido) {
        /*      TERCER CODIGO       */
        let prod = await crearDocumento("productos", {
          data: { ...producto },
        });

        const extension = imagen.type.substring(6, imagen.type.length);
        const extensionArchivo = archivo.map((archi) => {
          return archi.type.substring(6, archi.type.length);
        });
        let ruta = `productos/${prod.result.id}/beat.${extension}`;
        let rutaArchivo = extensionArchivo.map(
          (archi, i) => {
            return `productos/${prod.result.id}/${LicenCreadas[i].TipoLicencia}.${extensionArchivo[i]}`;
          } //[ruta1, ruta2]
        );

        subirArchivoMetodo(ruta, (url) => {
          actualizaDocumento("productos", prod.result.id, {
            data: { imagen: url },
          });
        });

        for (let i = 0; i < LicenCreadas.length; i++) {
          const uno = await subirArchivoMetodo(
            rutaArchivo[i],
            archivo[i],
            (url) => {
              LicenCreadas[i].url = url; // [url1 , url2 ]
            }
          );
        }
        const dos = await actualizaDocumento("productos", prod.result.id, {
          data: { licencias: LicenCreadas },
        });
      }
    } catch (err) {
      console.log("Error generado 2 :", err);
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
              <Form.Label>Genero producto :</Form.Label>

              <Form.Select name="genero" className={`${style.selectbox}`}>
                  <option hidden>Select genero</option>
                  <option value="All">All</option>
                  {
                      generos.length ?
                      generos.map(e => (
                          <option key={e.data().nombre} value={e.data().nombre}>
                              {e.data().nombre}
                          </option>
                      )) :
                      null
                  }
              </Form.Select>
            </div>
            <div className="form-group input-group input-group-text my-3 d-flex justify-content-between">
              <Form.Label>Key producto :</Form.Label>
              <Form.Select name="key" className={`${style.selectbox}`}>
                  <option hidden>Select key</option>
                  <option value="All">All</option>
                  {
                      keys.length ?
                      keys.map(e => (
                          <option key={e.data().nombre} value={e.data().nombre}>
                              {e.data().nombre}
                          </option>
                      )) :
                      null
                  }
              </Form.Select>
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
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleSubirImagen}
                />
                <br />
                <Form.Control.Feedback type={"invalid"}>
                    {errores.imagen}
                </Form.Control.Feedback>
            </div>
            {
              // LISTA DE LICENCIAS ------- RONALDO ----------------------------------------------------------------------
            }
            <div>
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
            {
              // LISTA DE LICENCIAS ------- RONALDO ----------------------------------------------------------------------
            }
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
                onChange={handlerSbubirArchivo}
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
            <div className="form-group input-group   d-flex justify-content-center">
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
            </div>
          </Form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default ProductoCreate;
