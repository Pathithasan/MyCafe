import React, { useContext } from "react";
import "./App.css";
import { Provider } from "./context/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cafe from "./pages/Cafe";
import Employee from "./pages/Employee";
import Layout from "./components/Layout";

function App() {
    return (
        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Cafe />} />
                        <Route path="employee" element={<Employee />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
