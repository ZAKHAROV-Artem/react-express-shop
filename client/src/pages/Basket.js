import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Context } from "../index";

import { observer } from "mobx-react-lite";
import BasketItem from "./../components/BasketItem";
import NoData from "./../components/UI/NoData";
import { fetchBasketDevices, getBasketId } from "./../http/basketAPI";
const Basket = observer(() => {
  const { basket, user } = useContext(Context);
  useEffect(() => {
    getBasketId(user.user.id)
      .then((data) => basket.setBasketId(data.id))
      .then(() =>
        fetchBasketDevices(basket.basketId).then((data) =>
          basket.setBasketDevices(data)
        )
      );
  }, []);
  if (!basket.basketDevices.length) {
    return (
      <div className=" d-flex align-items-center justify-content-center">
        <NoData text="No items in the basket" size="45" />
      </div>
    );
  }
  return (
    <Container>
      {basket.basketDevices.map((item) => (
        <BasketItem key={item.id} deviceId={item.deviceId} />
      ))}
    </Container>
  );
});

export default Basket;
