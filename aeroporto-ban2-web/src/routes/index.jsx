import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";

import Avioes from "../pages/avioes";
import Empregados from "../pages/empregados";
import Modelos from "../pages/modelos";
import NotFound from "../pages/not_found";
import Testes from "../pages/testes";

export default function Router() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/avioes" element={<Avioes />} />
                    <Route path="/empregados" element={<Empregados />} />
                    <Route path="/modelos" element={<Modelos />} />
                    <Route path="/testes" element={<Testes />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
} 