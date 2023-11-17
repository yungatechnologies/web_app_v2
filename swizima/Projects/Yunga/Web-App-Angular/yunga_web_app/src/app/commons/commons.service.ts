
import { Injectable } from '@angular/core';
import { DocumentData, Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
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

}


