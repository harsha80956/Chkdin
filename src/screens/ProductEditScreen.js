import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
// import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
// import { listProductDetails, updateProduct } from "../actions/productActions";
// import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  var history = useNavigate();
  const { id } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    var products = JSON.parse(localStorage.getItem("products"));
    products = products.filter((product) => product._id != id);
    var updatedProduct = {
      _id: id,
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
    products.push(updatedProduct);
    localStorage.setItem("products", JSON.stringify(products));
    history("/");
  };

  useEffect(() => {
    var products = JSON.parse(localStorage.getItem("products"));
    var product = products.find((product) => product._id == id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setRating(product.rating);
    setNumReviews(product.numReviews);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  }, []);

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
              Update Product
            </Button>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
