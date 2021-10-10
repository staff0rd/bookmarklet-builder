import { blankUrl, NAME_KEY, SOURCE_KEY } from "./getInitialCode";
import { btoau } from "b2a";

export const getSourceUrl = (source: string, name: string) => {
  return `${blankUrl}?${NAME_KEY}=${name}&${SOURCE_KEY}=${btoau(source)}`;
};
