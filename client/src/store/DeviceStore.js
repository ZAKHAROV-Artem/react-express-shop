import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._brands = [];
    this._types = [];
    this._devices = [];

    this._selectedTypes = [];
    this._selectedBrands = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    makeAutoObservable(this);
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setTypes(types) {
    this._types = types;
  }
  setDevices(devices) {
    this._devices = devices;
  }

  setSelectedTypes(types) {
    this._selectedTypes = types;
  }
  setSelectedBrands(brands) {
    this._selectedBrands = brands;
  }
  addSelectedType(type) {
    this._selectedTypes = [...this._selectedTypes, type];
    this.setPage(1);
  }
  addSelectedBrand(brand) {
    this._selectedBrands = [...this._selectedBrands, brand];
    this.setPage(1);
  }
  removeFromSelectedTypes(type) {
    this._selectedTypes = this._selectedTypes.filter((t) => t !== type);
    this.setPage(1);
  }
  removeFromSelectedBrands(brand) {
    this._selectedBrands = this._selectedBrands.filter((b) => b !== brand);
    this.setPage(1);
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }
  setLimit(limit) {
    this._limit = limit;
  }

  get page() {
    return this._page;
  }
  get totalCount() {
    return this._totalCount;
  }
  get limit() {
    return this._limit;
  }
  get brands() {
    return this._brands;
  }
  get types() {
    return this._types;
  }
  get devices() {
    return this._devices;
  }
  get selectedTypes() {
    return this._selectedTypes;
  }
  get selectedBrands() {
    return this._selectedBrands;
  }
}
