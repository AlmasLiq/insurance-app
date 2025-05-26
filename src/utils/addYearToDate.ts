export function addYearToDate(date: Date | string, years: number): string {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d.toISOString().split('T')[0]; 
}
