export const products = [
  { id: 'luna', name: 'Fauteuil Luna', category: 'Assises', brand: 'Atelier Noma', price: 690, color: 'Sauge', sizes: ['Unique'], stock: 8, rating: 4.9, reviews: 24, image: '/assets/photo-1.jpg', description: 'Une assise enveloppante aux lignes simples, pensée pour ralentir le rythme.' },
  { id: 'sillage', name: 'Table Sillage', category: 'Tables', brand: 'Forme Studio', price: 1240, color: 'Chêne clair', sizes: ['160 cm', '200 cm'], stock: 4, rating: 4.8, reviews: 18, image: '/assets/photo-2.jpg', description: 'Une table aux proportions calmes, fabriquée en chêne massif huilé.' },
  { id: 'halo', name: 'Lampe Halo', category: 'Éclairage', brand: 'Ligne 27', price: 185, color: 'Laiton mat', sizes: ['Petite', 'Grande'], stock: 17, rating: 4.7, reviews: 31, image: '/assets/photo-3.jpg', description: 'Une lumière douce et orientable pour les coins où l’on aime rester.' },
  { id: 'nacre', name: 'Miroir Nacre', category: 'Décoration', brand: 'Atelier Noma', price: 320, color: 'Ivoire', sizes: ['80 cm'], stock: 0, rating: 4.6, reviews: 12, image: '/assets/photo-1.jpg', description: 'Un miroir organique qui capte la lumière sans prendre toute la place.' }
]
export const categories = ['Toutes', 'Assises', 'Tables', 'Éclairage', 'Décoration']
export const formatPrice = value => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
