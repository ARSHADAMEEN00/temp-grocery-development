import React from "react"
import { Map } from "react-leaflet"
import { TileLayer } from "react-leaflet"

import "leaflet/dist/leaflet.css"

export default function Gmap() {
  return (
    <>
      <Map
        className="markercluster-map"
        center={[51.0, 19.0]}
        zoom={4}
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    </>
  )
}
