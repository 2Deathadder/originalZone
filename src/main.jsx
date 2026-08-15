import React, { createContext, useContext, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate, useParams, Navigate } from 'react-router-dom'
import { ShoppingCart, User, Sun, Moon, Search, Menu, ArrowRight, Trash2, Edit2, LogOut } from 'lucide-react'
import { products as initialProducts, categories, formatPrice } from './data'
import './index.css'

const AuthContext = createContext(null)
function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => localStorage.getItem('oz-admin-auth') === 'true')
  const [creds, setCreds] = useState(() => JSON.parse(localStorage.getItem('oz-admin-creds')) || { u: 'admin', p: 'admin' })
  const login = (u, p) => { if (u === creds.u && p === creds.p) { setAdmin(true); localStorage.setItem('oz-admin-auth', 'true'); return true } return false }
  const logout = () => { setAdmin(false); localStorage.removeItem('oz-admin-auth') }
  return <AuthContext.Provider value={{admin, login, logout, creds, setCreds}}>{children}</AuthContext.Provider>
}

const CartContext = createContext(null)
function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('oz-cart') || '[]'))
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('oz-products')) || initialProducts)
  useEffect(() => localStorage.setItem('oz-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('oz-products', JSON.stringify(products)), [products])
  const add = (product) => setCart(items => { const found = items.find(x => x.id === product.id); return found ? items.map(x => x.id === product.id ? {...x, qty: x.qty + 1} : x) : [...items, {...product, qty: 1}] })
  const update = (id, qty) => setCart(items => qty < 1 ? items.filter(x => x.id !== id) : items.map(x => x.id === id ? {...x, qty} : x))
  return <CartContext.Provider value={{cart, add, update, products, setProducts, total: cart.reduce((s, x) => s + x.price * x.qty, 0)}}>{children}</CartContext.Provider>
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('oz-theme') === 'dark' || (!localStorage.getItem('oz-theme') && matchMedia('(prefers-color-scheme: dark)').matches))
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('oz-theme', dark ? 'dark' : 'light') }, [dark])
  return <button className=\"rounded-full p-2 hover:bg-stone-100 dark:hover:bg-zinc-800\" onClick={() => setDark(!dark)}>{dark ? <Sun size={20}/> : <Moon size={20}/>}</button>
}

function Header() { const { count } = useContext(CartContext); return <header className=\"sticky top-0 z-20 border-b border-stone-200/80 bg-paper/95 backdrop-blur\"><div className=\"shell flex h-20 items-center justify-between\"><Link to=\"/\" className=\"font-display text-xl font-bold\">Original<span className=\"text-sage\">Zone</span></Link><div className=\"flex items-center gap-4\"><ThemeToggle/><Link to=\"/panier\"><ShoppingCart size={20}/></Link></div></div></header> }

function Admin() {
  const { admin, login, logout, creds, setCreds } = useContext(AuthContext)
  const { products, setProducts } = useContext(CartContext)
  const [edit, setEdit] = useState(null)
  const [form, setForm] = useState({ name: '', price: '', category: 'Assises', description: '', image: 'https://picsum.photos/seed/picsum/400/400' })

  if (!admin) return <main className=\"shell py-20\"><form className=\"surface p-8 max-w-sm mx-auto\" onSubmit={(e) => { e.preventDefault(); if(!login(e.target.u.value, e.target.p.value)) alert('Err') }}>
    <h2 className=\"font-display text-2xl mb-6\">Admin Login</h2>
    <input name=\"u\" className=\"w-full border p-2 mb-4 rounded\" placeholder=\"Identifiant\" required/>
    <input name=\"p\" type=\"password\" className=\"w-full border p-2 mb-4 rounded\" placeholder=\"Mot de passe\" required/>
    <button className=\"button-primary w-full\">Connexion</button>
  </form></main>

  return <main className=\"shell py-10\">
    <div className=\"flex justify-between mb-10\">
      <h1 className=\"font-display text-3xl\">Back-office</h1>
      <button onClick={logout} className=\"text-red-500\">Déconnexion</button>
    </div>
    <div className=\"grid lg:grid-cols-2 gap-10\">
      <div className=\"surface p-6\">
        <h2 className=\"font-semibold mb-4\">{edit ? 'Modifier produit' : 'Ajouter produit'}</h2>
        <form className=\"grid gap-4\" onSubmit={(e) => { e.preventDefault(); if(edit) setProducts(products.map(p=>p.id===edit.id?{...p,...form}:p)); else setProducts([...products, {...form, id: Date.now().toString()}]); setEdit(null); setForm({name: '', price: '', category: 'Assises', description: '', image: 'https://picsum.photos/seed/picsum/400/400'}) }}>
          <input className=\"border p-2 rounded\" placeholder=\"Nom\" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required/>
          <input className=\"border p-2 rounded\" placeholder=\"Prix (FCFA)\" type=\"number\" value={form.price} onChange={e=>setForm({...form, price: Number(e.target.value)})} required/>
          <button className=\"button-primary\">{edit ? 'Enregistrer' : 'Ajouter'}</button>
        </form>
      </div>
      <div>
        {products.map(p => <div key={p.id} className=\"surface flex items-center p-4 mb-3\">
          <span className=\"flex-1\">{p.name}</span>
          <button onClick={() => { setEdit(p); setForm(p) }} className=\"p-2\"><Edit2 size={16}/></button>
          <button onClick={() => { if(confirm('Supprimer ?')) setProducts(products.filter(x=>x.id!==p.id)) }} className=\"p-2 text-red-500\"><Trash2 size={16}/></button>
        </div>)}
      </div>
    </div>
  </main>
}

function App(){return <AuthProvider><CartProvider><Header/><Routes><Route path=\"/\" element={<div>Home - <Link to=\"/admin\">Admin</Link></div>}/><Route path=\"/admin\" element={<Admin/>}/></Routes></CartProvider></AuthProvider>}
createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>)