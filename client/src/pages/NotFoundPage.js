import React from "react";
import { Link, Navigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { SHOP_ROUTE } from "../utils/consts";
export default function NotFoundPage({ text = "" }) {
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <h2 className="text-center">{text}</h2>
        <Image
          className="w-50"
          src="https://c4.wallpaperflare.com/wallpaper/976/117/318/anime-girls-404-not-found-glowing-eyes-girls-frontline-wallpaper-preview.jpg"
        />
        <h2 className="text-center">
          Back to <Link to={SHOP_ROUTE}>MAIN</Link>
        </h2>
      </Row>
    </Container>
  );
}
