import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from './Error';

// actios de redux
import { crearNuevoProductoAction } from '../actions/productoAction';
import { mostrarAlertaAction, ocultarAlertaAction } from '../actions/alertaActions';

const NuevoProducto = ({history}) => {

    // state del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    // utilizar el dispatch y crea una funcion
    const dispatch = useDispatch();

    // Acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    // console.log(cargando);

    // manda a llamar el action de productoActions
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto));

    // cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        // validar formulario
        if(nombre.trim() === '' || precio <= 0) {

            const respuesta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            };

            dispatch(mostrarAlertaAction(respuesta));

            return;
        }

        // si no hay errores
        dispatch(ocultarAlertaAction());

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        // redireccionar al home
        history.push('/');
    };

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Agregar Nuevo Producto</h2>
                        {alerta ? (
                            <p className={alerta.classes}>{alerta.msg}</p>
                        ) : null}
                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="from-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text"
                                    className="form-control mb-4"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="from-group">
                                <label>Precio Producto</label>
                                <input 
                                    type="number"
                                    className="form-control  mb-4"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>

                        {cargando ? <p>Cargando...</p>: null}
                        {error ? <Error mensaje={'Hubo un error'}/> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoProducto;