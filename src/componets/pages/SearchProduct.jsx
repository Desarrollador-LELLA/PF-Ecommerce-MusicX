import React from "react";
import ProductCards from "../com/ProductCards";
import s from "../../css/SearchProduct.module.css";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc, faGaugeSimple, faMusic, faTag } from "@fortawesome/free-solid-svg-icons";
export default function SearchProduct() {
  const tester = useLocation();
  return (
    <div>
      <h1 className={s.searched}>{!tester ? " ":tester.search.slice(1)}...</h1>
      <div className={s.dadcontainer}>
        <div className={s.filtercontainer}>
          <div>
            <h2 className={s.titlefilter}>Filtros</h2>
          </div>
          <div className={s.containerfilters}>
            <Accordion className={s.acordion} defaultActiveKey="0">
              <Accordion.Item className={s.acordion} eventKey="0">
                <Accordion.Header className={s.acordion}><FontAwesomeIcon icon={faCompactDisc}/> Generos</Accordion.Header>
                <Accordion.Body className={s.acordion} >
                  <Form className={s.acordion}>
                    <Form.Check type="switch" id="custom-switch" label="Trap" />
                    <Form.Check type="switch" id="custom-switch" label="Hip-Hop"/>
                    <Form.Check type="switch" id="custom-switch" label="Rap" />
                    <Form.Check type="switch" id="custom-switch" label="Reggaeton"/>
                    <Form.Check type="switch" id="custom-switch" label="Lo-Fi"/>
                    <Form.Check type="switch" id="custom-switch" label="SynthWave"/>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className={s.acordion} eventKey="1">
                <Accordion.Header><FontAwesomeIcon icon="fa-thin fa-piano" /><FontAwesomeIcon icon={faMusic}/>KEY</Accordion.Header>
                <Accordion.Body>
                <Form >
                  <Form.Select aria-label="Default select example">
                    <option hidden>Select KEY</option>
                    <option value="1">All</option>
                    <option value="2">C Maj</option>
                    <option value="3">C min</option>
                    <option value="4">C# Maj</option>
                    <option value="5">C# min</option>
                    <option value="6">D Maj</option>
                    <option value="7">D min</option>
                    <option value="8">D# Maj</option>
                    <option value="9">D# min</option>
                    <option value="10">E Maj</option>
                    <option value="11">E min</option>
                    <option value="12">F Maj</option>
                    <option value="13">F min</option>
                    <option value="14">F# Maj</option>
                    <option value="15">F# min</option>
                    <option value="16">G Maj</option>
                    <option value="17">G min</option>
                    <option value="18">G# Maj</option>
                    <option value="19">G# min</option>
                    <option value="20">A Maj</option>
                    <option value="21">A min</option>
                    <option value="22">A# Maj</option>
                    <option value="23">A# min</option>
                    <option value="24">D Maj</option>
                    <option value="25">D min</option>
                    </Form.Select>
                    {/* <Form.Check type="switch" id="custom-switch" label="C Maj" />
                    <Form.Check type="switch" id="custom-switch" label="C min" />
                    <Form.Check type="switch" id="custom-switch" label="C# Maj" />
                    <Form.Check type="switch" id="custom-switch" label="C# min" />
                    <Form.Check type="switch" id="custom-switch" label="D Maj" />
                    <Form.Check type="switch" id="custom-switch" label="D min" />
                    <Form.Check type="switch" id="custom-switch" label="D# Maj" />
                    <Form.Check type="switch" id="custom-switch" label="D# min" />
                    <Form.Check type="switch" id="custom-switch" label="E Maj" />
                    <Form.Check type="switch" id="custom-switch" label="E min" />
                    <Form.Check type="switch" id="custom-switch" label="F Maj" />
                    <Form.Check type="switch" id="custom-switch" label="F min" />
                    <Form.Check type="switch" id="custom-switch" label="F# Maj" />
                    <Form.Check type="switch" id="custom-switch" label="F# min" />
                    <Form.Check type="switch" id="custom-switch" label="G Maj" />
                    <Form.Check type="switch" id="custom-switch" label="G min" />
                    <Form.Check type="switch" id="custom-switch" label="G# Maj" />
                    <Form.Check type="switch" id="custom-switch" label="G# min" />
                    <Form.Check type="switch" id="custom-switch" label="A Maj" />
                    <Form.Check type="switch" id="custom-switch" label="A min" />
                    <Form.Check type="switch" id="custom-switch" label="A# Maj" />
                    <Form.Check type="switch" id="custom-switch" label="A# min" />
                    <Form.Check type="switch" id="custom-switch" label="D Maj" />
                    <Form.Check type="switch" id="custom-switch" label="D min" /> */}
                </Form>
                </Accordion.Body>
              </Accordion.Item  >
              <Accordion.Item className={s.acordion} eventKey="2">
                <Accordion.Header> <FontAwesomeIcon icon={faGaugeSimple}/>BPM</Accordion.Header>
                <Accordion.Body>
                <Form.Control
                  type="number"
                  placeholder="Min"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"/>
                  <Form.Control
                  placeholder="Max"
                  type="number"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"/>
                </Accordion.Body>
              </Accordion.Item >
              <Accordion.Item className={s.acordion} eventKey="3">
                <Accordion.Header><FontAwesomeIcon icon={faTag}/>Precio</Accordion.Header>
                <Accordion.Body>
                <Form.Control
                  type="number"
                  placeholder="Min"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"/>
                  <Form.Control
                  placeholder="Max"
                  type="number"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"/>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <ProductCards />
      </div>
    </div>
  );
}
