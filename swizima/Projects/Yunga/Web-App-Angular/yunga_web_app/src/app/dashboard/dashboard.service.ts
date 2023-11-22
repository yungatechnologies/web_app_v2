import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { DeviceDto } from "../devices/devices.dto";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    onlineDevicesSubject = new BehaviorSubject<DeviceDto[]>([]);

}