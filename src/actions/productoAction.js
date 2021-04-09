import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            // insertar en la API
            await clienteAxios.post('/productos', producto);

            // Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto));

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente!',
                'success'
            );
        } catch (error) {
            console.log(error);
            // Si hay un error cambiar el state
            dispatch(agregarProductoError(true));

            // alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo.'
            });
        }
    }
};

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

// Si el producto se guarda en la BBDD
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

// Si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

// Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarproductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            // console.log(respuesta.data);
            dispatch( descargaProductosExito(respuesta.data));
        } catch (error) {
            dispatch( descargaProductosError(true));
        }
    };
};

const descargarproductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

// En caso de obtener los productos
const descargaProductosExito = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

// En caso de error
const descargaProductosError = estado => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: estado
});

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);

            dispatch(eliminarProductoExito());

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto se eliminó correctamente.',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
        }
    };
};

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

// Colocar producto en edición
export function editarProductoAction(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditar(producto));
    };
};

const obtenerProductoEditar = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

// Edita un registro en la API y state
export function editarProductosAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto());

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            // console.log(respuesta);
            dispatch(editarProductoExito(producto));
        } catch (error) {
            console.log(error);
            dispatch(editarProductoError());
        }
    };
};

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
});