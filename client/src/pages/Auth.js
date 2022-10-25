import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Context } from "../index";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRAITON_ROUTE, SHOP_ROUTE } from "./../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLogin = pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = async (e) => {
    try {
      e.preventDefault();
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 10000);
    }
  };

  return (
    <Container
      style={{ height: "90vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Card style={{ width: "80%" }} className="p-4">
        <Form className="d-flex flex-column">
          <h2 className=" text-center ">
            {isLogin ? "Login" : "Registration"}
          </h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Form.Text className="text-muted">
              {error ? (
                <span className="text-danger">{error}</span>
              ) : (
                "We'll never share your email with anyone else."
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-between">
            <Form.Text>
              {isLogin ? (
                <>
                  Have not account yet?|
                  <NavLink to={REGISTRAITON_ROUTE}>Register</NavLink>
                </>
              ) : (
                <>
                  Alreade has an account?|
                  <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                </>
              )}
            </Form.Text>
            <Button
              variant="outline-success"
              type="submit"
              onClick={(e) => auth(e)}
            >
              {isLogin ? "Login" : "Registration"}
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
