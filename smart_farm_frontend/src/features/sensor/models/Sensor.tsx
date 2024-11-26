

export interface Sensor{
    id:number,
    intervallSeconds:number,
    isActive:boolean,
    location:string,
    modelNr:string,
    name:string,
    unit:string,

    connection: {
        connectionID:string,
        additionalInformation: {}
    }
    measurements: [
        {
            measuredAt: Date
            value:number
        }
    ]

}