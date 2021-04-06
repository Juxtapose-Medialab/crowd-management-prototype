import React, { useState, useEffect } from 'react'
import map from '../img/Strandschermkaart-full.jpg'
// import area from '../img/area.svg'

import '../styles/map.scss'

export default function Map(props) {
    const [ test, setTest ] = useState("#5BCC1B");

    useEffect(() => {
        if(props.countPeople < 4) {
            setTest("#5BCC1B");
        } else if(props.countPeople >= 4 && props.countPeople < 6) {
            setTest("#FF8C00");
        } else if(props.countPeople >= 6) {
            setTest("#FF0000");
        }
    }, [ props.countPeople ])

    // console.log(props.countPeople);

    return (
        <div className="map">
            {/* <img src= { area } alt="Area of one part" className="map__area-img"></img> */}
            <div className="map__area-img-wrapper">
                <svg className="map__area-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 387 374"><g data-name="Layer 2"><path fill={ test } opacity=".4" d="M372 21l-114 2-117-8L0 0l87 374 300-23-15-330z" data-name="Layer 1"/></g></svg>
            </div>
            <img className="map__full-area" src= { map } alt="Map of area"></img>
        </div>
    )
}
