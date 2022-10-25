import { $authHost, $host } from ".";

export const createBasketDevice = async (basketDevice) => {
  const { data } = await $authHost.post("api/basket", basketDevice);
  return data;
};
export const removeBasketDevice = async (basketDevice) => {
  const { data } = await $authHost.post("api/basket/remove", basketDevice);
  return data;
};
export const fetchBasketDevices = async (basketId) => {
  const { data } = await $authHost.get("api/basket", {
    params: { basketId },
  });
  return data;
};
export const updateBasketDeviceCount = async (value, basketDevice) => {
  const { data } = await $authHost.put("api/basket", {
    value,
    ...basketDevice,
  });
  return data;
};

export const getBasketId = async (userId) => {
  const { data } = await $authHost.get("api/basket", { params: { userId } });
  return data;
};
export const fetchOneBasketDevice = async (basketDevice) => {
  const { data } = await $authHost.get("api/basket", {
    params: basketDevice,
  });

  return data;
};
