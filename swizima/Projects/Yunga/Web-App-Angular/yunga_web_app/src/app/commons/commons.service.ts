import { Injectable } from '@angular/core';
import { DocumentData, Firestore, QuerySnapshot, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { Observable, flatMap, from, map, mergeMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonsService {

    constructor(public firestore: Firestore) { }


    getDocuments(collectionKey: string): Observable<DocumentData[]> {

        return from(getDocs(query(collection(this.firestore, collectionKey)))).pipe(map(querySnaphot => querySnaphot.docs.map(D => D.data())))

    }

}


