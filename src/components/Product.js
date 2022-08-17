import React from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
function Product({ product, deleteProduct }) {
  var history = useNavigate();
  const redirectEditProductScreen = () => {
    history(`/edit/${product._id}`);
  };
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <span>{product.category}</span>
          </div>
        </Card.Text>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
        <Card.Text className="text-end">
          <i
            className="fa fa-edit fa-lg"
            style={{ cursor: "pointer" }}
            onClick={redirectEditProductScreen}
          ></i>

          <i
            className="fa fa-trash fa-lg p-lg-3 "
            style={{ cursor: "pointer" }}
            aria-hidden="true"
            onClick={(event) => deleteProduct(product)}
          ></i>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
