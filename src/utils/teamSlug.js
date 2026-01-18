// Утилита для работы со slug команд

/**
 * @param {string} text - text
 * @returns {string} - slug
 */
function slugify(text) {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9а-яё\-]/gi, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * @param {string} teamName - teamName
 * @param {string} discipline - discipline
 * @returns {string} - slug
 */
export function generateSlugFromTeamName(teamName, discipline) {
  const namePart = slugify(teamName);
  const disciplinePart = slugify(discipline);
  
  if (namePart && disciplinePart) {
    return `${namePart}-${disciplinePart}`;
  }
  
  return namePart || disciplinePart || '';
}

/**
 * @param {Object} modules - modules
 * @returns {Object} - slugMap
 */
export function createTeamSlugMap(modules) {
  const slugMap = {};
  const slugCounts = {};
  
  Object.entries(modules).forEach(([modulePath, module]) => {
    const teamItem = module?.default;
    
    if (teamItem && teamItem.name) {
      let baseSlug = generateSlugFromTeamName(teamItem.name, teamItem.discipline);
      let finalSlug = baseSlug;
      
      if (slugMap[finalSlug]) {
        slugCounts[baseSlug] = slugCounts[baseSlug] || 2;
        finalSlug = `${baseSlug}-${slugCounts[baseSlug]}`;
        slugCounts[baseSlug]++;
      }
      
      slugMap[finalSlug] = teamItem;
    }
  });
  
  return slugMap;
}

/**
 * @param {Object} team - team
 * @param {Object} teamSlugMap - teamSlugMap
 * @returns {string} - slug
 */
export function getSlugFromTeam(team, teamSlugMap) {
  if (!team || !team.name || !teamSlugMap) return '';
  
  for (const [slug, teamData] of Object.entries(teamSlugMap)) {
    if (teamData === team) {
      return slug;
    }
  }
  
  return generateSlugFromTeamName(team.name, team.discipline);
}
