import { useState, useMemo } from 'react';
import { normalizeText } from '../utils/text.js';

/**
 * Recherche textuelle insensible à la casse et aux accents.
 * Un champ de type tableau (ex. `technologies`) est parcouru élément par élément.
 * @param {Object[]} items - Éléments à filtrer.
 * @param {string[]} searchFields - Champs de l'élément dans lesquels chercher.
 * @returns {{query: string, setQuery: Function, results: Object[]}}
 */
function useSearch(items, searchFields) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());
    if (!normalizedQuery) return items;

    return items.filter((item) =>
      searchFields.some((field) => {
        const value = Array.isArray(item[field]) ? item[field].join(' ') : item[field];
        return normalizeText(value ?? '').includes(normalizedQuery);
      })
    );
  }, [items, searchFields, query]);

  return { query, setQuery, results };
}

export default useSearch;
