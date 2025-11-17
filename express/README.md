# Express Book Management Application

## Description
Une application web de gestion de livres avec authentification des utilisateurs, permettant de suivre les livres lus et la progression de lecture.

## Fonctionnalités
- ✅ Authentification utilisateur (inscription/connexion)
- ✅ Gestion de livres (ajout, suppression, modification)
- ✅ Suivi de progression de lecture
- ✅ Statistiques de lecture
- ✅ Interface utilisateur moderne avec Tailwind CSS

## Technologies utilisées
- **Backend**: Node.js, Express.js
- **Base de données**: MongoDB avec Mongoose
- **Authentification**: Passport.js avec stratégie locale
- **Vues**: Pug (template engine)
- **Styles**: Tailwind CSS
- **Sessions**: Express-session avec MongoDB store

## Installation et configuration

### Prérequis
- Node.js (version 14 ou supérieure)
- MongoDB (local ou Atlas)

### Installation
```bash
npm install
```

### Configuration de la base de données
1. Assurez-vous que MongoDB est en cours d'exécution sur `localhost:27017`
2. Ou modifiez la chaîne de connexion dans `config/db.js` pour utiliser MongoDB Atlas

### Démarrage de l'application
```bash
# Développement avec rechargement automatique
npm install -g nodemon
nodemon main.js

# Ou démarrage normal
node main.js
```

L'application sera accessible sur `http://localhost:3000`

## Structure du projet
```
├── main.js                 # Point d'entrée de l'application
├── books.js                # Routes pour la gestion des livres
├── users.js                # Routes pour la gestion des utilisateurs
├── config/
│   ├── db.js              # Configuration de la base de données
│   └── passport.js        # Configuration de l'authentification
├── middleware/
│   └── auth.js            # Middleware d'authentification
├── models/
│   ├── book.js            # Modèle Mongoose pour les livres
│   └── user.js            # Modèle Mongoose pour les utilisateurs
├── types/                 # Types TypeScript (référence)
├── views/                 # Templates Pug
└── package.json
```

## API Endpoints

### Authentification
- `GET /login` - Page de connexion
- `POST /login` - Connexion utilisateur
- `GET /register` - Page d'inscription
- `POST /register` - Inscription utilisateur
- `POST /logout` - Déconnexion

### Livres
- `GET /books` - Liste des livres
- `GET /books/tracker` - Suivi de lecture
- `GET /books/api/books` - API: Liste des livres (JSON)
- `POST /books/api/books` - API: Ajouter un livre
- `PUT /books/api/books/:id/progress` - API: Mettre à jour la progression
- `DELETE /books/api/books/:id` - API: Supprimer un livre

## Modèles de données

### User (Utilisateur)
```javascript
{
  username: String,    // Nom d'utilisateur unique
  password: String,    // Mot de passe haché
  createdAt: Date,     // Date de création
  updatedAt: Date      // Date de dernière modification
}
```

### Book (Livre)
```javascript
{
  title: String,              // Titre du livre
  author: String,             // Auteur
  numberOfPages: Number,      // Nombre total de pages
  numberOfPagesRead: Number,  // Pages lues
  status: String,            // Statut de lecture
  format: String,            // Format (Print, PDF, EBook, AudioBook)
  price: Number,             // Prix
  finished: Boolean,         // Livre terminé ou non
  year: Number,              // Année de publication
  genre: String,             // Genre
  description: String,       // Description
  publishedDate: Date,       // Date de publication
  createdAt: Date,           // Date de création
  updatedAt: Date            // Date de dernière modification
}
```

## Sécurité
- Mots de passe hachés avec bcrypt
- Sessions sécurisées avec MongoDB store
- Protection CSRF
- Validation des données d'entrée
- Middleware d'authentification

## Développement
Pour contribuer au projet :
1. Fork le repository
2. Créez une branche feature
3. Commitez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## License
ISC