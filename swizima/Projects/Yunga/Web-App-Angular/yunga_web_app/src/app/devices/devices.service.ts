import { Injectable } from '@angular/core';
import { DocumentData, Firestore, QuerySnapshot, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { Observable, flatMap, from, map, mergeMap } from 'rxjs';
import { DeviceDto } from './devices.dto';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
 

}

