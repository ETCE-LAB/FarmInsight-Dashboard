
export interface FieldDescription {
    name: string;
    type: string;
    rules: object[];
}

export interface HardwareConfiguration {
    sensorClassId:string,
    name:string,
    connection:string,
    parameter:string,
    tags: object,
    fields: FieldDescription[]
}