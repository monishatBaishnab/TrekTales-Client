export const arrConverter = (set: string[]): string[] => {
  const selectedSet = new Set(set);

  return Array.from(selectedSet);
};
