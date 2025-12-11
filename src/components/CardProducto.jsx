import React from "react";
import { useCarrito } from "../context/CarritoContext";
import './CardProducto.css';

const CardProducto = ({ producto, style }) => {
    const { agregarProducto } = useCarrito();

    return (
        <div className="card-producto" style={style}>
            <img src={producto.imagen} alt={producto.nombre} className="card-producto-img" />
            <h3 className="card-producto-nombre">{producto.nombre}</h3>
            <p className="card-producto-descripcion">{producto.descripcion}</p>
            <p className="card-producto-precio">Precio: ${producto.precio}</p>
            <button className="card-producto-boton" onClick={() => agregarProducto(producto)}>
                Agregar al carrito
            </button>
        </div>
    );
};

export default CardProducto;