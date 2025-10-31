
import { db, APP_ID } from './firebase.js';
import {
  collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy, serverTimestamp, getDoc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export async function listDocs(col, order=['createdAt','desc']){
  const ref = collection(db, 'artifacts', APP_ID, col);
  const q = order ? query(ref, orderBy(order[0], order[1])) : ref;
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id:d.id, ...d.data() }));
}
export async function getOne(col, id){
  const ref = doc(db, 'artifacts', APP_ID, col, id);
  const s = await getDoc(ref); return { id, ...s.data() };
}
export async function addDocCol(col, data){
  const ref = collection(db, 'artifacts', APP_ID, col);
  if (!data.createdAt) data.createdAt = serverTimestamp();
  return await addDoc(ref, data);
}
export async function updateDocCol(col, id, data){
  const ref = doc(db, 'artifacts', APP_ID, col, id);
  return await updateDoc(ref, data);
}
export async function deleteDocCol(col, id){
  const ref = doc(db, 'artifacts', APP_ID, col, id);
  return await deleteDoc(ref);
}
