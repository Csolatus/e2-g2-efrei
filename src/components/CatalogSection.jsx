import { useState, useMemo, useCallback } from 'react';
import useFetch from '../hooks/useFetch.jsx';
import useFilter from '../hooks/useFilter.jsx';
import useSearch from '../hooks/useSearch.jsx';
import SearchBar from './SearchBar.jsx';
import FilterBar from './FilterBar.jsx';
import Modal from './Modal.jsx';
import Loader from './Loader.jsx';
import ErrorMessage from './ErrorMessage.jsx';

function CatalogContent({ data, catalog, renderCard, renderDetails }) {
  const { itemsKey, filters, searchFields } = catalog;
  const [selectedItem, setSelectedItem] = useState(null);
  const closeModal = useCallback(() => setSelectedItem(null), []);

  const filterFields = useMemo(
    () => Object.fromEntries(filters.map(({ name, field }) => [name, field])),
    [filters]
  );
  const filterBarConfig = filters.map(({ name, label, optionsKey }) => ({
    name,
    label,
    options: data[optionsKey],
  }));

  const { values, setFilter, results: filteredItems } = useFilter(data[itemsKey], filterFields);
  const { query, setQuery, results } = useSearch(filteredItems, searchFields);

  return (
    <>
      <div className="d-flex flex-column gap-3 mb-4">
        <SearchBar id={`${catalog.id}-search`} value={query} onChange={setQuery} label={`Rechercher dans ${catalog.title}`} />
        <FilterBar idPrefix={`${catalog.id}-filter`} filters={filterBarConfig} values={values} onChange={setFilter} />
        <p className="text-muted mb-0" aria-live="polite">
          {results.length} résultat{results.length > 1 ? 's' : ''}
        </p>
      </div>

      {results.length === 0 ? (
        <p className="text-center py-4">Aucun résultat ne correspond à votre recherche.</p>
      ) : (
        <div className="row g-4">
          {results.map((item) => (
            <div className="col-12 col-md-6 col-lg-4" key={item.id}>
              {renderCard(item, setSelectedItem)}
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={selectedItem !== null} title={selectedItem?.title} onClose={closeModal}>
        {selectedItem && renderDetails(selectedItem)}
      </Modal>
    </>
  );
}

/**
 * Section de catalogue générique, partagée par les projets et les formations :
 * chargement de l'API, recherche, filtres, grille de cartes et modale de détails.
 * Ce qui diffère entre les deux sections est injecté par `catalog` (configuration)
 * et par `renderCard` / `renderDetails` (affichage), ce qui évite toute duplication.
 */
function CatalogSection({ catalog, renderCard, renderDetails }) {
  const { data, isLoading, error } = useFetch(catalog.url);

  return (
    <section className="container py-5" id={catalog.id} aria-labelledby={`${catalog.id}-title`}>
      <h2 className="mb-4" id={`${catalog.id}-title`}>{catalog.title}</h2>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={`Impossible de charger les données (${error}).`} />}
      {data && (
        <CatalogContent
          data={data}
          catalog={catalog}
          renderCard={renderCard}
          renderDetails={renderDetails}
        />
      )}
    </section>
  );
}

export default CatalogSection;
