import React, { useContext, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../../utils/consts";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Context } from "../../index";
import Image from "react-bootstrap/Image";
import {
  createBasketDevice,
  isInBasket,
  removeBasketDevice,
} from "./../../http/basketAPI";
import { MdRemoveShoppingCart } from "react-icons/md";
import { observer } from "mobx-react-lite";
import useBasket from "../../hooks/basket";

const DeviceItem = observer(({ device }) => {
  const navigate = useNavigate();

  const [isInBasket, addToBasket, removeFromBasket] = useBasket(device.id);

  return (
    <Col md={4}>
      <Card className="mb-3">
        <Image
          style={{ width: "100%" }}
          src={process.env.REACT_APP_API_URL + device.img}
        />

        <Card.Body>
          <Card.Title>{device.name}</Card.Title>
          <Card.Text>{device.price}₴</Card.Text>
          <div className="d-flex justify-content-between">
            <Button
              variant="outline-dark"
              onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}
            >
              See more
            </Button>
            <Button
              variant="outline-dark"
              onClick={isInBasket ? removeFromBasket : addToBasket}
            >
              {isInBasket ? (
                <MdRemoveShoppingCart />
              ) : (
                <AiOutlineShoppingCart size={20} />
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
});

export default DeviceItem;
