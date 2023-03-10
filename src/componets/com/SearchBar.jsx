import React, { useState } from "react";
import s from "../../css/SearchBar.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const [input, setInput] = useState();

  const onClick = (event) => {
    event.preventDefault();
    navigate(`/SearchProduct?${input}`)
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <Form onSubmit={onClick} className='me-3'>
      <InputGroup>
        <Form.Control
          onChange={handleChange}
          className={s.input}
          placeholder="Search Beat"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button
          onClick={onClick}
          variant="outline-secondary"
          id="button-addon2"
        >
          Find Beat
        </Button>
      </InputGroup>
    </Form>
  );
}
