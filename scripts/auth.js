
import { auth, db, APP_ID } from './firebase.js';
import {
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  doc, getDoc, setDoc, collection, getDocs
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export function watchAuthChanges(){
  onAuthStateChanged(auth, async (user)=>{
    const uw = document.getElementById('user-widget');
    if (!uw) return;
    if (!user) { uw.classList.add('hidden'); return; }
    const ref = doc(db, 'artifacts', APP_ID, 'users', user.uid, 'data', 'profile');
    const snap = await getDoc(ref);
    const data = snap.data() || {};
    document.getElementById('user-name').textContent = data.name || (user.email?user.email.split('@')[0]:'Pengguna');
    document.getElementById('user-role').textContent = (data.role||'anggota').toUpperCase();
    document.getElementById('user-avatar').src = data.photoUrl || './assets/img/logo.png';
    document.getElementById('user-widget').classList.remove('hidden');
  });
}

export async function handleLogin(email, pass){
  await signInWithEmailAndPassword(auth, email, pass);
}

export async function handleRegister(name, email, pass){
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  const uid = cred.user.uid;
  // check if first superadmin
  const usersCg = await getDocs(collection(db, 'artifacts', APP_ID, 'users'));
  const isFirst = usersCg.size === 0;
  const role = isFirst ? 'superadmin' : 'anggota';
  const ref = doc(db, 'artifacts', APP_ID, 'users', uid, 'data', 'profile');
  await setDoc(ref, { name, email, role, createdAt: new Date().toISOString() }, { merge:true });
}

export async function doLogout(){
  await signOut(auth);
}
