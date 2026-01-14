// Утилита для работы со slug новостей категории CONTENT

/**
 * Генерирует slug на основе названия файла
 * @param {string} filename - Название файла (например, "2026-01-12-новость.json")
 * @returns {string} - Slug (например, "a1b2c3d4")
 */
export function generateSlugFromFilename(filename) {
  const nameWithoutExt = filename.replace(/\.json$/, '');
  
  let hash = 0;
  for (let i = 0; i < nameWithoutExt.length; i++) {
    const char = nameWithoutExt.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const positiveHash = Math.abs(hash);
  return positiveHash.toString(36).substring(0, 8);
}

/**
 * Создание маппинга slug -> новость для новостей категории CONTENT
 * @param {Object} modules - Объект с модулями файлов
 * @returns {Object} - Объект с маппингом { slug: newsItem }
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
 * Получение slug для контентной новости по имени файла
 * @param {string} filename - Название файла
 * @returns {string} - Slug
 */
export function getSlugFromFilename(filename) {
  return generateSlugFromFilename(filename);
}
