import {Link} from 'react-router-dom';
import React, {useState, useEffect, useRef} from "react";
import { useCarrito } from "../context/CarritoContext";
import './MiniCarrito.css';

const MiniCarrito = () => {
    const { items, total, limpiarCarrito, eliminarProducto, sumarCantidad, restarCantidad, cantidadTotal } = useCarrito();
    const [abierto, setAbierto] = useState(false);
    const [animar, setAnimar] = useState (false);
    const carritoRef = useRef(null);
    const [itemAnimado, setItemAnimado] = useState(null);
    const [itemEliminando, setItemEliminando] = useState(null);

    useEffect(() => {
        if (cantidadTotal > 0) {
            setAnimar (true);
            setTimeout(() => setAnimar(false), 300);
        }
    }, [cantidadTotal]);

    useEffect(() => {
        const manejarClick = (e) => {
            if (abierto && carritoRef.current && !carritoRef.current.contains(e.target)) {
                setAbierto(false);
            }
        };

        document.addEventListener("mousedown", manejarClick);

        return () => {
            document.removeEventListener("mousedown", manejarClick);
        };
    }, [abierto]);

    return (
        <div className="mini-carrito-container">
            {/* Boton del carrito */}
            <button 
                className={`mini-carrito-icon ${animar ? "latido" : ""}`}
                onClick={() => setAbierto(!abierto)}>
                🛒 
                <span className="mini-carrito-cantidad">{cantidadTotal}</span>
            </button>

            {/* Panel desplegable*/}
            {abierto && (
                <div className="mini-carrito-panel" ref={carritoRef}>
                    <h3>Carrito</h3>

                    {items.length === 0 ? (
                        <p className="mini-carrito-vacio">El carrito esta vacio</p>
                    ) : (
                        <>
                            <ul className="mini-carrito-lista">
                                {items.map(item => (
                                    <li key={item.id} className={`mini-carrito-item
                                     ${itemAnimado === item.id ? "item-pop" : ""}
                                     ${itemEliminando === item.id ? "item-fade-out" : ""}
                                     `}>
                                        <span>{item.nombre}</span>
                                        <div className="mini-carrito-cantidad-controls">
                                            <button className="mini-carrito-btn" onClick={() => restarCantidad(item.id)}>-</button>
                                            <span>x{item.cantidad}</span>
                                            <button className="mini-carrito-btn" onClick={() => {
                                                sumarCantidad(item.id);
                                                setItemAnimado(item.id)
                                                setTimeout(() => setItemAnimado(null), 200);
                                            }}>+</button>
                                        </div>
                                        
                                        <span>${item.precio * item.cantidad}</span>
                                        <button
                                            className="mini-carrito-eliminar"
                                            onClick={() => {setItemEliminando(item.id);
                                                setTimeout(() => eliminarProducto(item.id), 300);
                                            }}
                                        >
                                            ❌
                                        </button>
                                    </li>
                                ))}    
                                </ul>

                                <p className="mini-carrito-total"> Total: ${total}</p>
                                
                                <button
                                className="mini-carrito-vaciar"
                                onClick={limpiarCarrito}>
                                    Vaciar Carrito

                                </button>

                                <Link to="/checkout">
                                <button 
                                className='mini-carrito-finalizar'
                                onClick={() => setAbierto(false)}
                                >
                                Finalizar Pedido</button>
                                </Link>
                            </>
                    )}
                </div>
            )}
        </div>
    );
};

export default MiniCarrito;