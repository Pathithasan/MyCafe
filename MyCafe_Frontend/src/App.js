import React, { useContext } from "react";
import "./App.css";
import { Provider } from "./context/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cafe from "./pages/Cafe";
import Employee from "./pages/Employee";
import Layout from "./components/Layout";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

function App() {
    return (
        <Provider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Cafe />} />
                            <Route path="employee" element={<Employee />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
