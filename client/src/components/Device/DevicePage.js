import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbSquareMinus, TbSquarePlus } from "react-icons/tb";
import Button from "react-bootstrap/Button";
import { fetchOneDevice } from "./../../http/deviceAPI";
import { observer } from "mobx-react-lite";
import useBasket, { useCount } from "./../../hooks/basket";
import { MdRemoveShoppingCart } from "react-icons/md";

import NotFoundPage from "../../pages/NotFoundPage";

const DevicePage = observer(() => {
  const [device, setDevice] = useState({});
  useEffect(() => {
    fetchOneDevice(id)
      .then((data) => setDevice(data))
      .catch((e) => e.response.status === 404 && setError("Can't find device"));
  }, []);

  const { id } = useParams();
  const [error, setError] = useState("");
  const [
    isInBasket,
    addToBasket,
    removeFromBasket,
    count,
    incrementCount,
    decrementCount,
  ] = useBasket(id);

  if (error) {
    return <NotFoundPage text={error} />;
  }
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card>
            {" "}
            <Image
              style={{ width: "100%" }}
              src={process.env.REACT_APP_API_URL + device.img}
            />
          </Card>
        </Col>
        <Col md={8}>
          <div>
            <h1>{device.name}</h1>
            <h4>Price - {device.price}₴</h4>
            <h5>Rating - {device.rating}</h5>
          </div>
          <div className="mt-5">
            {isInBasket && (
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
            )}
            <Button
              variant="outline-dark"
              onClick={isInBasket ? removeFromBasket : addToBasket}
            >
              {isInBasket ? (
                <>
                  Remove from basket <MdRemoveShoppingCart className="ms-2" />
                </>
              ) : (
                <>
                  Add to basket
                  <AiOutlineShoppingCart className="ms-2" size={20} />
                </>
              )}
            </Button>
          </div>
        </Col>
      </Row>
      <div className="mt-5">
        <h2 className="mb-5">Сharacteristics</h2>
        {device.info?.map((item) => (
          <div key={item.id}>
            <Row>
              <Col>{item.title}</Col>
              <Col>{item.description}</Col>
            </Row>
            <hr />
          </div>
        ))}
      </div>
    </Container>
  );
});

export default DevicePage;
