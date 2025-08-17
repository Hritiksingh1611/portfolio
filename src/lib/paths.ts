/**
 * Get the correct path for assets based on the environment
 * In production (GitHub Pages), adds the basePath prefix
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';
  return `${basePath}${path}`;
}

/**
 * Get the correct public asset path
 */
export function getPublicPath(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return getAssetPath(normalizedPath);
}
