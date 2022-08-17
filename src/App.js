import { Container } from "react-bootstrap";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homescreen from "./screens/Homescreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ProductAddScreen from "./screens/ProductAddScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

function App() {
  var products = localStorage.getItem("products");
  if (!products) {
    localStorage.setItem("products", JSON.stringify([]));
  }
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Homescreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/add" element={<ProductAddScreen />} />
            <Route path="/edit/:id" element={<ProductEditScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
