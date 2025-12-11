import React from "react";
import {HashRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home.jsx";
import MiniCarrito from "./components/MiniCarrito.jsx";
import Checkout from "./pages/Checkout.jsx";
import './App.css';
import logo from './imgs/logo.png';

function App() {
  return (
    <Router>
      <div className="App">
        <img className="logo" src={logo} alt="logo"/>


        <div className="navBar">
          
          <nav className="inicioCheckout">
            <Link to="/">Inicio</Link>
            <Link to="/checkout">Finalizar Pedido</Link>
          </nav>
          <MiniCarrito />

        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;