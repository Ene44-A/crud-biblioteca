import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../fireBase/config";


const ContainerEditArticle = ({libro}) => {
    
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const { id } = useParams();
    const updtateArticle = async (data) => {
        const libroRef = doc(db, 'libros', id);
        await updateDoc(libroRef, {
            nombre: data.nombre,
            descripcion: data.descripcion,
        });
        await navigate('/');
    }
    const handleUpdateArticle =(data) =>{
        console.log(data);
        updtateArticle(data);
        
    }

    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <img src={libro.imagen} className="img-fluid rounded-start" alt="..."/>
                </div>
                <form className='px-5 col-8' onSubmit={handleSubmit(handleUpdateArticle)}>
                    <div className="form-group my-2">
                        <label htmlFor="txt">Nombre del Libro *</label>
                        <input type="text" className="form-control" defaultValue={libro.nombre} required {...register("nombre", { required: true })} />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="txt">Descripción del Libro *</label>
                        <textarea type="text-area" className="form-control h-100" defaultValue={libro.descripcion} required {...register("descripcion", { required: true })} />
                    </div>
                    <div className="form-group my-2">
                        <input type="submit" className="btn btn-luis" value="Actualizar" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContainerEditArticle;
