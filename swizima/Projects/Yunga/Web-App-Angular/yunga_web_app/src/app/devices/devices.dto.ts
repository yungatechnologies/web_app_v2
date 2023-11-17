export interface DeviceDto {
    id: string;
    stage: string;
    serialNumber: string;
    phone: string;
    status: string;
    deviceNumber: string;
    location?: { _lat: number, _long: number };
    online: boolean;
}


export interface DeviceStatusDto {
    armTime: string;
    armed: number;
    childLock: boolean;
    deviceNumber: string;
    disarmTime: string;
    doorBell: boolean;
    id: string;
    motionSensor: boolean;
    siren: boolean;
    strobeLight: boolean;
    autoArm: boolean;
}
