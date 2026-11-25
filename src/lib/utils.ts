/**
 * Utility function to merge class names.
 * Filters out falsy values and joins remaining classes.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
