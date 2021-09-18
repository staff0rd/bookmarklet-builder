import React, { useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DarkIcon from "@mui/icons-material/NightsStay";
import LightIcon from "@mui/icons-material/WbSunny";
import ToggleButton from "@mui/material/ToggleButton";
import { format } from "prettier/standalone";
import * as monaco from "monaco-editor";
import * as parser from "prettier/parser-babel";

enum EditorMode {
  Code = "CODE",
  Bookmarklet = "BOOKMARKLET",
}

function App() {
  const [mode, setMode] = useState(EditorMode.Code);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();

  const handleFormat = () => {
    if (editor) {
      const source = editor.getValue();
      const formatted = format(source, {
        parser: "babel",
        plugins: [parser],
      });
      editor.setValue(formatted);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: EditorMode) =>
    setMode(newValue);

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
          <TabContext value={mode}>
            <TabPanel value={EditorMode.Code}>
              <Button onClick={handleFormat}>Format</Button>
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
