import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { listProducts } from "../actions/productActions";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let history = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history(`/?keyword=${keyword}`);
    } else {
      if (history.location) {
        history(history(history.location.pathname));
      } else {
        history("/");
      }
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Row>
        <Col>
          <Form.Control
            type="text"
            name="q"
            placeholder="Search"
            onChange={(e) => setKeyword(e.target.value)}
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>
        </Col>
        <Col>
          <Button type="submit" variant="outline-success" className="p-2">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBox;
