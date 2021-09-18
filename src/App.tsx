import React, { useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import DarkIcon from "@mui/icons-material/NightsStay";
import LightIcon from "@mui/icons-material/WbSunny";
import ToggleButton from "@mui/material/ToggleButton";
import { format } from "prettier/standalone";
import * as monaco from "monaco-editor";
import * as parser from "prettier/parser-babel";
import { useKeyPress } from "ahooks";
import Tooltip from "@mui/material/Tooltip";

const getOs = () => {
  if (navigator.appVersion.indexOf("Win") != -1) return "Windows";
  if (navigator.appVersion.indexOf("Mac") != -1) return "MacOS";
  if (navigator.appVersion.indexOf("X11") != -1) return "UNIX";
  if (navigator.appVersion.indexOf("Linux") != -1) return "Linux";
  return "Unknown OS";
};

enum EditorMode {
  Code = "CODE",
  Bookmarklet = "BOOKMARKLET",
}

function App() {
  const [editorMode, setEditorMode] = useState(EditorMode.Code);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();
  const os = getOs();
  const handleFormat = async () => {
    if (editor) {
      const source = editor.getValue();
      if (editorMode === EditorMode.Code) {
        const formatted = format(source, {
          parser: "babel",
          plugins: [parser],
        });
        editor.setValue(formatted);
      } else {
        const formatted = await minify(source);
        editor.setValue(formatted);
      }
    }
  };

  useKeyPress(os === "MacOS" ? "meta.s" : "control.s", (e) => {
    handleFormat();
    e.preventDefault();
  });

  const handleChange = (event: React.SyntheticEvent, newValue: EditorMode) =>
    setEditorMode(newValue);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={editorMode}>
            <TabPanel value={EditorMode.Code}>
              <Tooltip title={"MacOS" ? "Cmd+S" : "Ctrl+S"}>
                <Button onClick={handleFormat}>Format</Button>
              </Tooltip>
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
            </TabPanel>
            <TabPanel value={EditorMode.Bookmarklet}>Item Two</TabPanel>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Code" value={EditorMode.Code} />
                <Tab label="Bookmarklet" value={EditorMode.Bookmarklet} />
              </TabList>
            </Box>
          </TabContext>
        </Box>
        <Editor
          height="90vh"
          defaultLanguage="javascript"
          theme={isDarkMode ? "vs-dark" : ""}
          defaultValue="console.log('something'); const other = () => 'a function that returns a string'"
          onMount={(e) => setEditor(e)}
        />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
