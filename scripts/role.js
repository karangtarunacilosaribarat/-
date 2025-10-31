
import { db, APP_ID } from './firebase.js';
import {
  collectionGroup, getDocs, doc, setDoc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export const ALL_ROLES = ['superadmin','ketua','wakil_ketua','sekretaris','bendahara','sie_sosial','sie_olahraga','sie_umkm','sie_keamanan','sie_humas','anggota'];

export async function renderRoleManager(container){
  container.innerHTML = '<div class="card rounded" style="padding:12px"><h3>Role User</h3><div id="role-list"></div></div>';
  const list = container.querySelector('#role-list');
  const cg = await getDocs(collectionGroup(db, 'profile'));
  const rows = [];
  cg.forEach(d=>{
    if (!d.ref.path.includes(`/artifacts/${APP_ID}/`)) return;
    const v = d.data()||{};
    const uid = d.ref.path.split('/')[4];
    const options = ALL_ROLES.map(r=>`<option value="${r}" ${r===(v.role||'anggota')?'selected':''}>${r}</option>`).join('');
    rows.push(`<div class="item" style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px dashed rgba(255,255,255,.12)">
      <div><div class="font-semibold">${v.name||v.email||uid}</div><div class="badge">${uid}</div></div>
      <div style="display:flex;gap:8px;align-items:center">
        <select data-uid="${uid}" class="input"><option disabled>Pilih role</option>${options}</select>
        <button class="btn" data-save="${uid}">Simpan</button>
      </div>
    </div>`);
  });
  list.innerHTML = rows.join('') || '<div class="text-gray-300">Belum ada user.</div>';
  list.querySelectorAll('[data-save]').forEach(btn=>{
    btn.onclick = async ()=>{
      const uid = btn.getAttribute('data-save');
      const sel = list.querySelector(`select[data-uid="${uid}"]`);
      const ref = doc(db, 'artifacts', APP_ID, 'users', uid, 'data', 'profile');
      await setDoc(ref, { role: sel.value }, { merge:true });
      alert('Role disimpan: '+sel.value);
    };
  });
}
