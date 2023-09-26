import React from "react";
import Bus from "../Models/Bus";

const BusCard = ({ bus }: { bus: Bus }) => {
    return (
        <div className="busCard">
            <h1>BUS</h1>
            <li>{bus.lineId}</li>
            <li>{bus.timeToStation}</li>
            <li>{new Date(bus.expectedArrival).toTimeString()}</li>
        </div>
    );
}

export default BusCard;