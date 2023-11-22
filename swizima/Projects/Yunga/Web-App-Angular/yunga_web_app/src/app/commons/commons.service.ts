
import { Injectable } from '@angular/core';
import { DocumentData, Firestore, QueryConstraint, addDoc, and, collection, getDocs, query, where } from '@angular/fire/firestore';

//import { DocumentData, Firestore, addDoc, collection, getDocs, query } from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonsService {

    constructor(public firestore: Firestore) { }


    getDocuments(collectionKey: string): Observable<DocumentData[]> {

        return from(getDocs(query(collection(this.firestore, collectionKey)))).pipe(map(querySnaphot => querySnaphot.docs.map(D => D.data())))

    }

    addDocument(collectionKey: string, data: any): Observable<DocumentData> {

        console.log("adding Document in::  ", collectionKey);

        return from(addDoc(collection(this.firestore, collectionKey), data));
    }


    //QueryConstraint[]

    getDocumentsBy(collectionKey: string): Observable<DocumentData[]> {

        //queryConstraints: QueryConstraint[]=[];
        return from(getDocs(
            query(collection(this.firestore, collectionKey),
                and(where("date", ">", new Date('2023-11-22 00:00')),
                    where("date", "<=", new Date('2023-11-22 23:59')))

            )))
            .pipe(map(querySnaphot => querySnaphot.docs.map(D => D.data())))

    }
    getDoorBellsByDate(collectionKey: string, date: string): Observable<DocumentData[]> {

        //queryConstraints: QueryConstraint[]=[];
        return from(getDocs(
            query(collection(this.firestore, collectionKey),
                and(where("date", ">", new Date(`${date} 00:00`)),
                    where("date", "<=", new Date(`${date} 23:59`)))

            )))
            .pipe(map(querySnaphot => querySnaphot.docs.map(D => D.data())))

    }


    getAlarmsByDate(collectionKey: string, date: string): Observable<DocumentData[]> {
        
        return from(getDocs(
            query(collection(this.firestore, collectionKey),
                and(where("date", ">", new Date(`${date} 00:00`)),
                    where("date", "<=", new Date(`${date} 23:59`)))

            )))
            .pipe(map(querySnaphot => querySnaphot.docs.map(D => D.data())))

    }

}


