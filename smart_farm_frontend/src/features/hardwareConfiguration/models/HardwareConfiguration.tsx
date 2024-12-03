
export interface FieldDescription {
    name: string;
    type: string;
    rules: object[];
}

export interface HardwareConfiguration {
    sensorClassId:string,
    model:string,
    connection:string,
    parameter:string,
    unit: string,
    tags: object,
    fields: FieldDescription[]
}