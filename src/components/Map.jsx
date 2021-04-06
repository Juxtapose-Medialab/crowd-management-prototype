import React from 'react'
import map from '../img/Strandschermkaart-full.jpg'
// import area from '../img/area.svg'

import '../styles/map.scss'

export default function Map() {
    return (
        <div className="map">
            {/* <img src= { area } alt="Area of one part" className="map__area-img"></img> */}
            <div className="map__area-img-wrapper">
                <svg className="map__area-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 387 374"><g data-name="Layer 2"><path fill="#5bcc1b" opacity=".4" d="M372 21l-114 2-117-8L0 0l87 374 300-23-15-330z" data-name="Layer 1"/></g></svg>
            </div>
            <img src= { map } alt="Map of area"></img>
        </div>
    )
}
