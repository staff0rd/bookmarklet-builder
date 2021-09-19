import React, { useMemo, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import DarkIcon from "@mui/icons-material/NightsStay";
import LightIcon from "@mui/icons-material/WbSunny";
import ToggleButton from "@mui/material/ToggleButton";
import { format as prettier } from "prettier/standalone";
import * as monaco from "monaco-editor";
import * as parser from "prettier/parser-babel";
import { useKeyPress } from "ahooks";
import Tooltip from "@mui/material/Tooltip";
import * as terser from "terser";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

const initialCode = `const oneFunction = () => 'result';
console.log(oneFunction());
`;

const getOs = () => {
  if (navigator.appVersion.indexOf("Win") != -1) return "Windows";
  if (navigator.appVersion.indexOf("Mac") != -1) return "MacOS";
  if (navigator.appVersion.indexOf("X11") != -1) return "UNIX";
  if (navigator.appVersion.indexOf("Linux") != -1) return "Linux";
  return "Unknown OS";
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();
  const [bookmarklet, setBookmarklet] = useState("");
  const [name, setName] = useState("My bookmarklet");
  const os = getOs();
  console.log(os);

  const minify = async (source: string) => {
    const formatted = await terser.minify(source);
    return `javascript:(function(){${formatted.code}})()`;
  };

  const handleFormat = async () => {
    if (editor) {
      const source = editor.getValue();

      const formatted = prettier(source, {
        parser: "babel",
        plugins: [parser],
      });
      editor.setValue(formatted);

      setBookmarklet(await minify(formatted));
    }
  };

  useKeyPress(os === "MacOS" ? "meta.s" : "ctrl.s", (e) => {
    handleFormat();
    e.preventDefault();
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
        },
      }),
    [isDarkMode]
  );

  const handleRun = () => {
    if (editor) {
      const source = editor.getValue();
      eval(source);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Box
          sx={{
            width: "100%",
            typography: "body1",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Tooltip title={os === "MacOS" ? "Cmd+S" : "Ctrl+S"}>
              <Button onClick={handleFormat}>Format</Button>
            </Tooltip>

            <Button onClick={handleRun}>Run code</Button>
          </Box>
          <Box>
            <ToggleButton
              sx={{
                border: "none",
                "&.Mui-selected": { backgroundColor: "inherit" },
              }}
              value="check"
              selected={isDarkMode}
              onChange={() => {
                setIsDarkMode(!isDarkMode);
              }}
            >
              {isDarkMode && <DarkIcon fontSize="small" />}
              {!isDarkMode && <LightIcon fontSize="small" />}
            </ToggleButton>
          </Box>
        </Box>
        <Grid container sx={{ p: 1 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5">Label</Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  variant="filled"
                  size="small"
                  hiddenLabel
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            <Typography variant="h5">Bookmarklet</Typography>
            <Link sx={{ marginLeft: 1 }} href={bookmarklet}>
              {name}
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Code</Typography>
            <Editor
              height="250px"
              defaultLanguage="javascript"
              theme={isDarkMode ? "vs-dark" : ""}
              defaultValue={initialCode}
              onMount={async (e) => {
                setEditor(e);
                setBookmarklet(await minify(e.getValue()));
              }}
              options={{
                minimap: { enabled: false },
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
