import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../fireBase/config";
import Navbar from "./Navbar";
import PedirLibro from "../logic/PedirLibro";
import HistorialLibro from "../logic/HistorialLibro";

const DetalleLibro = () => {

    const [libro, setLibro] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const LibroRef = doc(db, 'libros', id);
        getDoc(LibroRef).then((e) => {
            setLibro({...e.data(), id: e.id});
        });
    }, [id]);
    
    console.log(id);
    const handleDelete = async(id) => {
        
        const libroRef = doc(db, 'libros', id);
        await deleteDoc(libroRef);
        await navigate('/');
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-2 mh-100 d-none d-md-block sidebar p-4">
                        <button className="btn btn-amigo">
                            <Link to={`/`} style={{ color:'#fff',textDecoration:'none' }}>
                                Atras
                            </Link>
                        </button>

                    </nav>
                    <main className="col-md-9 mh-100 ml-sm-auto px-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Detalle del libro</h1>
                        </div>
                        <div className="row">  
                        {
                            libro &&
                            <div className="card shadow-sm mb-3 p-2 col-8" >
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={libro.imagen} className="img-fluid rounded-start" alt="..."/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{libro.nombre}</h5>
                                            <p className="card-text">{libro.descripcion}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p>{libro.fecha}</p>
                                                <p>{libro.hora}</p>
                                            </div>
                                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                        </div>
                                        <button className="btn btn-danger m-4" onClick={() => handleDelete(libro.id)}>Eliminar</button>
                                        <button className="btn btn-amigo">
                                            <Link to={`/edit/${libro.id}`} style={{ color:'#fff',textDecoration:'none' }}>
                                                Editar
                                            </Link>
                                        </button>
                                    <h5 className="mx-4">{libro.id}</h5>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="col-4">
                            <HistorialLibro />
                        </div>
                        </div>
                        <div className="col-8 shadow-sm">
                            <PedirLibro libro={libro}/>
                        </div>
                    </main>
                </div>
            </div>
                
        </div>
    );
}

export default DetalleLibro;
