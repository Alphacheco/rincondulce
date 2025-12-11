import React, { useState } from "react";
import productos from "../data/productos";
import CardProducto from "../components/CardProducto";
import "./Home.css";

const SeccionProductos = ({ titulo, tipo, productos }) => {
    const [abierto, setAbierto] = useState(false);

    return (
        <div className="home">
            <h1
                className="home-titulo"
                onClick={() => setAbierto(!abierto)}
                style={{ cursor: "pointer" }}
            >
                {titulo} 
            </h1>

            {abierto && (
                <div className="home-listado">
                    {productos
                        .filter((p) => p.tipo === tipo)
                        .map((producto) => (
                            <CardProducto key={producto.id} producto={producto} />
                        ))}
                </div>
            )}
        </div>
    );
};

const Home = () => {
    return (
        <>
            <SeccionProductos
                titulo="Alfajores"
                tipo="alfajor"
                productos={productos}
            />

            <SeccionProductos
                titulo="Tartas Dulces"
                tipo="tartadulce"
                productos={productos}
            />

            <SeccionProductos
                titulo="Pastafrolas"
                tipo="pastafrola"
                productos={productos}
            />

            <SeccionProductos
                titulo="Tortas Clásicas"
                tipo="clasica"
                productos={productos}
            />

            <SeccionProductos
                titulo="Tortas Heladas"
                tipo="tortahelada"
                productos={productos}
            />
        </>
    );
};

export default Home;
