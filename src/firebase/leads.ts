'use client';

import {
  collection,
  addDoc,
  serverTimestamp,
  getFirestore,
} from 'firebase/firestore';
import { errorEmitter }from './error-emitter';
import { FirestorePermissionError } from './errors';
import { initializeFirebase } from '.';

export type Lead = {
  name: string;
  email: string;
  company: string;
  message?: string;
};

export function addLead(lead: Lead) {
    const { firestore } = initializeFirebase();
    if (!firestore) {
        throw new Error("Firestore is not initialized");
    }

    const leadsCollection = collection(firestore, 'leads');

    addDoc(leadsCollection, {
        ...lead,
        createdAt: serverTimestamp(),
    }).catch((e: any) => {
        const permissionError = new FirestorePermissionError({
            path: leadsCollection.path,
            operation: 'create',
            requestResourceData: lead,
        });

        errorEmitter.emit('permission-error', permissionError);

        // We are not re-throwing the error to the client.
        // The client will show a generic error toast.
    });
}
