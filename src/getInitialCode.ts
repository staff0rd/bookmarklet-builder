import { atobu } from "b2a";

export const SOURCE_KEY = "source";
export const NAME_KEY = "name";
export const DEFAULT_NAME = "My bookmarklet";

const startupSource = `const someFunction = () => "hello!";
alert(someFunction());
`;

export const blankUrl =
  window.location.protocol +
  "//" +
  window.location.host +
  window.location.pathname;

const getDefaultValue = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sourceFromQuery = urlParams.get(SOURCE_KEY);
  const nameFromQuery = urlParams.get(NAME_KEY);
  if (sourceFromQuery) {
    try {
      if (window.history.replaceState) {
        window.history.replaceState({ path: blankUrl }, "", blankUrl);
      }
      const result = atobu(sourceFromQuery);
      return { source: result, name: nameFromQuery || DEFAULT_NAME };
    } catch (e) {
      console.error(e);
    }
  }
  const source = localStorage.getItem(SOURCE_KEY);
  return { source: source || startupSource, name: DEFAULT_NAME };
};
export const initialCode = getDefaultValue();
