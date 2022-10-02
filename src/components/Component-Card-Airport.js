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
        return item.map(s => (
            <div>
                Waypoint: {s.name} [{s.count}]
            </div>
        ))
    }

    const renderJsonView = (item) => {
        return (
            <div style={{whiteSpace: "pre"}}>
                {JSON.stringify(item, null, 2)}
            </div>
        )
    }
    
    return (
        <div className="card-airport">
            <div className="card-content">
                {jsonView ?
                    <div className="card-content-details">
                        {item?.length > 0 ?
                            renderJsonView(item) :
                            renderJsonView(item)
                            // <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        }
                    </div> :
                    <div className="card-content-details">
                        <div>
                            <div>Airport {item?.name}</div>
                            <div>Lat: {item?.lat}, Lng: {item?.lng}</div>
                            <Divider/>
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