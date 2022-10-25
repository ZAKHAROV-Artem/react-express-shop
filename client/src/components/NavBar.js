import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "./../index";
import { observer } from "mobx-react-lite";
import {
  SHOP_ROUTE,
  ADMIN_ROUTE,
  REGISTRAITON_ROUTE,
  LOGIN_ROUTE,
  BASKET_ROUTE,
} from "./../utils/consts";

const NavBar = observer(() => {
  const { user, device } = useContext(Context);
  const navigate = useNavigate();

  const logout = () => {
    device.setSelectedTypes([]);
    device.setSelectedBrands([]);
    user.setUser({});
    user.setIsAuth(false);

    localStorage.removeItem("token");
    navigate(LOGIN_ROUTE);
  };
  return (
    <Navbar bg="dark" variant="dark" className="mb-5">
      <Container>
        <NavLink to={SHOP_ROUTE} className="text-white">
          SHOP
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto">
            <Button
              variant="outline-light me-5"
              onClick={() => navigate(BASKET_ROUTE)}
            >
              Basket
            </Button>
            {user.user.role === "ADMIN" && (
              <Button
                variant="outline-light me-2"
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Admin
              </Button>
            )}

            <Button variant="light" onClick={logout}>
              Logout
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button
              variant="outline-light me-2"
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Login
            </Button>
            <Button
              variant="light"
              onClick={() => navigate(REGISTRAITON_ROUTE)}
            >
              Registration
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
