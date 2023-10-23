import './home.css'
import React, { useEffect, useState } from 'react';
function Home() {
    const [inpValue, setInValue] = useState("")
    const [countryValue, setCountryValue] = useState("")
    const [srcResult, setsrcResult] = useState()
    const [haveNeighbor, setHaveNeighbor] = useState()
    let borders = []
    let elm;
    // input value set
    const handleChange = (e) => {
        setInValue(e.target.value)
        if (inpValue.length == 1) {
            setsrcResult(null)
            setCountryValue(null)
        }
    }

    // src click
    const handleClickSrc = async () => {
        try {
            const request = await fetch(`https://restcountries.com/v3.1/name/${inpValue}`)
            if (!request.ok) {
                throw new Error("Bad Request")
            }
            const jsonData = await request.json()
            setsrcResult(jsonData)

        } catch (error) {
            console.log(error)
        }
    }

    // 
    const handleClickCountry = async (country) => {
        try {
            const request = await fetch(`https://restcountries.com/v3.1/name/${country}`)
            if (!request.ok) {
                throw new Error("Bad Request")
            }
            const jsonData = await request.json()
            setCountryValue(jsonData[0])
        } catch (error) {
            console.log(error)
        }
    }
    
    // result click
    const resClick = (e) => {
        handleClickCountry(e.target.innerText)
        setsrcResult(null)
    }

    // gps src
    const handleClickGps = () => {
        // console.log(srcResult)
        console.log(borders)
        console.log(elm)
    }


    return (
        <div className="container my-4">
            <div className="card shadow">
                <div className="card-body" >
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder='Azerbaijan' onChange={handleChange} value={inpValue} />
                        <button className="btn btn-primary" onClick={handleClickSrc}>Search</button>
                        <button className="btn btn-outline-success" onClick={handleClickGps}>
                            <i className="fa-solid fa-location-crosshairs"></i>
                        </button>
                    </div>
                    <div id='srcplace'>
                        {srcResult ? (
                            <div className="container my-4">
                                {srcResult.map((country, index) => {
                                    return <div key={index} className="border rounded shadow-sm p-2 ps-4 my-2" onClick={resClick}>{country.name.common}</div>
                                })}
                            </div>
                        ) : (null)}
                    </div>

                </div>
            </div>
            {countryValue ? (<div className="card shadow my-4">
                <div className="card-header text-center">Country</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <img src={countryValue.flags.png} alt="flag" className='img-fluid w-100' />
                        </div>
                        <div className="col-12 col-md-8 my-3">
                            <h3 className="card-title">{countryValue.name.common}</h3>
                            <hr />
                            <div className="row">
                                <div className="col-4">Population: </div>
                                <div className="col-8">{(countryValue.population / 1000000).toFixed(1)}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Language: </div>
                                <div className="col-8">{Object.values(countryValue.languages)[0]}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Capital: </div>
                                <div className="col-8">{countryValue.capital[0]}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Currency: </div>
                                <div className="col-8">{Object.values(countryValue.currencies)[0].name}  ( {Object.values(countryValue.currencies)[0].symbol} )</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>) : (null)}
            {countryValue ? (
                <div className="card shadow my-4">
                    <div className="card-header text-center">Neighboring States</div>
                    <div className="card-body">
                        {countryValue.borders.map((citem) => {
                            fetch('https://restcountries.com/v3.1/alpha/' + citem)
                                .then((res) => {
                                    return res.json()
                                })
                                .then((data)=>{
                                    elm = data[0]
                                })
                                return(
                                    <div>{elm}</div>
                                )
                                
                        })
                        }
                        <div className="row" id="neighbors">
                
                        </div>
                    </div>
                </div>
            ) : (null)}
        </div>
    );
}

export default Home;
