const startupSource = `const someFunction = () => 'hi there console!';
console.log(someFunction());
`;

const getDefaultValue = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sourceFromQuery = urlParams.get("source");
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
    console.log("result", result);
    return result;
  }
  const source = localStorage.getItem("source");
  return source || startupSource;
};
export const initialCode = getDefaultValue();
