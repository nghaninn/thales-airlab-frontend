import { Empty, Switch } from "antd";
import React, { useContext, useEffect, useState } from "react"

import { AppContext } from '../contexts/AppContext'
import CardAirport from "./Component-Card-Airport";

const CardType = (props) => {
    const { appState } = useContext(AppContext);
    const { array, title } = props
    const [jsonView, setJsonView] = useState(false)
    const [airport, setAirport] = useState(-1)

    const onSwitchChange = (value) => {
        console.log(value);
        setJsonView(!jsonView);
    }

    useEffect(() => {
        let uniqueAirport = [...new Set(array?.map(s => s.airportUID))] ?? [];
        let _airport = uniqueAirport.map(s => {
            let airP = array.find(x => x.airportUID == s);
            return {
                airport: {
                    "airportUID": airP.airportUID,
                    "airportLat": airP.airportLat,
                    "airportLng": airP.airportLng,
                },
                waypoints: array.filter(x => x.airportUID == s).map(x => {
                    return {
                        waypointUID: x.waypointUID,
                        waypointLat: x.waypointLat,
                        waypointLng: x.waypointLng,
                        counted: x.counted
                    }
                })
            }
        });
        console.log(array, uniqueAirport, _airport)

        setAirport(_airport)
    }, [array]);

    const renderCardAirportItem = (item) => {
        // const data = [{
        //     name: 'asd',
        //     lat: '1',
        //     lng: '2',
        //     waypoints: [{name: 'a', count: 10}, {name: 'b', count: 10}]
        // }, {
        //     name: 'asd',
        //     lat: '1',
        //     lng: '2',
        //     waypoints: [{name: 'a', count: 10}, {name: 'b', count: 10}]
        // }]
        // item = data;
        if (item && item.length > 0)
            return item.map(s => (
                <CardAirport item={s} jsonView={jsonView} />
            ))
    }

    return (
        <div className="card-container">
            <div className="card-content">
                <div className="row">
                    <h2 className="row1">{title}</h2>
                    <Switch checked={jsonView} checkedChildren="JSON" unCheckedChildren="Card" onChange={onSwitchChange} />
                </div>
                <div className="card-content-details">
                    {airport?.length > 0 ?
                        renderCardAirportItem(airport) :
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                </div>
            </div>
        </div >
    )
}

export default CardType