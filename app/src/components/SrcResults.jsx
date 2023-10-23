import React, { useState } from 'react';
function SrcResults(props) {
    
    return (
        <div className="container my-4">
            {props.results.map((country, index)=>{
                return <div key={index} className="border rounded shadow-sm p-2 ps-4 my-2">{country.name.common}</div>
            })}
            
        </div>
    );
}

export default SrcResults;
