import { API_PROJECTS_URL, API_COURSES_URL } from './api.js';

/**
 * Configuration des deux catalogues.
 * - `itemsKey` : clé du tableau d'éléments dans la réponse de l'API.
 * - `filters` : `field` est le champ de l'élément comparé, `optionsKey` la clé
 *   de la réponse de l'API qui fournit la liste des options.
 * - `searchFields` : champs dans lesquels la recherche s'applique.
 */
export const PROJECTS_CATALOG = {
  id: 'projets',
  title: 'Projets clients',
  url: API_PROJECTS_URL,
  itemsKey: 'projects',
  searchFields: ['title', 'client', 'description', 'technologies'],
  filters: [
    { name: 'category', label: 'Catégorie', field: 'category', optionsKey: 'categories' },
    { name: 'technology', label: 'Technologie', field: 'technologies', optionsKey: 'technologies' },
  ],
};

export const COURSES_CATALOG = {
  id: 'formations',
  title: 'Formations',
  url: API_COURSES_URL,
  itemsKey: 'courses',
  searchFields: ['title', 'instructor', 'description', 'technologies'],
  filters: [
    { name: 'category', label: 'Catégorie', field: 'category', optionsKey: 'categories' },
    { name: 'level', label: 'Niveau', field: 'level', optionsKey: 'levels' },
    { name: 'technology', label: 'Technologie', field: 'technologies', optionsKey: 'technologies' },
  ],
};
