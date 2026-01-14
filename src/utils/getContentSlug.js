// Утилита для получения slug новости по имени файла
// Используется для генерации ссылок на контентные новости

import { getSlugFromFilename } from './newsSlug';

/**
 * Получает slug для контентной новости
 * @param {string} filename - Имя файла (например, "2026-01-12-новость.json")
 * @returns {string} - Slug для использования в URL
 */
export function getContentNewsSlug(filename) {
  return getSlugFromFilename(filename);
}

/**
 * Генерирует полный URL для контентной новости
 * @param {string} filename - Имя файла
 * @returns {string} - Полный URL (например, "/news/content/a1b2c3d4")
 */
export function getContentNewsUrl(filename) {
  const slug = getContentNewsSlug(filename);
  return `/news/content/${slug}`;
}
