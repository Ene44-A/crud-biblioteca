import { useContext } from "react";
import Navbar from "../components/Navbar";
import { valueContext } from "../context/ValueContext";
import ContainerImportArticle from "./ContainerImportArticle";
import ContainerShowArticle from "./ContainerShowArticle";

const Home = () => {

    const {handleSatateMain, stateMain} = useContext(valueContext);

    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-2 mh-100 d-none d-md-block sidebar p-4">
                        <button className="btn btn-amigo my-2" onClick={handleSatateMain}>{stateMain ? 'Ver Libros':'Registrar Libro'}</button>
                    </nav>
                    <main className="col-md-10 mh-100 ml-sm-auto px-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Libros Disponibles</h1>
                        </div>
                        <div className="row">  
                            {
                                stateMain
                                ?
                                <ContainerImportArticle />
                                :
                                <ContainerShowArticle />
                            }
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Home;
