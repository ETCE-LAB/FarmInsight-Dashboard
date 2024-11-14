

export interface Sensor{
    id:number,
    name:string,
    location:string,
    unit:string,
    modelNr:string,
    isActive:boolean,
    intervallSeconds:number,
    measurements: [
        {
            measuredAt: Date
            value:number
        }
    ]

}