# Car Space — Backend

[![Backend checks](https://github.com/seiff-23/car-space-backend/actions/workflows/checks.yml/badge.svg)](https://github.com/seiff-23/car-space-backend/actions/workflows/checks.yml)

API de l'application Car Space pour l'authentification et la gestion des annonces automobiles. L'interface est disponible dans [car-space-frontend](https://github.com/seiff-23/car-space-frontend).

## Technologies

Node.js, Express 5, MongoDB, Mongoose, bcrypt, JWT et express-validator.

## Lancement local

Avec Node.js, npm et une instance MongoDB disponibles :

```bash
git clone https://github.com/seiff-23/car-space-backend.git
cd car-space-backend
npm ci
```

Copiez `.env.example` vers `.env` et configurez :

| Variable | Rôle |
| --- | --- |
| `PORT` | Port de l'API, 5000 dans l'exemple |
| `PORT_VITE` | Port du frontend autorisé par CORS, 3005 dans l'exemple |
| `DB_URI` | URI de votre instance MongoDB locale ou Atlas |
| `SECRET_KEY` | Secret aléatoire utilisé pour signer les JWT |

Remplacez la valeur d'exemple de `SECRET_KEY` par un secret aléatoire. Le fichier `.env` est exclu de Git.

```bash
npm run back
```

Le serveur répond sur http://localhost:5000. Lancez le frontend dans un second terminal ; son proxy Vite redirige `/api` vers ce port.

## Commandes

| Commande | Rôle |
| --- | --- |
| `npm run back` | Développement avec nodemon |
| `npm start` | Démarrage avec Node.js |
| `npm test` | Tests de régression de l'authentification |

Le script historique `npm run dev` lance aussi un frontend dans le dossier voisin `carspace-front`. Si vos dépôts ont leurs noms GitHub habituels, lancez les deux serveurs séparément avec les commandes ci-dessus et le guide du frontend.

## API

- `/api/auth` : inscription, connexion et utilisateur courant.
- `/api/cars` : gestion des annonces.

Le middleware d'authentification actuel attend le JWT brut dans l'en-tête `Authorization`, comme le frontend existant.

## Vérification

GitHub Actions exécute les quatre tests d'authentification sur les pushes et les pull requests. Ils couvrent les droits à l'inscription, l'absence de hash de mot de passe dans les réponses et les erreurs de connexion. Les accès à la base et les opérations de session sont simulés : aucun MongoDB ni identifiant de production n'est nécessaire.

Ces tests ne remplacent pas une vérification complète des parcours avec une base réelle.
