import { Empty, Switch } from "antd";
import React, { useContext, useState } from "react"

import { AppContext } from '../contexts/AppContext'
import CardAirport from "./Component-Card-Airport";

const CardType = (props) => {
    const { appState } = useContext(AppContext);
    const { item, title } = props
    const [jsonView, setJsonView] = useState(false)

    const onSwitchChange = (value) => {
        console.log(value);
        setJsonView(!jsonView);
    }

    const renderCardAirportItem = (item) => {
        const data = [{
            name: 'asd',
            lat: '1',
            lng: '2',
            waypoints: [{name: 'a', count: 10}, {name: 'b', count: 10}]
        }, {
            name: 'asd',
            lat: '1',
            lng: '2',
            waypoints: [{name: 'a', count: 10}, {name: 'b', count: 10}]
        }]
        item = data;
        return item.map(s => (
            <CardAirport item={s} jsonView={jsonView}/>
        ))
    }

    return (
        <div className="card-container">
            <div className="card-content">
                <div className="row">
                    <h2 className="row1">{title}</h2>
                    <Switch checked={jsonView} checkedChildren="JSON" unCheckedChildren="Card" onChange={onSwitchChange}/>
                </div>
                <div className="card-content-details">
                    {item?.length > 0 ?
                        renderCardAirportItem(item) :
                        renderCardAirportItem(item)
                        // <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                </div>
            </div>
        </div >
    )
}

export default CardType