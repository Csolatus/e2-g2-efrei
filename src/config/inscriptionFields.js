import { EXPERIENCE_MIN, EXPERIENCE_MAX } from './formRules.js';

/**
 * Champs texte du formulaire d'inscription, dans l'ordre d'affichage.
 * Cet ordre doit rester celui de `fieldValidators` (utils/validation.js),
 * car useForm s'en sert pour focaliser le premier champ en erreur.
 */
export const TEXT_FIELDS = [
  { name: 'firstname', label: 'Prénom', required: true, autoComplete: 'given-name' },
  { name: 'lastname', label: 'Nom', required: true, autoComplete: 'family-name' },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    autoComplete: 'email',
    placeholder: 'nom@exemple.com',
  },
  {
    name: 'phone',
    label: 'Téléphone',
    type: 'tel',
    required: true,
    autoComplete: 'tel',
    placeholder: '+33 6 12 34 56 78',
  },
  { name: 'company', label: 'Entreprise', autoComplete: 'organization' },
  {
    name: 'experience',
    label: 'Expérience (en années)',
    type: 'number',
    min: EXPERIENCE_MIN,
    max: EXPERIENCE_MAX,
    step: 1,
  },
];
