


import React from 'react'

function Heading(props) {
    return (
        <div className="m-4">
            <h1 className="antialiased text-3xl font-bold text-gray-600" {...props}>{props.text}</h1>
        </div>
    )
}

export default Heading;
