import { blankUrl, SOURCE_KEY } from "./getInitialCode";
import { btoau } from "b2a";

const urlStart = `${blankUrl}?${SOURCE_KEY}=`;
export const getSourceUrl = (source: string) => {
  return `${urlStart}${btoau(source)}`;
};
