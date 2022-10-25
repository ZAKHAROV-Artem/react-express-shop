import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideBar from "../components/SideBar";
import DeviceList from "../components/Device/DeviceList";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useContext, useEffect } from "react";

import Pages from "./../components/Pages";
import NoData from "./../components/UI/NoData";

const Shop = observer(() => {
  const { device } = useContext(Context);
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, device.page, device.limit).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchDevices(
      device.selectedBrands,
      device.selectedTypes,
      device.page,
      device.limit
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.selectedBrands, device.selectedTypes, device.page, device.limit]);

  return (
    <Container>
      <Row>
        <Col md={3}>
          <SideBar />
        </Col>
        <Col md={9}>
          {device.devices.length ? <DeviceList /> : <NoData />}

          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
