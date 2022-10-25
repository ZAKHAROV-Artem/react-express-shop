import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Context } from "../../index";
import { AiFillDelete } from "react-icons/ai";
import { fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { createDevice } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";
const DeviceModal = observer((props) => {
  const { device } = useContext(Context);
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  const [brand, setBrand] = useState({});
  const [type, setType] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  const [paramTitle, setParamTitle] = useState("");
  const [paramDescription, setParamDescription] = useState("");
  const addInfo = () => {
    setInfo([
      ...info,
      { title: paramTitle, description: paramDescription, number: Date.now() },
    ]);
    setParamTitle("");
    setParamDescription("");
  };
  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };
  const deleteInfo = (number) => {
    setInfo(info.filter((item) => item.number !== number));
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("info", JSON.stringify(info));
    formData.append("brandId", brand.id);
    formData.append("typeId", type.id);
    console.log(name, price, brand.id, type.id, file, ...info);
    createDevice(formData).then((data) => props.onHide());
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
          Add new device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="d-flex">
            <Form.Select
              className="me-1"
              value={type.name || "Select type"}
              onChange={(e) => {
                setType({
                  id: e.target[e.target.options.selectedIndex].id,
                  name: e.target.value,
                });
                console.log(
                  e.target[e.target.options.selectedIndex].id,
                  e.target.value
                );
              }}
            >
              <option default disabled>
                Select type
              </option>
              {device.types.map((type) => (
                <option id={type.id} key={type.id}>
                  {type.name}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              className="ms-1"
              value={brand.name || "Select brand"}
              onChange={(e) =>
                setBrand({
                  id: e.target[e.target.options.selectedIndex].id,
                  name: e.target.value,
                })
              }
            >
              <option default disabled>
                Select brand
              </option>
              {device.brands.map((brand) => (
                <option id={type.id} key={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Row className="mt-3">
            <Col md={8}>
              <Form.Group>
                <Form.Label>Device name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Iphone 14 pro max"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Device price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formFile" className="mt-3">
            <Form.Label>Select device image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>
          <hr />
          <h4>Information</h4>
          <Row>
            <Col md={5}>
              <Form.Group>
                <Form.Label>Device parametr name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={paramTitle}
                  onChange={(e) => setParamTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group>
                <Form.Label>Device parametr value</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={paramDescription}
                  onChange={(e) => setParamDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Button className="align-self-end" onClick={addInfo}>
                Add
              </Button>
            </Col>
          </Row>
          {info.map((item) => (
            <Row key={item.number} className="mt-3">
              <Col md={5}>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, item.number)
                  }
                />
              </Col>
              <Col md={5}>
                <Form.Control
                  type="text"
                  placeholder="Value"
                  value={item.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, item.number)
                  }
                />
              </Col>
              <Col md={2}>
                <Button
                  variant="danger"
                  onClick={() => deleteInfo(item.number)}
                >
                  <AiFillDelete />
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={addDevice}>
          Add
        </Button>
        <Button variant="outline-primary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeviceModal;
