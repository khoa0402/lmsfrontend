import React from "react";
import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import AppRoutes from "./Routes/AppRoutes";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import Store from "./Store";
import { PrimeReactProvider } from "primereact/api";
import { ModalsProvider } from "@mantine/modals";

const theme = createTheme({
  focusRing: "never",
  fontFamily: "Manrope, sans-serif",
  colors: {
    black: [
      "#f6f6f6",
      "#e7e7e7",
      "#d1d1d1",
      "#b0b0b0",
      "#888888",
      "#6d6d6d",
      "#5d5d5d",
      "#4f4f4f",
      "#454545",
      "#3d3d3d",
    ],
    blue: [
      "#f0f9ff",
      "#e0f2fe",
      "#ade2fc",
      "#7ed5fb",
      "#39bff7",
      "#10a7e7",
      "#0387c6",
      "#046ba0",
      "#085b84",
      "#0d4b6d",
    ],
  },
  primaryColor: "blue",
  primaryShade: 5, //blue
  defaultGradient: {
    from: "blue.3",
    to: "blue.7",
    deg: 140,
  },
});

function App() {
  return (
    <Provider store={Store}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <PrimeReactProvider>
            <Notifications position="top-center" />
            <AppRoutes />
          </PrimeReactProvider>
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  );
}

export default App;
