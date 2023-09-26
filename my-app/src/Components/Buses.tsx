import React, { useEffect } from "react";
import BusCard from "./BusCard";
import Bus, { exampleBuses } from "../Models/Bus";

const Buses = () => {
    const baseUrl = "https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals"; // specifically Kentish town code

    var [busText, setBusText] = React.useState("Press for some buses");
    var [busList, setBusList] = React.useState<Bus[]>([]);

    const renderBusCards = () => {
        if (busList.length === 0) return;
        
        return busList.map(bus => {
            return <BusCard bus={bus}></BusCard>
        });
    };

    useEffect(() => {
        if (busList.length === 0) {
            setBusText("Press for some buses");
        }
        else {
            setBusText("Ew I hate these buses (remove)");
        }
    }, [busList]);

    const handleButtonClick = () => {
        if (busList.length !== 0) {
            setBusList([]);
            return;
        }

        fetch(baseUrl)
            .then(response => response.json())
            .then((data: Bus[]) => {
                if (data[0] === undefined) {
                    throw new TypeError(); // bruh - don't know why this works
                }
                setBusList(data);
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="busContainer">
            {renderBusCards()}

            <button onClick={handleButtonClick}>
                {busText}
            </button>
        </div>
    );
}

export default Buses;