export const products = [
  { id: 'luna', name: 'Fauteuil Luna', category: 'Assises', brand: 'Atelier Noma', price: 69000, color: 'Sauge', sizes: ['Unique'], stock: 8, rating: 4.9, reviews: 24, image: 'https://picsum.photos/seed/luna/400/400', description: '...' }
]
export const categories = ['Assises', 'Tables', 'Éclairage', 'Décoration']
export const formatPrice = value => `${new Intl.NumberFormat('fr-FR').format(value)} FCFA`