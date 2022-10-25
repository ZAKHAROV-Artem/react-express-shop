import { useState, useEffect, useContext } from "react";
import { Context } from "../index";

import {
  createBasketDevice,
  getBasketId,
  removeBasketDevice,
  fetchOneBasketDevice,
  updateBasketDeviceCount,
} from "../http/basketAPI";

export default function useBasket(deviceId) {
  const { basket, user } = useContext(Context);
  const [isInBasket, setIsInBasket] = useState(false);
  const [count, setCount] = useState(0);

  const addToBasket = () => {
    createBasketDevice({ basketId: basket.basketId, deviceId })
      .then(() => {
        setIsInBasket(true);
      })
      .then(() =>
        basket.addBasketDevice({ basketId: basket.basketId, deviceId })
      );
  };
  const removeFromBasket = () => {
    removeBasketDevice({ basketId: basket.basketId, deviceId })
      .then(() => {
        setIsInBasket(false);
      })
      .then(() => basket.removeBasketDevice(deviceId));
  };
  const incrementCount = () => {
    updateBasketDeviceCount(count + 1, { basketId: basket.basketId, deviceId })
      .then(() => basket.incrementBasketDeviceCount(deviceId))
      .then(() => setCount(count + 1));
  };
  const decrementCount = () => {
    updateBasketDeviceCount(count - 1, { basketId: basket.basketId, deviceId })
      .then(() => basket.decrementBasketDeviceCount(deviceId))
      .then(() => setCount(count - 1));
  };
  useEffect(() => {
    if (!basket.basketId) {
      getBasketId(user.user.id)
        .then((data) => basket.setBasketId(data.id))
        .then(() => {
          fetchOneBasketDevice({ basketId: basket.basketId, deviceId }).then(
            (data) => {
              if (data) {
                setIsInBasket(true);
                setCount(data.count);
              }
            }
          );
        });
    } else {
      fetchOneBasketDevice({ basketId: basket.basketId, deviceId }).then(
        (data) => {
          if (data) {
            setIsInBasket(true);
            setCount(data.count);
          }
        }
      );
    }
  }, []);

  return [
    isInBasket,
    addToBasket,
    removeFromBasket,
    count,
    incrementCount,
    decrementCount,
  ];
}
