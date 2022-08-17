import React, { useState, useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

function ProductAddScreen() {
  var id = useId();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("/images/sample.jpg");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [description, setDescription] = useState("");

  var history = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    var products = JSON.parse(localStorage.getItem("products"));
    const ids = products.map((user) => user._id);
    const sorted = ids.sort((a, b) => a - b);
    if (sorted.length == 0) {
      sorted.push(0);
    }
    var newProduct = {
      _id: (Number(sorted[sorted.length - 1]) + 1).toString(),
      name,
      price,
      image,
      brand,
      category,
      rating,
      numReviews,
      countInStock,
      description,
    };
    var products = JSON.parse(localStorage.getItem("products"));
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    history("/");
  };

  return (
    <div>
      <Link to="/">Go Back</Link>

      <FormContainer>
        <h1>Add Product</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="p-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <Form.Group controlId="description" className="p-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price" className="p-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price" className="p-2">
            <Form.Label>Reviews</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={numReviews}
              onChange={(e) => setNumReviews(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countinstock" className="p-2">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter stock"
              value={countInStock}
              onChange={(e) => setCountInStock(Number(e.target.value))}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category" className="p-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Books">Books</option>
              <option value="Fashion">Fashion</option>
              <option value="Electronics">Electronics</option>
            </Form.Control>
          </Form.Group>

          <div className="text-center p-2 pt-4">
            <Button type="submit" variant="primary">
              Add Product
            </Button>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
}

export default ProductAddScreen;
