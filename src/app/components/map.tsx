'use client'
import React, { useEffect, useState } from 'react'
import Mapa, { Marker } from 'react-map-gl/maplibre';
import pin from '@/app/img/pin.png'
import Image from 'next/image'
import { getMapStyles } from '../actions';
import { relative } from 'path';

interface IMap {
    longitude: number
    latitude: number
    width: number
    height: number
    zoom: number
    mapStyle: string
}

const CustomMap: React.FC<IMap> = ({ longitude, latitude, width, height, zoom }) => {
    const [mapStyle, setMapStyle] = useState<string | null>(null)
    const [lng, setLng] = useState(longitude)
    const [lat, setLat] = useState(latitude)

    useEffect(() => {
        getMapStyles().then(result => setMapStyle(result))
    }, [])
    return (
        <div style={{ width: 1060, height: 300 }}>
            {
                (!!mapStyle && !!lng && !!lat)
                &&
                <Mapa
                    initialViewState={{
                        longitude: lng,
                        latitude: lat,
                        zoom: 10
                    }}
                    style={{ width: 1060, height: 300, borderRadius: 10, overflow:'hidden' }}
                    mapStyle={mapStyle}
                    interactive={false}
                    latitude={lat}
                    longitude={lng}
                >
                    <Marker style={{ position: 'absolute', top: 0, left: 0 }} latitude={lat} longitude={lng}>
                        <Image width={36} height={36} src={pin} alt='pin' style={{ width: 36, height: 36 }} />
                    </Marker>
                </Mapa>

            }

        </div>
    )
}

export default CustomMap