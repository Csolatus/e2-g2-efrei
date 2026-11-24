/**
 * Normalise un texte pour la comparaison : minuscules et sans accents.
 * @param {string} text
 * @returns {string}
 */
export const normalizeText = (text) =>
  String(text)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
