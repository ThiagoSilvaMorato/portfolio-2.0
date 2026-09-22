export function calculateYearsOfExperience(since: string, referenceDate: Date = new Date()): number {
  const startDate = new Date(since);
  let years = referenceDate.getFullYear() - startDate.getFullYear();

  const monthDiff = referenceDate.getMonth() - startDate.getMonth();
  const dayDiff = referenceDate.getDate() - startDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years -= 1;
  }

  return years;
}

export function formatYearsOfExperience(since: string, referenceDate?: Date): string {
  return `${calculateYearsOfExperience(since, referenceDate)}+`;
}
