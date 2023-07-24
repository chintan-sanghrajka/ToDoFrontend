import React from 'react';
import loading from './../loading.gif'

const Spinner = () => {

    return (
        <img src={loading} alt='loading' style={{ height: "50px", width: "50px", display: "block", textAlign: "center", margin: "0 auto" }} />
    )
}

export default Spinner;