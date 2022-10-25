import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { createBrand } from "../../http/deviceAPI";
const BrandModal = (props) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const addBrand = () => {
    createBrand({ name: value })
      .then((data) => {
        setValue("");
        props.onHide();
      })
      .catch((e) => setError(e.response.data.message));
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new brand
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Brand name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter brand name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form>
        <span style={{ fontSize: "14px" }} className="text-danger">
          {error}
        </span>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addBrand}>Ok</Button>
        <Button variant="outline-primary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BrandModal;
