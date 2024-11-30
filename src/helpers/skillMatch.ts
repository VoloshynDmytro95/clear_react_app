export const skillMatch = (skills: string[], jobSkills: string[]) => {
  return skills.some((skill) => jobSkills.includes(skill));
};
