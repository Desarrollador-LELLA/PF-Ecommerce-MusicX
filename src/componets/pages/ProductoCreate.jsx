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
  ButtonGroup,
  Spinner,
} from "react-bootstrap";
import css from "../../css/detailproducto.module.css"; // import Ronaldo
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "../../css/productoCreate.module.css";
import { unDocumentoCallback } from "../../utils/metodosFirebase";

//      Subir imagenes    -   KUC
import {
  actualizaDocumento,
  crearDocumento,
  subirArchivoMetodo,
} from "../../utils/metodosFirebase";
import { wait } from "@testing-library/user-event/dist/utils";

const ProductoCreate = () => {
  //    -------------------------------     Estados de Ronaldo -----------------------------
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

  const [addGeneros, setAddGeneros] = useState([]);
  const [archivo, setArchivo] = useState([]);
  const [audio, setAudio] = useState(null);
  const [loadingPro, setLoadingProducto] = useState(true);

  //    -------------------------------     Estados Ronaldo fin          -----------------------------

  //    -------------------------------     Handlers Ronaldo comienza     -----------------------------

  function validar() {
    const lista = document.getElementById("ListaTipo");
    const agregarArchivo = document.getElementById("AgregarArchivo");
    const precio = document.getElementById("Precio");
    const AgregarLicencia = document.getElementById("AgregarLicencia");
    const selector = document.getElementById("opSelector");
    AgregarLicencia.disabled = true;
    let aux = false;
    if (lista.value !== "Seleccionar") {
      agregarArchivo.disabled = false;
      selector?.remove();
    }

    if (!agregarArchivo.value) {
      AgregarLicencia.disabled = true;
    } else if (!precio.value) {
      AgregarLicencia.disabled = true;
    } else {
      AgregarLicencia.disabled = false;
      aux = true;
    }

    return aux;
  }

  const handlePopUp = () => {
    setPopUp({
      state: !popUp.state,
    });
  };

  const handlerLicencia = (e) => {
    validar();
    const { name, value } = e.target;
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
    if (!validar()) return alert("llene los campos");

    const filtradoTipoLicencia = EstadoTipoLi.filter((licen) => {
      return licen.nombre !== licencia.TipoLicencia;
    });

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
    const eliArchivo = archivo.filter(
      (obj, i) => i !== parseInt(e.target.value)
    );
    setArchivo(eliArchivo);

    const filtrado = LicenCreadas.filter((licen) => {
      return licen.TipoLicencia !== e.target.id;
    });
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

  const handlerAgregarGenero = (e) => {
    if (e.target.value === "All") return;
    setAddGeneros([...addGeneros, e.target.value]);
    setGeneros(generos.filter((gen) => gen.nombre !== e.target.value));
  };

  const handlerEliminarGenero = (e) => {
    setGeneros([...generos, { nombre: e.target.value }]);
    setAddGeneros(addGeneros.filter((genero) => genero !== e.target.value));
  };

  //    -------------------------------     Handlers Ronaldo terminan       -----------------------------

  //    -------------------------------     Codigo de Kenneth          ---------------------------------

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

  //    Aqui traigo los keys
  const [keys, setKeys] = useState([]);

  const llenarKeys = async () => {
    await unDocumentoCallback("keys", "dogKeys", (retorno) => {
      setKeys(retorno.result.keys);
    });
  };

  //    Aqui traigo los generos
  const [generos, setGeneros] = useState([]);

  const llenarGeneros = async () => {
    await unDocumentoCallback("generos", "docGenero", (retorno) => {
      setGeneros(retorno.result.generos);
    });
  };

  /*      Uso de useEffect         */
  useEffect(() => {
    //    Aqui cargale los selectbox
    llenarGeneros();
    llenarKeys();
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
    } else if (nombre.length > 50) {
      e.nombre = "El nombre no puede tener mas de 50 Caracteres";
      valido = false;
    }

    if (autor.toString().trim().length === 0) {
      e.autor = "El autor esta Vacio";
      valido = false;
    } else if (autor.length > 50) {
      e.autor = "El autor no puede tener mas de 50 Caracteres";
      valido = false;
    }

    if (descripcion.toString().trim().length === 0) {
      e.descripcion = "La descripcion esta vacio";
      valido = false;
    } else if (descripcion.length > 50) {
      e.descripcion = "La descripcion no puede tener mas de 50 Caracteres";
      valido = false;
    }

    if (!key) {
      e.key = "El Key esta vacio";
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

  //    Handlers de Producto

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

  const handleAudio = (e) => {
    setAudio(e.target.files[0]);
  };

  const handlerSbubirArchivo = async (e) => {
    await setArchivo([...archivo, e.target.files[0]]);
    validar();
  };

  //    AQui se registra el producto
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let dataImagen = "";
      let dataAudio = "";

      if (errores.valido) {
        setLoadingProducto(false);
        let prod = await crearDocumento("productos", {
          data: { ...producto, genero: addGeneros },
        });

        const extension = imagen.type.substring(6, imagen.type.length);
        const extensionAudio = audio.type.substring(6, audio.type.length);
        const extensionArchivo = archivo.map((archi) => {
          return archi.type.substring(6, archi.type.length);
        });

        let ruta = `productos/${prod.result.id}/beat.${extension}`;
        let rutaArchivo = extensionArchivo.map((archi, i) => {
          return `productos/${prod.result.id}/${LicenCreadas[i].TipoLicencia}.${extensionArchivo[i]}`;
        });
        console.log("rutas", rutaArchivo);
        await subirArchivoMetodo(ruta, imagen, (url) => {
          console.log("url imagen " + url);
          dataImagen = url;
        });

        let rutaAudio = `productos/${prod.result.id}/audio.${extensionAudio}`;
        await subirArchivoMetodo(rutaAudio, audio, (url) => {
          console.log("url audio " + url);
          dataAudio = url;
        });

        for (let i = 0; i < LicenCreadas.length; i++) {
          await subirArchivoMetodo(rutaArchivo[i], archivo[i], (url) => {
            console.log("url Archivo " + url);
            LicenCreadas[i].url = url; // [url1 , url2 ]
          });
        }

        await actualizaDocumento("productos", prod.result.id, {
          data: {
            imagen: dataImagen,
            audio: dataAudio,
            licencias: LicenCreadas,
          },
        });

        alert("Producto creado !!!");
        navegar("/producto_lista");
      }
    } catch (err) {
      setLoadingProducto(true);
      console.log("Error generado 2 :", err);
      alert("ocurrio un error, revisa todo los campos");
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
              <Form.Select
                name="genero"
                className={`${style.selectbox}`}
                onChange={handlerAgregarGenero}
              >
                <option hidden>Select genero</option>
                <option value="All">All</option>
                {generos.length
                  ? generos.map((e) => {
                      if (e.habilitado) {
                        return (
                          <option key={e.nombre} value={e.nombre}>
                            {e.nombre}
                          </option>
                        );
                      }
                      return false;
                    })
                  : null}
              </Form.Select>
            </div>
            <div>
              <ButtonGroup aria-label="Basic example">
                {addGeneros?.map((genero) => (
                  <Button
                    value={genero}
                    onClick={handlerEliminarGenero}
                    variant="secondary"
                  >
                    {`${genero} X`}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
            <div className="form-group input-group input-group-text my-3 d-flex justify-content-between">
              <Form.Label>Key producto :</Form.Label>
              <Form.Select
                name="key"
                className={`${style.selectbox}`}
                onChange={handleInputChange}
              >
                <option hidden>Select key</option>
                <option value="All">All</option>
                {keys.length
                  ? keys.map((e) => {
                      if (e.habilitado) {
                        return (
                          <option key={e.nombre} value={e.nombre}>
                            {e.nombre}
                          </option>
                        );
                      }
                      return false;
                    })
                  : null}
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
            <div className="form-group input-group input-group-text my-3 d-flex justify-content-between">
              <Form.Label>Audio Producto :</Form.Label>
              <Form.Control
                type="file"
                accept="audio/mp3 , audio/wav"
                onChange={handleAudio}
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
              <div className={`${css.divLicenciasCrear} shadow-sm `}>
                <ListGroup>
                  {LicenCreadas?.map((obj, indx) => (
                    <div key={indx}>
                      <Card className={`${css.cardProductoCrear}`}>
                        <Card.Body id={indx}>
                          <h4>{obj.TipoLicencia}</h4>
                          {`Descripcion: ${obj.descripcion} Valor: ${obj.precio}`}
                          <Button
                            name="boton"
                            className="float-end btn btn-primary"
                            id={obj.TipoLicencia}
                            onClick={handlerEliminar}
                            value={indx}
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
              {loadingPro ? (
                <Button
                  className={`${style.button} text-center btn btn-primary`}
                  type="submit"
                  variant="primary"
                >
                  Registrar
                </Button>
              ) : (
                <div>
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Creando...</span>
                  </Button>{" "}
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Creando...
                  </Button>
                </div>
              )}
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
                <option id="opSelector">Seleccionar</option>
                {EstadoTipoLi?.map((licen, i) => (
                  <option key={i}>{licen.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sube el archivo para tu licencia</Form.Label>
              <Form.Control
                id="AgregarArchivo"
                onChange={handlerSbubirArchivo}
                name="archivo"
                type="file"
                size="sm"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio Licencia</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  id="Precio"
                  onChange={handlerLicencia}
                  name="precio"
                  aria-label="Amount (to the nearest dollar)"
                  type="number"
                />
                <InputGroup.Text>Col</InputGroup.Text>
              </InputGroup>
              <Form.Label>
                <p id="ParrafoDescripcion"></p>
              </Form.Label>
            </Form.Group>
            <div className="form-group input-group   d-flex justify-content-center">
              <Button
                id="AgregarLicencia"
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
