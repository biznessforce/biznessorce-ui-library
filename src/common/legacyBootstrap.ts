/**
 * TEMPORARY (ezforce DS1b-e): Bootstrap 5.3.2's exact colours, so removing Bootstrap classes from ui-lib is
 * pixel-identical. ui-lib must not depend on the app's own temporary `--ez-color-bs-*` tokens.
 * Replaced by @biznessforce/design-system tokens in DS6; do not use in new code.
 */
export const LEGACY_BOOTSTRAP = {
  body: "#212529",
  muted: "rgba(33, 37, 41, 0.75)",
  danger: "#dc3545",
  info: "#0dcaf0",
  light: "#f8f9fa",
  border: "#dee2e6",
} as const;
