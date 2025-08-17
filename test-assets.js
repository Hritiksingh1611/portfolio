// Test script to verify asset path functionality
// Run: node test-assets.js

// Simulate development environment
process.env.NODE_ENV = 'development';
const getAssetPathDev = (path) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';
  return `${basePath}${path}`;
};

console.log('=== DEVELOPMENT ENVIRONMENT ===');
console.log('Profile image path:', getAssetPathDev('/profile.svg'));
console.log('Resume path:', getAssetPathDev('/resume.pdf'));

// Simulate production environment
process.env.NODE_ENV = 'production';
const getAssetPathProd = (path) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';
  return `${basePath}${path}`;
};

console.log('\n=== PRODUCTION ENVIRONMENT ===');
console.log('Profile image path:', getAssetPathProd('/profile.svg'));
console.log('Resume path:', getAssetPathProd('/resume.pdf'));

console.log('\n=== EXPECTED RESULTS ===');
console.log('Development: paths should start with "/" (e.g., /profile.svg)');
console.log('Production: paths should start with "/portfolio/" (e.g., /portfolio/profile.svg)');
