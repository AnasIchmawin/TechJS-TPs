# TP: Book Reading Tracker - Réalisation Complète

## 📋 Exigences du TP vs Implémentation

### ✅ 1. Fichier HTML avec formulaire d'enregistrement de livres
**Exigence :** Create an HTML file where we have a form that register new books (use tailwindCSS to style it)

**Implémentation :** 
- ✅ Fichier HTML statique : `/static/book-registration.html`
- ✅ Stylé avec TailwindCSS
- ✅ Formulaire complet avec validation côté client
- ✅ Accessible via : `http://localhost:3000/tp` ou `http://localhost:3000/static/book-registration.html`

### ✅ 2. Propriétés du livre
**Exigence :** Each book have: title(string), author(string), number of pages(number), status(String Enum), price (number), number of pages read (number < number of pages), format(String Enum), suggested by(string), finished(boolean)

**Implémentation :**
- ✅ **title** : string, requis
- ✅ **author** : string, requis  
- ✅ **numberOfPages** : number, requis
- ✅ **status** : enum avec valeurs exactes du TP
- ✅ **price** : number
- ✅ **numberOfPagesRead** : number (validé < numberOfPages)
- ✅ **format** : enum avec valeurs exactes du TP
- ✅ **suggestedBy** : string
- ✅ **finished** : boolean

### ✅ 3. Énumérations Status et Format
**Exigence :** 
- Status: Read, Re-read, DNF, Currently reading, Returned, Unread, Want to read
- Format: Print, PDF, Ebook, AudioBook

**Implémentation :**
- ✅ Status : enum complet dans `/types/enums/Status.ts` et modèle Mongoose
- ✅ Format : enum complet dans `/types/enums/Format.ts` et modèle Mongoose
- ✅ Validation stricte dans les formulaires et API

### ✅ 4. Logique automatique finished
**Exigence :** By default finished is equal to 0, the finished value will change to 1 automatically when number of pages read is equal to number of pages

**Implémentation :**
- ✅ `finished` par défaut à `false` (0)
- ✅ Passe automatiquement à `true` (1) quand `numberOfPagesRead >= numberOfPages`
- ✅ Logique implémentée dans la classe Book et l'API
- ✅ Status passe automatiquement à "Read" quand terminé

### ✅ 5. Classe Book avec méthodes requises
**Exigence :** Create a class book have the following methods: a constructor, currentlyAt, deleteBook. The book class should be its own module.

**Implémentation :**
- ✅ Classe `Book` dans `/classes/Book.js` (module séparé)
- ✅ **constructor** : complet avec tous les paramètres
- ✅ **currentlyAt()** : retourne `numberOfPagesRead`
- ✅ **deleteBook()** : méthode implémentée
- ✅ Méthodes bonus : `setCurrentlyAt()`, `getReadingPercentage()`, `validate()`

### ✅ 6. Page web de suivi de lecture
**Exigence :** Create a web page where we can track our reading by listing books and showing the percentage of reading for each book, and a global section where you can see the total amount of book read and the amount of pages

**Implémentation :**
- ✅ Page `/books/tracker` avec interface complète
- ✅ Liste tous les livres avec pourcentage de lecture
- ✅ Section globale avec statistiques :
  - Total de livres
  - Livres lus
  - Total de pages  
  - Pages lues
  - Pourcentage global de progression
- ✅ Interface responsive et moderne

### ✅ 7. Stockage MongoDB
**Exigence :** The books are stored in MongoDB

**Implémentation :**
- ✅ Base de données MongoDB : `expressDB`
- ✅ Collection `books` avec schéma Mongoose complet
- ✅ Validation des données côté serveur
- ✅ CRUD complet via API REST

## 🚀 Comment tester le TP

### 1. Page HTML statique (Exigence principale du TP)
```
http://localhost:3000/tp
```
- Formulaire d'enregistrement complet
- Gestion locale avec localStorage
- Classe Book implémentée côté client
- Statistiques en temps réel

### 2. Application web complète
```
http://localhost:3000
```
- Authentification utilisateur
- Interface MongoDB complète
- API REST fonctionnelle
- Suivi de progression avancé

## 📁 Structure des fichiers

```
├── main.js                     # Serveur Express principal
├── books.js                    # Routes API books
├── classes/Book.js             # Classe Book (module séparé)
├── models/book.js              # Modèle Mongoose
├── static/book-registration.html # Page HTML statique du TP
├── views/                      # Templates Pug
├── types/enums/               # Énumérations TypeScript
└── config/                    # Configuration DB
```

## 🔧 Fonctionnalités supplémentaires

Au-delà des exigences du TP, l'application inclut :
- 🔐 Authentification sécurisée
- 📊 Statistiques avancées
- 🎨 Interface moderne avec TailwindCSS
- ✅ Validation complète des données
- 🔄 API REST complète
- 📱 Design responsive
- 🔒 Sécurité et bonnes pratiques

## ✅ Validation des exigences

| Exigence | Status | Localisation |
|----------|--------|--------------|
| HTML + formulaire TailwindCSS | ✅ | `/static/book-registration.html` |
| Propriétés du livre complètes | ✅ | Classe `Book` + Modèle Mongoose |
| Énumérations Status/Format | ✅ | `/types/enums/` + validation |
| Logique auto finished | ✅ | Classe `Book.setCurrentlyAt()` |
| Classe Book module séparé | ✅ | `/classes/Book.js` |
| Page suivi + pourcentages | ✅ | `/books/tracker` |
| Stockage MongoDB | ✅ | Collection `books` |

**Résultat : 7/7 exigences remplies ✅**

Le TP est entièrement fonctionnel et respecte toutes les exigences demandées !