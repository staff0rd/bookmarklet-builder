import { atobu } from "b2a";

export const SOURCE_KEY = "source";

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
  if (sourceFromQuery) {
    try {
      if (window.history.replaceState) {
        window.history.replaceState({ path: blankUrl }, "", blankUrl);
      }
      const result = atobu(sourceFromQuery);
      return result;
    } catch (e) {
      console.error(e);
    }
  }
  const source = localStorage.getItem(SOURCE_KEY);
  return source || startupSource;
};
export const initialCode = getDefaultValue();
