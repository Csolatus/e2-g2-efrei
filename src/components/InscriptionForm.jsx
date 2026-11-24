import useFetch from '../hooks/useFetch.jsx';
import Loader from './Loader.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import InscriptionFields from './InscriptionFields.jsx';
import { API_COURSES_URL } from '../config/api.js';

/**
 * Charge les formations avant d'afficher le formulaire : la formation
 * pré-sélectionnée par l'URL ne peut être validée qu'une fois la liste connue.
 */
function InscriptionForm({ initialCourseId }) {
  const { data, isLoading, error } = useFetch(API_COURSES_URL);

  if (isLoading) return <Loader />;
  if (error) {
    return <ErrorMessage message={`Impossible de charger les formations (${error}). Rechargez la page.`} />;
  }

  return <InscriptionFields courses={data.courses} levels={data.levels} initialCourseId={initialCourseId} />;
}

export default InscriptionForm;
