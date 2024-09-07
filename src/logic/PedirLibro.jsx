import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../fireBase/config';

const PedirLibro = ({ libro }) => {
    const [disponible, setDisponible] = useState(null);
    const [infoLibro, setInfoLibro] = useState({});

    useEffect(() => {
        const fetchLibro = async () => {
            const libroRef = doc(db, 'libros', libro.id);
            const libroSnap = await getDoc(libroRef);
            if (libroSnap.exists()) {
                setInfoLibro(libroSnap.data());
                setDisponible(libroSnap.data().disponible);
            } else {
                console.log(`No such document with id: ${libro.id}`);
            }
        };
        fetchLibro();
    }, [libro]); 

    const updateState = async (state) => {
        const libroRef = doc(db, 'libros', libro.id);
        try {
            await updateDoc(libroRef, {
                disponible: state
            });
            setDisponible(state);
        } catch (error) {
            console.error("Error updating document: ", error);
        }

    };
    
    return (
        <div>
            <div>
                <div className="card">
                    <div className="card-header">
                        Disponibilidad de Libro
                    </div>
                    <div className="card-body">
                        {
                        disponible === true 
                            ? <div className='d-flex'><h5 className="card-title"><span className='state s-true'></span> Este libro está disponible</h5> </div>
                            : <div className='d-flex'><h5 className="card-title"><span className='state s-false'></span> Este libro no está disponible</h5></div>
                        }
                        <p className="card-text">Por favor mirar las condiciones del libro antes de entregar y recibir.</p>
                        {
                        disponible === true
                            ?<button className='btn btn-luis' onClick={()=> updateState(false)}>Reservar Libro</button>
                            :
                            <button className='btn btn-amigo' onClick={()=> updateState(true)}>Recibir de libro</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PedirLibro;
