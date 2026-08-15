import React, { useState, useRef } from 'react';
import { useAuth } from './Auth';

export default function Admin({ products, setProducts }) {
  const { admin, login, logout } = useAuth();
  const [form, setForm] = useState({ name: '', price: '', category: 'Assises', description: '', image: null });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const preview = URL.createObjectURL(file);
      setForm({ ...form, image: preview });
    }
  };

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
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <i className="fi fi-rr-box-open" style={{fontSize: 20}}></i> Ajouter un produit
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Nom" onChange={e=>setForm({...form, name: e.target.value})}/>
          <input className="border p-2 rounded" placeholder="Prix (FCFA)" type="number" onChange={e=>setForm({...form, price: Number(e.target.value)})}/>
          <input className="border p-2 rounded" placeholder="Description" onChange={e=>setForm({...form, description: e.target.value})}/>
          <select className="border p-2 rounded" onChange={e=>setForm({...form, category: e.target.value})}>
            <option>Assises</option><option>Tables</option><option>Éclairage</option>
          </select>
          
          <div 
            className={`md:col-span-2 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${isDragging ? 'border-sage bg-sage/5' : 'border-stone-300 dark:border-zinc-700'}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => handleFile(e.target.files[0])} accept="image/*" />
            {form.image ? (
              <div className="relative inline-block">
                <img src={form.image} alt="Preview" className="h-32 rounded" />
                <button className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1" onClick={(e) => {e.stopPropagation(); setForm({...form, image: null})}}><i className="fi fi-rr-cross" style={{fontSize: 12}}></i></button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-stone-500">
                <i className="fi fi-rr-cloud-upload" style={{fontSize: 32}}></i>
                <p className="text-sm">Glissez une image ou cliquez pour sélectionner</p>
              </div>
            )}
          </div>

          <button className="button-primary md:col-span-2" onClick={() => setProducts([...products, {...form, id: Date.now().toString()}])}>
            <i className="fi fi-rr-box-open" style={{fontSize: 18}}></i> Ajouter le produit
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
              <button className="p-2 hover:text-sage"><i className="fi fi-rr-pencil" style={{fontSize: 16}}></i></button>
              <button onClick={() => setProducts(products.filter(x=>x.id!==p.id))} className="p-2 text-red-400 hover:text-red-600"><i className="fi fi-rr-trash" style={{fontSize: 16}}></i></button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
