import { Divider, Empty } from "antd";
import React, { useContext, useEffect } from "react"

import { AppContext } from '../contexts/AppContext'

const CardAirport = (props) => {
    const { appState } = useContext(AppContext);
    const { item, jsonView } = props

    useEffect(() => {
        console.log(item, jsonView);
    }, [])

    const renderWaypints = (item) => {
        if (item && item.length > 0)
            return item.map(s => (
                <div>
                    Waypoint: {s?.waypointUID} [{s?.counted}]
                </div>
            ))
    }

    const renderJsonView = (item) => {
        return (
            <div style={{ whiteSpace: "pre" }}>
                {JSON.stringify(item, null, 2)}
            </div>
        )
    }

    return (
        <div className="card-airport">
            <div className="card-content">
                {jsonView ?
                    <div className="card-content-details">
                        {renderJsonView(item)}
                    </div> :
                    <div className="card-content-details">
                        <div>
                            <div>Airport {item?.airport?.airportUID}</div>
                            <div>Lat: {item?.airport?.airportLat?.toFixed(2)}, Lng: {item?.airport?.airportLng.toFixed(2)}</div>
                            <Divider />
                            {item?.waypoints?.length > 0 ?
                                renderWaypints(item.waypoints) :
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CardAirport