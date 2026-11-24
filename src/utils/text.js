/**
 * Normalise un texte pour la comparaison : minuscules et sans accents.
 * La décomposition NFD sépare chaque lettre de son accent (\u0300-\u036f), qui est ensuite retiré.
 * @param {string} text - Texte à normaliser.
 * @returns {string} Texte en minuscules et sans accents.
 */
export const normalizeText = (text) =>
  String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
