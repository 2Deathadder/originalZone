import React, { createContext, useContext, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes, useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Sun, Moon, Search, Menu, ArrowRight, Trash2, Edit2, LogOut, Package, Star, ChevronRight } from 'lucide-react'
import './index.css'

// -- DONNÉES ET CONTEXTES --
const initialProducts = [
  { id: '1', name: 'Fauteuil Luna', category: 'Assises', price: 69000, image: 'https://picsum.photos/seed/luna/400/400', description: 'Confort absolu et design organique.' },
  { id: '2', name: 'Table Ovale', category: 'Tables', price: 125000, image: 'https://picsum.photos/seed/table/400/400', description: 'Ligne épurée en bois clair.' }
]

const formatPrice = value => `${new Intl.NumberFormat('fr-FR').format(value)} FCFA`

const AuthContext = createContext(null)
const CartContext = createContext(null)

function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(localStorage.getItem('oz-admin-auth') === 'true')
  const login = (u, p) => { if (u === 'admin' && p === 'admin') { setAdmin(true); localStorage.setItem('oz-admin-auth', 'true'); return true } return false }
  const logout = () => { setAdmin(false); localStorage.removeItem('oz-admin-auth') }
  return <AuthContext.Provider value={{admin, login, logout}}>{children}</AuthContext.Provider>
}

function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState(initialProducts)
  const add = (p) => setCart(prev => [...prev, p])
  return <CartContext.Provider value={{cart, products, setProducts, add}}>{children}</CartContext.Provider>
}

// -- COMPOSANTS UI --
function ThemeToggle() {
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'))
  const toggle = () => { document.documentElement.classList.toggle('dark'); setDark(!dark) }
  return <button className="p-2 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-full" onClick={toggle}>{dark ? <Sun size={20}/> : <Moon size={20}/>}</button>
}

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-paper/95 backdrop-blur dark:bg-zinc-950/95 dark:border-zinc-800">
      <div className="shell flex h-20 items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold">Original<span className="text-sage">Zone</span></Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link to="/catalogue">Catalogue</Link>
          <a href="#approche">Notre approche</a>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle/>
          <Link to="/panier"><ShoppingCart size={20}/></Link>
          <Link to="/compte"><User size={20}/></Link>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return <footer className="py-12 border-t border-stone-200 dark:border-zinc-800 mt-20"><div className="shell text-center text-sm text-stone-500">© 2025 OriginalZone. Tous droits réservés.</div></footer>
}

// -- PAGES --
function Home() {
  const { products } = useContext(CartContext)
  return (
    <main>
      <section className="shell py-20 text-center">
        <h1 className="text-5xl font-display mb-6">Objets qui trouvent <br/> leur place.</h1>
        <Link to="/catalogue" className="button-primary">Découvrir la collection</Link>
      </section>
      <section id="approche" className="bg-stone-100 dark:bg-zinc-900 py-20">
        <div className="shell grid md:grid-cols-3 gap-10">
          {['Design Intemporel', 'Qualité Artisanale', 'Éco-responsable'].map(f => <div key={f} className="p-6 surface">{f}</div>)}
        </div>
      </section>
      <section className="shell py-20">
        <h2 className="text-3xl font-display mb-10">Sélection</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(p => <div key={p.id} className="surface p-4"><img src={p.image} className="w-full h-48 object-cover mb-4 rounded-lg"/><h3>{p.name}</h3><p className="text-sage font-bold">{formatPrice(p.price)}</p></div>)}
        </div>
      </section>
    </main>
  )
}

function Admin() {
  const { admin, login, logout } = useContext(AuthContext)
  const { products, setProducts } = useContext(CartContext)
  const [form, setForm] = useState({ name: '', price: '', category: 'Assises' })

  if (!admin) return <main className="shell py-20"><form className="surface p-8 max-w-sm mx-auto" onSubmit={(e) => { e.preventDefault(); if(!login(e.target.u.value, e.target.p.value)) alert('Accès refusé') }}>
    <input name="u" className="w-full border p-2 mb-4" placeholder="Admin"/><input name="p" type="password" className="w-full border p-2 mb-4" placeholder="MDP"/><button className="button-primary w-full">Entrer</button>
  </form></main>

  return <main className="shell py-10">
    <div className="flex justify-between mb-10"><h1>Panier Admin</h1><button onClick={logout} className="text-red-500">Quitter</button></div>
    <form className="surface p-6 mb-10 grid gap-4" onSubmit={(e) => { e.preventDefault(); setProducts([...products, {...form, id: Date.now().toString()}]) }}>
      <input className="border p-2" placeholder="Nom" onChange={e=>setForm({...form, name: e.target.value})}/>
      <input className="border p-2" placeholder="Prix" type="number" onChange={e=>setForm({...form, price: Number(e.target.value)})}/>
      <button className="button-primary">Ajouter Produit</button>
    </form>
    <div className="grid gap-2">{products.map(p => <div key={p.id} className="surface p-4 flex justify-between">{p.name} <button onClick={() => setProducts(products.filter(x=>x.id!==p.id))} className="text-red-500"><Trash2 size={16}/></button></div>)}</div>
  </main>
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/catalogue" element={<main className="shell py-20">Catalogue en construction...</main>}/>
          <Route path="/panier" element={<main className="shell py-20">Votre panier est vide.</main>}/>
          <Route path="/compte" element={<main className="shell py-20">Connectez-vous.</main>}/>
        </Routes>
        <Footer/>
      </CartProvider>
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>)
