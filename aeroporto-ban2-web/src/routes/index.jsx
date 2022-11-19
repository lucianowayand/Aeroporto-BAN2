import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import Avioes from "../pages/avioes";
import NotFound from "../pages/not_found";

export default function Router() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/avioes" element={<Avioes />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
} 