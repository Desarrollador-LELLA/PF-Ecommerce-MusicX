import React from "react";
import ProductCards from "../com/ProductCards";
import s from "../../css/SearchProduct.module.css";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";

export default function SearchProduct() {
  const tester = useLocation();
    console.log(tester)
  return (
    <div>
      <h1 className={s.searched}>{!tester ? " ":tester.search.slice(1)}...</h1>
      <div className={s.dadcontainer}>
        <div className={s.filtercontainer}>
          <div>
            <h2 className={s.titlefilter}>Filtros</h2>
          </div>
          <div className={s.containerfilters}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Generos</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Check type="switch" id="custom-switch" label="Trap" />
                    <Form.Check type="switch" id="custom-switch" label="Hip-Hop"/>
                    <Form.Check type="switch" id="custom-switch" label="Rap" />
                    <Form.Check type="switch" id="custom-switch" label="Reggaeton"/>
                    <Form.Check type="switch" id="custom-switch" label="Lo-Fi"/>
                    <Form.Check type="switch" id="custom-switch" label="SynthWave"/>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>KEY</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Check type="switch" id="custom-switch" label="C" />
                    <Form.Check type="switch" id="custom-switch" label="D" />
                    <Form.Check type="switch" id="custom-switch" label="E" />
                    <Form.Check type="switch" id="custom-switch" label="F" />
                    <Form.Check type="switch" id="custom-switch" label="G" />
                    <Form.Check type="switch" id="custom-switch" label="A" />
                    <Form.Check type="switch" id="custom-switch" label="D" />
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>BPM</Accordion.Header>
                <Accordion.Body>
                  <Form.Label>Minimum BPM</Form.Label>
                  <Form.Range />
                  <Form.Label>Maximum BPM</Form.Label>
                  <Form.Range />
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
