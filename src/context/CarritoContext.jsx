import { createContext, useState, useContext } from "react";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const agregarProducto = (producto) => {
        console.log('agregarProducto called with', producto);
        setItems(prev => {
            const existe = prev.find(item => item.id === producto.id);
            if (existe) {
                return prev.map(item =>
                    item.id === producto.id 
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                return [...prev, { ...producto, cantidad: 1 }];
            }
        });
    };

    const sumarCantidad =(id) => {
        setItems (prev => 
            prev.map(item =>
                item.id === id
                    ?{ ...item, cantidad: item.cantidad + 1 }
                    : item
        )
        );
    };

    const restarCantidad = (id) => {
        setItems (prev =>
            prev 
            .map(item =>
                item.id === id
                ? { ...item, cantidad: item.cantidad -1 }
                :item
            )
            .filter(item => item.cantidad > 0)
        );
    };

    // esta función sí existe ahora
    const limpiarCarrito = () => setItems([]);

    const eliminarProducto = (id) => {
        setItems (prev => prev.filter(item => item.id !== id));
    };


    const total = items.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
    );
    
    const cantidadTotal = items.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <CarritoContext.Provider
            value={{
                items,
                agregarProducto,
                limpiarCarrito, // ← AHORA SÍ EXISTE
                eliminarProducto,
                total,
                cantidadTotal,
                sumarCantidad,
                restarCantidad,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error("useCarrito must be used within a CarritoProvider");
    }
    return context;
};
