import {
  EMAIL_REGEX,
  PHONE_REGEX,
  NAME_MIN_LENGTH,
  MOTIVATION_MIN_LENGTH,
  EXPERIENCE_MIN,
  EXPERIENCE_MAX,
} from '../config/formRules.js';

/**
 * Valide un champ de nom (prénom ou nom de famille).
 * @param {string} value - Valeur saisie.
 * @param {string} label - Libellé utilisé dans le message ("prénom", "nom").
 * @returns {string} Message d'erreur, ou chaîne vide si la valeur est valide.
 */
const validateName = (value, label) => {
  if (!value) return `Veuillez saisir votre ${label}.`;
  if (value.length < NAME_MIN_LENGTH) {
    return `Le ${label} doit contenir au moins ${NAME_MIN_LENGTH} caractères.`;
  }
  return '';
};

/**
 * Valide le prénom : obligatoire, 2 caractères minimum.
 * @param {string} value - Valeur saisie.
 * @returns {string} Message d'erreur, ou chaîne vide si la valeur est valide.
 */
export const validateFirstName = (value) => validateName(value, 'prénom');

/**
 * Valide le nom de famille : obligatoire, 2 caractères minimum.
 * @param {string} value - Valeur saisie.
 * @returns {string} Message d'erreur, ou chaîne vide si la valeur est valide.
 */
export const validateLastName = (value) => validateName(value, 'nom');

/**
 * Valide l'adresse email : obligatoire et au format nom@domaine.ext.
 * @param {string} value - Valeur saisie.
 * @returns {string} Message d'erreur, ou chaîne vide si la valeur est valide.
 */
export const validateEmail = (value) => {
  if (!value) return 'Veuillez saisir votre adresse email.';
  if (!EMAIL_REGEX.test(value)) {
    return 'Adresse email invalide. Exemple : nom@exemple.com';
  }
  return '';
};

/**
 * Valide le téléphone : obligatoire, avec indicatif international (ex. +33 6 12 34 56 78).
 * @param {string} value - Valeur saisie.
 * @returns {string} Message d'erreur, ou chaîne vide si la valeur est valide.
 */
export const validatePhone = (value) => {
  if (!value) return 'Veuillez saisir votre numéro de téléphone.';
  if (!PHONE_REGEX.test(value)) {
    return "Numéro invalide. Commencez par + et l'indicatif du pays, par exemple +33 6 12 34 56 78.";
  }
  return '';
};

/**
 * Valide l'expérience, champ optionnel : une valeur vide est acceptée.
 * @param {string} value - Nombre d'années saisi.
 * @returns {string} Message d'erreur, ou chaîne vide si la valeur est valide.
 */
export const validateExperience = (value) => {
  if (!value) return '';
  const years = Number(value);
  if (!Number.isInteger(years) || years < EXPERIENCE_MIN || years > EXPERIENCE_MAX) {
    return `L'expérience doit être un nombre entier d'années, entre ${EXPERIENCE_MIN} et ${EXPERIENCE_MAX}.`;
  }
  return '';
};

/**
 * Valide le choix de formation : obligatoire.
 * @param {string} value - Valeur saisie.
 * @returns {string} Message d'erreur, ou chaîne vide si la valeur est valide.
 */
export const validateCourse = (value) =>
  value ? '' : 'Veuillez choisir une formation.';

/**
 * Valide le niveau déclaré : obligatoire.
 * @param {string} value - Valeur saisie.
 * @returns {string} Message d'erreur, ou chaîne vide si la valeur est valide.
 */
export const validateLevel = (value) =>
  value ? '' : 'Veuillez indiquer votre niveau.';

/**
 * Valide la motivation : obligatoire, 50 caractères minimum.
 * @param {string} value - Valeur saisie.
 * @returns {string} Message d'erreur, ou chaîne vide si la valeur est valide.
 */
export const validateMotivation = (value) => {
  if (!value) return 'Veuillez expliquer votre motivation.';
  if (value.length < MOTIVATION_MIN_LENGTH) {
    return `Encore ${MOTIVATION_MIN_LENGTH - value.length} caractère(s), ${MOTIVATION_MIN_LENGTH} minimum.`;
  }
  return '';
};

// L'ordre des clés suit celui des champs du formulaire : useForm s'en sert pour
// donner le focus au premier champ en erreur.
const fieldValidators = {
  firstname: validateFirstName,
  lastname: validateLastName,
  email: validateEmail,
  phone: validatePhone,
  experience: validateExperience,
  course: validateCourse,
  level: validateLevel,
  motivation: validateMotivation,
};

/**
 * Valide tous les champs du formulaire d'inscription (les valeurs sont nettoyées des espaces en bord).
 * @param {Object<string, string>} values - Valeurs du formulaire, indexées par nom de champ.
 * @returns {Object<string, string>} Messages d'erreur indexés par champ ; objet vide si le formulaire est valide.
 */
export const validateForm = (values) =>
  Object.entries(fieldValidators).reduce((errors, [field, validate]) => {
    const message = validate(String(values[field] ?? '').trim());
    return message ? { ...errors, [field]: message } : errors;
  }, {});
