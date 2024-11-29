


export interface Camera{
    id:number,
    name:string,
    location:string,
    modelNr:string,
    resolution:string,
    isActive:boolean,
    intervalSeconds:number,
    snapshotUrl:string,
    livestreamUrl:string,
    images: [
        measuredAt: Date,
        url:string
    ]
}