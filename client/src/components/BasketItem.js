import { useState, useContext, useEffect } from "react";
import { fetchOneDevice } from "./../http/deviceAPI";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { TbSquarePlus, TbSquareMinus } from "react-icons/tb";
import { MdRemoveShoppingCart } from "react-icons/md";
import Button from "react-bootstrap/Button";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import useBasket from "../hooks/basket";

const BasketItem = observer(({ deviceId }) => {
  const [device, setDevice] = useState({});
  useEffect(() => {
    fetchOneDevice(deviceId).then((data) => setDevice(data));
  }, []);
  const [, , removeFromBasket, count, incrementCount, decrementCount] =
    useBasket(deviceId);

  return (
    <Card className="my-2">
      <Row className="m-2 justify-content-between">
        <Col md={4} className="d-flex justify-content-center">
          <Image
            style={{ width: "50%" }}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>
        <Col md={4} className="d-flex align-items-center">
          <div>
            <h3>{device.name}</h3>
            <h4>Price - {device.price}₴</h4>
            <h5>Rating - {device.rating}</h5>
          </div>
        </Col>
        <Col
          md={4}
          style={{ width: "fit-content" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="d-flex align-items-center mb-3">
            <Button
              variant="outline-dark"
              className="d-flex align-items-center p-0"
              onClick={incrementCount}
            >
              <TbSquarePlus size={45} className="m-0 p-0" />
            </Button>
            <div className="mx-3">{count}</div>
            <Button
              variant="outline-dark"
              className="d-flex align-items-center p-0"
              onClick={count > 1 ? decrementCount : undefined}
            >
              <TbSquareMinus size={45} className="m-0 p-0" />
            </Button>
          </div>
          <Button
            onClick={removeFromBasket}
            variant="outline-dark"
            className="d-flex align-items-center"
          >
            Remove from basket <MdRemoveShoppingCart className="ms-2" />
          </Button>
        </Col>
      </Row>
    </Card>
  );
});

export default BasketItem;
