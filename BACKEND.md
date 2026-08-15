# Backend OriginalZone

Firebase Firestore est utilisé côté client pour le prototype. Les opérations sensibles de paiement, réservation de stock et webhooks doivent être déplacées dans des fonctions serveur avant production.

## Collections

- `products`: `name`, `slug`, `description`, `categoryId`, `brand`, `price`, `currency`, `media[]`, `variants[]`, `stock`, `lowStockThreshold`, `active`, `createdAt`, `updatedAt`.
- `categories`: `name`, `slug`, `description`, `image`, `active`, `sortOrder`.
- `users`: `displayName`, `email`, `role` (`customer` ou `merchant`), `addresses[]`, `createdAt`.
- `carts`: `userId` ou `guestToken`, `items[]`, `subtotal`, `updatedAt`.
- `orders`: `userId` facultatif, `guestEmail`, `items[]`, `shippingAddress`, `deliveryMethod`, `paymentProvider`, `paymentStatus`, `fulfillmentStatus`, `total`, `createdAt`.
- `reviews`: `productId`, `userId`, `rating`, `body`, `status`, `createdAt`.
- `promotions`: `code`, `type`, `value`, `startsAt`, `endsAt`, `active`.
- `auditLogs`: `actorId`, `action`, `entity`, `entityId`, `createdAt`.

## Relations

`products.categoryId` référence `categories`. `orders.userId`, `reviews.userId` et `carts.userId` référencent `users`. `reviews.productId` référence `products`. Les lignes de commande conservent un snapshot du nom, prix et variante pour préserver l'historique.

## CRUD prévu

- Catalogue: lecture publique des produits actifs et catégories; création, modification, médias, variantes et suppression logique par un commerçant.
- Stocks: lecture et mise à jour réservée au commerçant; réservation atomique côté serveur lors du paiement.
- Panier: création, ajout, modification et suppression par son propriétaire ou son token invité.
- Checkout: création d'une commande `pending`, création d'une session Stripe/PayPal côté serveur, confirmation uniquement par webhook signé.
- Commandes: lecture par le client de ses commandes; lecture et changement de statut par le commerçant; remboursements via le prestataire de paiement côté serveur.
- Avis et promotions: création/modération des avis et CRUD des promotions par les rôles autorisés.

Les règles présentes dans `firestore.rules` doivent être collées manuellement dans la console Firebase. Le paiement ne doit jamais être confirmé uniquement depuis le navigateur.
