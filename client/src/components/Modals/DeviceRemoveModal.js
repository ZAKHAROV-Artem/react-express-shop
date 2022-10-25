import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { removeDevice } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";
const DeviceRemoveModal = observer((props) => {
  const [deviceId, setDeviceId] = useState("");
  const [error, setError] = useState("");
  const remove = () => {
    removeDevice(deviceId)
      .then(() => props.onHide())
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
          Remove device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Device id</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter device id"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
          />
        </Form>{" "}
        <span style={{ fontSize: "14px" }} className="text-danger">
          {error}
        </span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={remove}>
          Remove
        </Button>
        <Button variant="outline-primary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeviceRemoveModal;
