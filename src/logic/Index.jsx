import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ValueContext } from "../context/ValueContext";
import ViewHome from "../view/ViewHome";
import DetalleLibro from "../components/DetalleLibro";
import ViewEdit from "../view/ViewEdit";

const Index = () => {





    return (
        <ValueContext>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ViewHome />} />
                    <Route path="/libro/:id" element={<DetalleLibro />} />
                    <Route path="/edit/:id" element={<ViewEdit />} />
                </Routes>
            </BrowserRouter>
        </ValueContext>
    );
}

export default Index;
