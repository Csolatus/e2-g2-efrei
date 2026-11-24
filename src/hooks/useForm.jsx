import { useState, useMemo } from 'react';

/**
 * Gère l'état d'un formulaire contrôlé et sa validation.
 * Une erreur n'est visible que sur un champ déjà quitté (touched), ou sur
 * tous les champs après une tentative de soumission : l'utilisateur n'est
 * pas accueilli par une page d'erreurs.
 * @param {Object<string, string>} initialValues - Valeurs initiales, indexées par nom de champ.
 * @param {(values: Object<string, string>) => Object<string, string>} validate - Renvoie les erreurs par champ.
 * @returns {{values: Object, errors: Object, handleChange: Function, handleBlur: Function,
 *   handleSubmit: (onValid: Function) => Function, reset: Function}}
 */
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const allErrors = useMemo(() => validate(values), [validate, values]);

  const errors = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(allErrors).filter(([name]) => hasSubmitted || touched[name])
      ),
    [allErrors, touched, hasSubmitted]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((previous) => ({ ...previous, [name]: true }));
  };

  const handleSubmit = (onValid) => (event) => {
    event.preventDefault();
    setHasSubmitted(true);

    const [firstInvalidField] = Object.keys(allErrors);
    if (firstInvalidField) {
      event.target.elements[firstInvalidField].focus();
      return;
    }
    onValid(values);
  };

  const reset = () => {
    setValues(initialValues);
    setTouched({});
    setHasSubmitted(false);
  };

  return { values, errors, handleChange, handleBlur, handleSubmit, reset };
}

export default useForm;
