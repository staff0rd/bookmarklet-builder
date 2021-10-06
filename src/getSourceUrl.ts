import { SOURCE_KEY } from "./getInitialCode";
import { btoau } from "b2a";

const urlStart = `${window.location.href}?${SOURCE_KEY}=`;
export const getSourceUrl = (source: string) => {
  return `${urlStart}${btoau(source)}`;
};
