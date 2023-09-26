interface Bus {
    httpStatusCode: number;
    timeToStation: number;
    vehicleId: string;
    lineId: string;
    expectedArrival: Date;
}

export const exampleBuses: Bus[] = [
    {
        httpStatusCode: 200,
        timeToStation: 5,
        vehicleId: "144",
        lineId: "19",
        expectedArrival: new Date(),
    },
    {
        httpStatusCode: 200,
        timeToStation: 10,
        vehicleId: "14",
        lineId: "12",
        expectedArrival: new Date(),
    },
];

export default Bus;