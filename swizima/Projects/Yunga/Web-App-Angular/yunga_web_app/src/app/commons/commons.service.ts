import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, QuerySnapshot, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { Observable, flatMap, from, map, mergeMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonsService {

    constructor(public firestore: Firestore) { }


    getDocuments(collectionKey: string): Observable<DocumentData[]> {

        return from(getDocs(query(collection(this.firestore, collectionKey)))).pipe(map(querySnaphot => querySnaphot.docs.map(D => D.data())))

    }

    async addDocument(collectionKey: string, data: any) {

        console.log("adding Document ", data);

        //let ref:DocumentReference<DocumentData> = await addDoc(collection(this.firestore, "collectionKey"),data);

        const docRef = await addDoc(collection(this.firestore, collectionKey), {
            name: "Fredrirk testing",
            color: "Grean",
            age: 5
        });

        console.log("Document written with ID: ", docRef.id);

        //console.log(ref);
    }

}


