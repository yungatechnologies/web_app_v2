export interface DeviceDto{
    id: string,
    stage: string,
    serialNumber: string,
    phone: string,
    status: string,
    deviceNumber: string
    location ?: { _lat: number, _long: number }  
}
