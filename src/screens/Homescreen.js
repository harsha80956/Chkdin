import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProductFromList } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate, useSearchParams } from "react-router-dom";

function Homescreen() {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("");
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
  let history = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  useEffect(() => {
    dispatch(listProducts(keyword, sortBy));
  }, [dispatch, keyword, sortBy]);

  const createProductHandler = () => {
    history("/add");
  };

  const deleteProduct = (event) => {
    dispatch(deleteProductFromList(event._id));
    dispatch(listProducts());
  };

  return (
    <div>
      {loading ? (
        <h2>
          <Loader />
        </h2>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col>
              <h1>Products</h1>
            </Col>
            <Col>{/* <h1>Products</h1> */}</Col>
            <Col className="text-end">
              <Form.Control
                className="my-3"
                as="select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="ASC">Price ASC</option>
                <option value="DESC">Price DESC</option>
                <option value="Rating">Rating</option>
              </Form.Control>
            </Col>

            <Col className="text-end">
              <Button className="my-3" onClick={createProductHandler}>
                <i className="fas fa-plus"></i> Create Product
              </Button>
            </Col>
          </Row>
          <Row>
            {products.length != []
              ? products.map((product) => (
                  <Col key={product._id} sm={12} lg={6} lg={4} xl={3}>
                    <Product product={product} deleteProduct={deleteProduct} />
                  </Col>
                ))
              : null}
          </Row>
        </div>
      )}
    </div>
  );
}

export default Homescreen;
