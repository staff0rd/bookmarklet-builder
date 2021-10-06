const urlStart = `${window.location.href}?sx=`;
export const getSourceFromUrl = (source: string) => {
  return `${urlStart}${btoa(source)}`;
};
