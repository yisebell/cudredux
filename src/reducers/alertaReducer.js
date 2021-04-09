import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types';

// CADA REDUCER TIENE SU PROPIO STATE
const initialState = {
    alerta: null
};

const alertaReducer = (state = initialState, action) => {
    switch(action.type) {
        case MOSTRAR_ALERTA:
            return {
                ...state,
                alerta: action.payload
            }
        case OCULTAR_ALERTA:
            return {
                ...state,
                alerta: null
            }
        default:
            return state;
    }
};

export default alertaReducer;