import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../fireBase/config';
import ContainerEditArticle from './ContainerEditArticle';

const ViewEdit = () => {
    const [libro, setLibro] = useState(null);
    const { id } = useParams();
    

    useEffect(() => {
        const LibroRef = doc(db, 'libros', id);
        getDoc(LibroRef).then((e) => {
            setLibro({...e.data(), id: e.id});
        });
    }, [id]);
    
    console.log(id);
    
    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-2 mh-100 d-none d-md-block sidebar p-4">
                        {
                            libro &&
                            <button className="btn btn-amigo">
                                <Link to={`/libro/${libro.id}`} style={{ color:'#fff',textDecoration:'none' }}>
                                    Atras
                                </Link>
                            </button>
                        }
                    </nav>
                    <main className="col-md-10 mh-100 ml-sm-auto px-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Edición de libro</h1>
                        </div>
                        <div className="row">  
                            {
                             libro &&   
                                <ContainerEditArticle libro={libro}/>
                            }
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ViewEdit;
