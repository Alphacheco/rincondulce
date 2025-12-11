import React, { useEffect, useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import emailjs from "@emailjs/browser";
import "./Checkout.css";

const Checkout = () => {
    const { items, total, limpiarCarrito } = useCarrito();
    const [cliente, setCliente] = useState({
        nombre: "",
        email: "",
        telefono: "",
        direccion: ""
    });

    // Inicializar EmailJS UNA SOLA VEZ. Usar variable de entorno con fallback.
    useEffect(() => {
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "_I8lhC4mx5FA32RTo";
        emailjs.init({ publicKey });
    }, []);

    const handleChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (items.length === 0) {
            alert("El carrito está vacío");
            return;
        }

        // Formatear los productos
        const pedidoFormateado = items
            .map(item => `${item.nombre} x${item.cantidad} — $${item.precio * item.cantidad}`)
            .join("\n");

        // LOS NOMBRES DEBEN COINCIDIR CON TU TEMPLATE DE EMAILJS
        const templateParams = {
            name: cliente.nombre,
            email: cliente.email,
            telefono: cliente.telefono,
            direccion: cliente.direccion,
            pedido: pedidoFormateado,
            total: total
        };

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_rincondulce";
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_pedidorincondul";

        emailjs.send(serviceId, templateId, templateParams)
            .then(() => {
                alert("Pedido enviado correctamente!");
                limpiarCarrito();
                setCliente({
                    nombre: "",
                    email: "",
                    telefono: "",
                    direccion: ""
                });
            })
            .catch((error) => {
                console.error("Error al enviar email:", error);
                alert("Error al enviar pedido. Revisa consola.");
            });
    };

    return (
        <div className="checkout-container">
            <h1>Finalizar Pedido</h1>

            {items.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    <div className="checkout-items">
                        <h2>Productos:</h2>
                        <ul>
                            {items.map((item) => (
                                <li key={item.id}>
                                    {item.nombre} x{item.cantidad} — ${item.precio * item.cantidad}
                                </li>
                            ))}
                        </ul>
                        <p className="checkout-total">Total: ${total}</p>
                    </div>

                    <form className="checkout-form" onSubmit={handleSubmit}>
                        <h2>Datos de contacto</h2>

                        <input type="text" name="nombre" placeholder="Nombre"
                            value={cliente.nombre} onChange={handleChange} required />

                        <input type="email" name="email" placeholder="Email"
                            value={cliente.email} onChange={handleChange} required />

                        <input type="tel" name="telefono" placeholder="Teléfono"
                            value={cliente.telefono} onChange={handleChange} required />

                        <input type="text" name="direccion" placeholder="Dirección"
                            value={cliente.direccion} onChange={handleChange} required />

                        <button type="submit">Finalizar Pedido</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Checkout;
