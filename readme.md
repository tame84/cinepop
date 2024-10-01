# Cinepop
Cinepop permet d'afficher toute la programmation des films (cinémas indépendants inclus) du Brabant Wallon sur une période de 7 jours.

## Dépendances
- [Axios](https://www.axios.com/)
- [dotenv](https://github.com/motdotla/dotenv#readme)
- [jsdom](https://github.com/jsdom/jsdom#readme)
- [Leaflet](https://leafletjs.com/)
- [Next.js](https://nextjs.org/)
- [Node.js](https://nodejs.org/)
- [node-postgres](https://node-postgres.com/)
- [Node Cron](https://github.com/node-cron/node-cron#readme)
- [PostreSQL](https://www.postgresql.org/)
- [Sass](https://sass-lang.com/)

## Démarrer
### Variables d'environnements
Créer une fichier `.env` à la racine des fichiers `backend` et `frontend` qui contient :
```bash
POSTGRE_USER=
POSTGRE_PASSWORD=
POSTGRE_HOST=
POSTGRE_PORT=
POSTGRE_DATABASE=
```

### Initialisation
#### Backend
Exécuter les commandes suivantes :
```bash
npm install
npm run start
```
Le script à recours à Node Cron pour se déclencher automatiquement à 00h tout les jours, pour le lancer manuellement il faut ajouter un appel aux fonction `scrapeMovies()` et `addToDatabase()` de manière asynchrone :
```javascript
// index.js

const movies = await scrapeMovies();
await addToDatabase(movies);
```

#### Frontend
Exécuter les commandes suivantes :
```bash
npm install
npm run dev
```

#### Base de données
Exécuter les commandes SQL se trouvant dans le fichier `createTable.sql`.

## Sources
- Sur une idée originale de [Solène DRN](https://www.youtube.com/c/Sol%C3%A8neDRN/videos)
- Ce projet est uniquement à but éducatif, je m'autorise donc à scraper le site de [Cinenews](https://www.cinenews.be/fr/) pour l'exercice.
- [Reset CSS](https://github.com/elad2412/the-new-css-reset#readme)
