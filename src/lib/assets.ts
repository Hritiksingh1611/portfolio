/**
 * Get the correct path for assets based on the environment
 * In production (GitHub Pages), adds the basePath prefix
 */
export function getAssetPath(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // In production, add the basePath prefix for GitHub Pages
  // Check both NODE_ENV and if we're in a GitHub Pages environment
  const isProduction = process.env.NODE_ENV === 'production' || typeof window !== 'undefined' && window.location.hostname.includes('github.io');
  const basePath = isProduction ? '/portfolio' : '';
  
  return `${basePath}${normalizedPath}`;
}