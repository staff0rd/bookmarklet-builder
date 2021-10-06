export const SOURCE_KEY = "source";

const startupSource = `const someFunction = () => "hello!";
alert(someFunction());
`;

const getDefaultValue = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sourceFromQuery = urlParams.get(SOURCE_KEY);
  if (sourceFromQuery) {
    if (window.history.replaceState) {
      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      window.history.replaceState({ path: newurl }, "", newurl);
    }
    const result = atob(sourceFromQuery);
    return result;
  }
  const source = localStorage.getItem(SOURCE_KEY);
  return source || startupSource;
};
export const initialCode = getDefaultValue();
