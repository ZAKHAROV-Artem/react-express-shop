import { observer } from "mobx-react-lite";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import { Context } from "../index";
import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { FaSearch } from "react-icons/fa";

const SideBar = observer(() => {
  const { device } = useContext(Context);

  const changeSelectedBrand = (brand) => {
    device.selectedBrands.includes(brand)
      ? device.removeFromSelectedBrands(brand)
      : device.addSelectedBrand(brand);
  };
  const changeSelectedType = (type) => {
    device.selectedTypes.includes(type)
      ? device.removeFromSelectedTypes(type)
      : device.addSelectedType(type);
  };

  return (
    <Accordion className="mb-3" defaultActiveKey="0" alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Categories</Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            {device.types.map((type) => {
              return (
                <ListGroup.Item
                  key={type.id}
                  onClick={() => changeSelectedType(type.id)}
                  active={device.selectedTypes.includes(type.id)}
                >
                  {type.name}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Brands</Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            {device.brands.map((brand) => {
              return (
                <ListGroup.Item
                  key={brand.id}
                  onClick={() => changeSelectedBrand(brand.id)}
                  active={device.selectedBrands.includes(brand.id)}
                >
                  {brand.name}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
});

export default SideBar;
