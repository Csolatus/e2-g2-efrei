# WebCraft Solutions – Portail React

Migration du portail E1 (JavaScript natif) vers une application **React 18** componentisée : un catalogue de projets clients, un catalogue de formations et un formulaire d'inscription, alimentés par deux API REST.

**Stack :** React 18, React Router 6, Vite, Bootstrap 5 (CSS uniquement, aucune bibliothèque de composants).

## Lancer le projet

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production
```

## Architecture

```
src/
├── main.jsx               # Point d'entrée : BrowserRouter + styles
├── App.jsx                # Layout (Header, Routes, Footer)
├── App.css                # Styles globaux
├── pages/                 # Une page = une route
├── components/            # Composants d'interface réutilisables
├── hooks/                 # Logique réutilisable extraite des composants
├── utils/                 # Fonctions pures (validation, texte)
└── config/                # Constantes : URL d'API, catalogues, règles de formulaire
```

### Routes

| Route | Page | Contenu |
|---|---|---|
| `/` | `Home` | Hero, section Projets, section Formations |
| `/projets` | `ProjectsPage` | Section Projets seule |
| `/formations` | `CoursesPage` | Section Formations seule |
| `/inscription` | `InscriptionPage` | Formulaire (`?formation=<id>` pré-sélectionne la formation) |
| `*` | `NotFound` | Page introuvable |

### Flux de données

```
API ─► useFetch ─► useFilter ─► useSearch ─► cartes (ProjectCard / CourseCard)
                                                └─► Modal (ProjectDetails / CourseDetails)
```

Les deux sections du catalogue sont rendues par **un seul composant**, `CatalogSection`. Ce qui les distingue lui est injecté :
- la **configuration** (`config/catalog.js` : URL, champs de recherche, filtres) ;
- l'**affichage** (`renderCard`, `renderDetails`), fourni par `ProjectsSection` et `CoursesSection`.

Il n'y a donc aucun code dupliqué entre projets et formations : `SearchBar`, `FilterBar`, `Modal`, `Loader` et `ErrorMessage` servent dans les deux.

## Composants réutilisables

| Composant | Rôle | Utilisé par |
|---|---|---|
| `SearchBar` | Champ de recherche contrôlé | `CatalogSection` |
| `FilterBar` | Listes déroulantes pilotées par configuration | `CatalogSection` |
| `Modal` | Fenêtre modale générique (contenu via `children`) | `CatalogSection`, `InscriptionFields` |
| `Loader` / `ErrorMessage` | États de chargement et d'erreur | `CatalogSection`, `InscriptionForm` |
| `TechBadges` | Badges de technologies | Cartes et détails |
| `FormField` | Champ de formulaire (label, contrôle, aide, erreur) | `InscriptionFields` |

## Hooks personnalisés

| Hook | Rôle |
|---|---|
| `useFetch(url)` | Charge une API ; renvoie `{ data, isLoading, error }` ; annule la requête au démontage |
| `useFilter(items, filterFields)` | Filtre par listes ; compare par égalité ou par inclusion si le champ est un tableau |
| `useSearch(items, searchFields)` | Recherche insensible à la casse et aux accents |
| `useForm(initialValues, validate)` | État, erreurs et soumission d'un formulaire contrôlé |

## Choix techniques

- **Modale et menu burger en React pur.** Le JavaScript de Bootstrap manipule le DOM directement et entre en conflit avec le rendu React ; seules ses classes CSS sont utilisées.
- **Résultats calculés avec `useMemo`**, sans `useEffect` de synchronisation entre états.
- **Validation externalisée** dans `utils/validation.js` : des fonctions pures, sans dépendance à React ni au DOM, qui renvoient un message d'erreur ou une chaîne vide. Les règles (regex, bornes) sont dans `config/formRules.js`.
- **Erreurs de formulaire affichées à la demande** : sur un champ déjà quitté, ou sur tous après une tentative d'envoi.
- **Pas de prop drilling** : l'état reste au plus près des composants qui l'utilisent (la sélection de la modale est dans `CatalogSection`, l'état du formulaire dans `useForm`).

## Utilisation de l'IA

Je me suis servi de l'IA (Claude) pour : 
- l'**amélioration du CSS**
- la **correction de l'indentation**
- la **mise en forme des commentaires**
- la **justification des choix techniques**