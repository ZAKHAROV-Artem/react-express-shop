import { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Context } from "..";
import TypeModal from "../components/Modals/TypeModal";
import BrandModal from "../components/Modals/BrandModal";
import DeviceModal from "../components/Modals/DeviceCreateModal";
import DeviceRemoveModal from "./../components/Modals/DeviceRemoveModal";

export default function Admin() {
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showDeviceCreateModal, setShowDeviceCreateModal] = useState(false);
  const [showDeviceRemoveModal, setShowDeviceRemoveModal] = useState(false);

  return (
    <Container>
      <h1>Welcome, Admin</h1>
      <Row>
        <Button
          variant="outline-dark"
          className="mt-3"
          onClick={() => setShowTypeModal(true)}
        >
          Add type
        </Button>
        <Button
          variant="outline-dark"
          className="mt-3"
          onClick={() => setShowBrandModal(true)}
        >
          Add brand
        </Button>
        <Button
          variant="outline-dark"
          className="mt-3"
          onClick={() => setShowDeviceCreateModal(true)}
        >
          Add device
        </Button>
        <Button
          variant="outline-dark"
          className="mt-3"
          onClick={() => setShowDeviceRemoveModal(true)}
        >
          Remove device
        </Button>
        <TypeModal
          show={showTypeModal}
          onHide={() => setShowTypeModal(false)}
        />
        <BrandModal
          show={showBrandModal}
          onHide={() => setShowBrandModal(false)}
        />
        {showDeviceCreateModal && (
          <DeviceModal
            show={showDeviceCreateModal}
            onHide={() => setShowDeviceCreateModal(false)}
          />
        )}
        <DeviceRemoveModal
          show={showDeviceRemoveModal}
          onHide={() => setShowDeviceRemoveModal(false)}
        />
      </Row>
    </Container>
  );
}
