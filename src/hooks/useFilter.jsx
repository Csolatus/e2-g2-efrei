import { useState, useMemo } from 'react';

/**
 * Filtre des éléments selon des listes de valeurs choisies par l'utilisateur.
 * `filterFields` associe chaque filtre au champ de l'élément à comparer.
 * Si ce champ est un tableau (ex. `technologies`), on teste l'inclusion,
 * sinon l'égalité. Un filtre vide ('') ne filtre rien.
 * @param {Object[]} items - Éléments à filtrer.
 * @param {Object<string, string>} filterFields - Ex. `{ category: 'category', technology: 'technologies' }`.
 * @returns {{values: Object<string, string>, setFilter: Function, results: Object[]}}
 */
function useFilter(items, filterFields) {
  const [values, setValues] = useState({});

  const setFilter = (name, value) =>
    setValues((previous) => ({ ...previous, [name]: value }));

  const results = useMemo(
    () =>
      items.filter((item) =>
        Object.entries(filterFields).every(([name, field]) => {
          const selected = values[name];
          if (!selected) return true;
          return Array.isArray(item[field])
            ? item[field].includes(selected)
            : item[field] === selected;
        })
      ),
    [items, filterFields, values]
  );

  return { values, setFilter, results };
}

export default useFilter;
