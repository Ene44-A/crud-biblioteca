import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../fireBase/config";
import { Link } from "react-router-dom";



const ContainerShowArticle = () => {

    const [libros, setLibros] = useState([]);
    const LibroRef = collection(db, 'libros');

    useEffect(() => {
        getDocs(LibroRef).then((e) => {
            setLibros(
                e.docs.map((doc)=>{
                    return{...doc.data(), id: doc.id}
            }))
        });
    }, []);
    
    return (
        <div>
            <div className="container text-center">
                <div className="row d-flex flex-wrap">   
                    {
                        libros &&
                        libros.map((libro)=>{
                            return(
                                <div className="col d-flex align-items-stretch my-2" key={libro.id}>
                                    <div className="card" style={{ width: '12rem' }}>
                                        <img src={libro.imagen} className="card-img-top" style={{ backgroundSize:'contain',objectFit:'cover' ,backgroundRepeat:'no-repeat', height:'220px' }} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{libro.nombre}</h5>
                                            <p className="card-text">{libro.descripcion}</p>
                                        </div>
                                        {
                                            libro.disponible === true
                                            ?<span className="state-bar s-true"></span>
                                            :<span className="state-bar s-false"></span>
                                        }
                                        <div className="card-footer text-body-secondary">
                                            <button className="btn btn-amigo">
                                                <Link to={`/libro/${libro.id}`} style={{ color:'#fff',textDecoration:'none' }}>
                                                    Detalle
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ContainerShowArticle;
