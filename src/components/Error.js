import React from 'react';

const Error = ({mensaje}) => {

    return ( 
        <p className="font-font-weight-bold alert alert-danger text-center mt-4">{mensaje}</p>
    );
}

export default Error;