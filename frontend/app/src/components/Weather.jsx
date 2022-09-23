import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Weather(props) {
    const [data, setData] = useState([])
    const [weather, setWeather] = useState([])
    const navigate = useNavigate()
    if(!props.loggedIn)
        navigate('/')

    useEffect(() => {

        let myHeaders = new Headers()

        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        
        
        fetch(`${props.base_url}/personalinfo` ,{
            headers: myHeaders
        })
        .then(res => res.json())
        .then(user => {
            setData(user)
        })
        .catch(() =>
            props.flashMessage('Encountered an issue, Please try again !', 'danger'))
    }, [])

    const weatherInfo = (async () => {

        let myHeaders = new Headers()
                myHeaders.append('Content-Type', 'application/json')

        let formData = JSON.stringify({
            city    : data.city,
            headers: myHeaders,
            zip_code: data.zip_code
        })

        const res = await fetch(`${props.expressBackend}/weather`,{
            method:'POST',
            headers:myHeaders,
            body:formData
        })
        .then(res => res.json())
        .then(res => setWeather(res))
    })
    useEffect(() => {
        weatherInfo()
    },[data])
    return(
    <>
        {weather.name?
        <div className='card mt-3 bg-primary text-white p-4 border border-0 col-8 col-md-6 col-lg-5' style={{backgroundImage:"linear-gradient(to top right, #34568B, #5780c1 , white)"}}>
            <h3 className='ms-3'>
                {weather.name +", "+ weather.sys.country}
            </h3>
            <div className='d-flex justify-content-start align-items-center'>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                <h1>{`${Math.trunc(weather.main.temp)}º`}</h1>
                <h3 className='mt-2'><b>F</b></h3>
                <div className='ms-5 d-flex align-items-start flex-column'>
                    <h6 className='fs-3'><b>{`${weather.weather[0].main}`}</b></h6>
                    <p className='fs-6 fw-lighter'>FEELS LIKE <b>{`${Math.trunc(weather.main.feels_like)}`}º</b></p>
                </div>
            </div>
            <div className='d-flex justify-content-start mt-3'>
                <p className='fs-6 fw-lighter me-5 ms-3'>HUMIDITY <br/><b>{Math.trunc(weather.main.humidity)}%</b></p>
                <p className='fs-6 fw-lighter me-5'>PRESSURE <br/><b>{weather.main.pressure} in</b></p>
                <p className='fs-6 fw-lighter me-3'>WIND     <br/><b>{weather.wind.speed} mph</b></p>
                <img className='mt-2' src="https://cdn-icons-png.flaticon.com/512/64/64819.png" width={"20px"} height={"25px"} style={{transform:`rotate(${weather.wind.deg}deg`}}/>
            </div>
            
        </div>
        :null}
    </>
    )
}