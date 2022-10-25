import { makeAutoObservable } from "mobx";

export default class BasketStore {
  _basketId = 0;
  _basketDevices = [];

  constructor() {
    makeAutoObservable(this);
  }

  setBasketId(basketId) {
    this._basketId = basketId;
  }
  setBasketDevices(basketDevices) {
    this._basketDevices = basketDevices;
  }
  addBasketDevice(deviceId) {
    this._basketDevices = [
      ...this._basketDevices,
      { basketId: this._basketId, deviceId },
    ];
  }
  removeBasketDevice(deviceId) {
    this._basketDevices = this._basketDevices.filter(
      (item) => item.deviceId !== deviceId
    );
  }
  incrementBasketDeviceCount(id) {
    this._basketDevices = this._basketDevices.map((item) =>
      item.deviceId === id ? { ...item, count: item.count++ } : item
    );
  }
  decrementBasketDeviceCount(id) {
    this._basketDevices = this._basketDevices.map((item) =>
      item.id === id ? item.count-- : item
    );
  }

  get basketId() {
    return this._basketId;
  }
  get basketDevices() {
    return this._basketDevices;
  }
}
