/**
 * Masks a full name following the standard PayNow partial masking rules.
 *
 * @param {string} fullName - The official legal name to mask.
 * @returns {string} The partially masked PayNow display name.
 */
export function maskPayNowName(fullName) {
  if (!fullName || typeof fullName !== 'string') return '';

  // Split name by spaces to evaluate each structural block independently.
  return fullName
    .trim()
    .split(/\s+/)
    .map((word) => {
      const len = word.length;
      if (len === 0) return '';

      // Handle specific legal conjunctions like "s/o" or "d/o".
      if (/^[sSdD]\/[oO]$/.test(word)) {
        return `${word.substring(0, 2)}X`;
      }

      let visibleCount;

      // Apply masking threshold rules based on word block length.
      if (len <= 2) {
        visibleCount = 1;
      } else if (len === 3 || len === 4) {
        visibleCount = 2;
      } else if (len === 5 || len === 6) {
        visibleCount = 3;
      } else if (len === 7) {
        visibleCount = 4;
      } else {
        // For longer blocks (8+ characters), reveal only the first 5 characters.
        visibleCount = 5;
      }

      // Extract the unmasked prefix and pad the rest with "X".
      const visiblePart = word.substring(0, visibleCount);
      const maskedPart = 'X'.repeat(len - visibleCount);

      return visiblePart + maskedPart;
    })
    .join(' ');
}

export default maskPayNowName;
