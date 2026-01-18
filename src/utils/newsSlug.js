// Утилита для работы со slug новостей

/**
 * @param {string} filename - filename
 * @returns {string} - slug
 */
export function generateSlugFromFilename(filename) {
  const nameWithoutExt = filename.replace(/\.json$/, '');
  return nameWithoutExt;
}

/**
 * @param {Object} modules - modules
 * @returns {Object} - slugMap
 */
export function createNewsSlugMap(modules) {
  const slugMap = {};
  
  Object.entries(modules).forEach(([modulePath, module]) => {
    const newsItem = module?.default;
    
    if (newsItem) {
      const filename = modulePath.split('/').pop();
      const slug = generateSlugFromFilename(filename);
      slugMap[slug] = newsItem;
    }
  });
  
  return slugMap;
}

/**
 * @param {Object} modules - modules
 * @returns {Object} - contentMap
 */
export function createContentNewsMap(modules) {
  const contentMap = {};
  
  Object.entries(modules).forEach(([modulePath, module]) => {
    const newsItem = module?.default;
    
    if (newsItem && newsItem.category === 'CONTENT') {
      const filename = modulePath.split('/').pop();
      const slug = generateSlugFromFilename(filename);
      contentMap[slug] = newsItem;
    }
  });
  
  return contentMap;
}

/**
 * Получение slug для новости по имени файла
 * @param {string} filename - Название файла
 * @returns {string} - Slug
 */
export function getSlugFromFilename(filename) {
  return generateSlugFromFilename(filename);
}
