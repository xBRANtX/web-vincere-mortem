// Утилита для работы со slug новостей

/**
 * Генерирует slug на основе названия файла
 * @param {string} filename - Название файла (например, "2026-01-12-news.json")
 * @returns {string} - Slug (например, "2026-01-12-news")
 */
export function generateSlugFromFilename(filename) {
  const nameWithoutExt = filename.replace(/\.json$/, '');
  return nameWithoutExt;
}

/**
 * Создание маппинга slug -> новость для всех новостей
 * @param {Object} modules - Объект с модулями файлов
 * @returns {Object} - Объект с маппингом { slug: newsItem }
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
 * Создание маппинга slug -> новость для новостей категории CONTENT (для обратной совместимости)
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
 * Получение slug для новости по имени файла
 * @param {string} filename - Название файла
 * @returns {string} - Slug
 */
export function getSlugFromFilename(filename) {
  return generateSlugFromFilename(filename);
}
