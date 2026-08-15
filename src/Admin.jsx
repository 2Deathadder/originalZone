import React, { useState } from 'react';
import { useAuth } from './Auth';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function Admin({ products, setProducts }) {
  const { admin, login, logout } = useAuth();
  const [form, setForm] = useState({ name: '', price: '', category: 'Assises', description: '', image: 'https://picsum.photos/seed/picsum/400/400' });

  if (!admin) return (
    <main className="shell py-20">
      <form className="surface p-8 max-w-sm mx-auto" onSubmit={(e) => { e.preventDefault(); if(!login(e.target.u.value, e.target.p.value)) alert('Accès refusé'); }}>
        <h2 className="text-xl font-bold mb-6">Connexion Admin</h2>
        <input name="u" className="w-full border p-2 mb-4 rounded" placeholder="Identifiant" required />
        <input name="p" type="password" className="w-full border p-2 mb-4 rounded" placeholder="Mot de passe" required />
        <button className="button-primary w-full">Entrer</button>
      </form>
    </main>
  );

  return (
    <main className="shell py-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">Gestion Catalogue</h1>
        <button onClick={logout} className="text-red-500 font-medium">Déconnexion</button>
      </div>
      
      <section className="surface p-6 mb-10">
        <h2 className="text-lg font-bold mb-4">Ajouter un produit</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Nom" onChange={e=>setForm({...form, name: e.target.value})}/>
          <input className="border p-2 rounded" placeholder="Prix (FCFA)" type="number" onChange={e=>setForm({...form, price: Number(e.target.value)})}/>
          <input className="border p-2 rounded" placeholder="Description" onChange={e=>setForm({...form, description: e.target.value})}/>
          <select className="border p-2 rounded" onChange={e=>setForm({...form, category: e.target.value})}>
            <option>Assises</option><option>Tables</option><option>Éclairage</option>
          </select>
          <button className="button-primary md:col-span-2" onClick={() => setProducts([...products, {...form, id: Date.now().toString()}])}>
            <Plus size={18} className="mr-2"/> Ajouter
          </button>
        </div>
      </section>

      <div className="grid gap-4">
        {products.map(p => (
          <div key={p.id} className="surface p-4 flex items-center justify-between">
            <div>
              <p className="font-bold">{p.name}</p>
              <p className="text-sm text-sage">{p.price} FCFA</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:text-sage"><Edit2 size={16}/></button>
              <button onClick={() => setProducts(products.filter(x=>x.id!==p.id))} className="p-2 text-red-500"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
