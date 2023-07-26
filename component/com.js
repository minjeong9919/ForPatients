import React from 'react';
import firestore from '@react-native-firebase/firestore';

export const db = firestore().collection('GPS');

export async function getUser(id){
    const doc = await db.doc(id).get();
    return doc.data();
}