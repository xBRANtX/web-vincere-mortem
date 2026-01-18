// Утилита для получения slug новости по имени файла
// Используется для генерации ссылок на контентные новости

import { getSlugFromFilename } from './newsSlug';

/**
 * @param {string} filename - filename
 * @returns {string} - slug
 */
export function getContentNewsSlug(filename) {
  return getSlugFromFilename(filename);
}

/**
 * @param {string} filename - filename
 * @returns {string} - full URL
 */
export function getContentNewsUrl(filename) {
  const slug = getContentNewsSlug(filename);
  return `/news/content/${slug}`;
}
