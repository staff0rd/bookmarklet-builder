import { SOURCE_KEY } from "./getInitialCode";

const urlStart = `${window.location.href}?${SOURCE_KEY}=`;
export const getSourceUrl = (source: string) => {
  return `${urlStart}${btoa(source)}`;
};
