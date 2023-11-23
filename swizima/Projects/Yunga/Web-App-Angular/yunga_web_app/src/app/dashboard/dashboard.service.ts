import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { AlarmDto, DeviceDto, DoorBellDto } from "../devices/devices.dto";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    onlineDevicesSubject = new BehaviorSubject<DeviceDto[]>([]);

    deviceAlarmSubject = new BehaviorSubject<AlarmDto[]>([]);

    deviceDoorbellSubject = new BehaviorSubject<DoorBellDto[]>([]);

}