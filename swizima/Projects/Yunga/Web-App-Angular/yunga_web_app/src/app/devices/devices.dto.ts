import { Timestamp } from "firebase/firestore";

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

export interface DoorBellDto {
    action: number
    date: Timestamp
    deviceNumber: string
    guest: string
    id: string
    note: string
    result: number
    userId: string
}

export interface AlarmDto {
    action: number;
    address: string;
    date: Timestamp;
    deviceNumber: string;
    id: string;
    name: string;
    network: string;
    receipts: string[];
    respondent: string;
    responses: any[];
    userPhone: string;
    source:string;
}
