# P7 - Créez un réseau social d'entreprise
## Compétences évaluées
- Gérer un stockage de données à l'aide de SQL
- Personnaliser le contenu envoyé à un client web
- Implémenter un stockage de données sécurisé en utilisant SQL
- Authentifier un utilisateur et maintenir sa session 
# Backend
## Prérequis avant l'installation du projet
Pour installer ce projet veuillez vous procurer 
- Node.js
- MySQL
- Vue.js
- Xaamp
### Installation
- Clone le Repository
- Importer le fichier Groupomania.sql dans PhPMyAdmin
- Configurer Xampp puis lancer Apache et MySQL avec le bon PORT 
- Dans le terminal de VSCODE, situez-vous dans le dossier /backend avec la commande cd .\backend\.
- Démarrer npm install pour installer toutes les dependencies du backend puis npm run server pour le lancer.
- Dans le fichier .env, veuillez rentrer le PORT, la SECRET_KEY, la DB_USER, la DB_HOST, le DB_PASSWORD, la DB_DATABASE et le DB_PORT
### Development server
Le serveur ce mettra automatiquement à jour avec nodemon
# Frontend
Le frontend a été crée avec Vue.js, CLI, VueX et Axios
### Installation
Deplacer vous dans le dossier frontend avec cd .\frontend\, puis démarrez npm install pour installer toutes les dépendances du frontend.
### Development server
Démarrer npm run serve pour avoir accès au serveur de développement. L'application va se recharger automatiquement si vous modifiez un fichier.
# Base de données
### Ajouter un compte admin
Depuis PhPMyAdmin dans la TABLE Users veuillez changer la propriéter isAdmin du compte que vous voulez rajouter en Administrateur, 1 Pour Admin et 0 pour un Utilisateur.
