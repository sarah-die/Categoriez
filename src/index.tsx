import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { mainTheme } from "./mainTheme";
import '@fontsource/ibm-plex-sans/300.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootAppBar from "./routes/rootAppBar";
import InGame from "./routes/inGame";
import Categoriez from "./routes/categoriez";
import RuleBook from "./routes/ruleBook";
import About from "./routes/about";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootAppBar/>,
        children: [
            {
                // errorElement: <BasicError />,
                children: [
                    {
                      index: true, element: <App/>
                    },
                    {
                        path: "ruleBook",
                        element: <RuleBook/>,
                    },
                    // ToDo: Add /:gameID
                    {
                        path: "inGame",
                        element: <InGame/>,
                    },
                    {
                        path: "categoriez",
                        element: <Categoriez/>,
                    },
                    {
                        path: "about",
                        element: <About/>,
                    }
                ]
            }
        ]
    }
])

root.render(
  <React.StrictMode>
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
