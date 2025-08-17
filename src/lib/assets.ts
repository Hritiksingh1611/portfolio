/**
 * Get the correct path for assets based on the environment
 * In production (GitHub Pages), adds the basePath prefix
 */
export function getAssetPath(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // In production, add the basePath prefix for GitHub Pages
  const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';
  
  return `${basePath}${normalizedPath}`;
}