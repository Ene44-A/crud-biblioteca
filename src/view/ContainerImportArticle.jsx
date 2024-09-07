import { useForm } from "react-hook-form";
import { db, storage } from "../fireBase/config";
import { useContext, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { valueContext } from "../context/ValueContext";
import { useNavigate } from "react-router-dom";

const ContainerImportArticle = () => {

    const { register, handleSubmit } = useForm();
    const { getDataTime, handleSatateMain,stateMain } = useContext(valueContext);
    const navigate = useNavigate();
    
    const [fileUrl, setFileUrl] = useState('');
    const [fileUpload, setFileUpload] = useState(false);

    const redirectToHome  = () => {        
        handleSatateMain()
    }


    const handleFileUpload = async (e) => {
        try {
            const archivoUrl = e.target.files[0];
            const archivoRef = ref(storage, `portadas/${archivoUrl.name}`);
            await uploadBytes(archivoRef, archivoUrl);
            const imgUrl = await getDownloadURL(archivoRef);
            setFileUrl(imgUrl);
            setFileUpload(true)
            console.log("File uploaded successfully:", imgUrl);
        } catch (error) {
            console.error("Error uploading file to Firebase Storage:", error);
            setFileUpload(false);
        }
    };

    const registerArticle = async (data) => {
        try {
            const booksCollectionRef = collection(db, 'libros');
            const fechaActual = getDataTime();
            const dataBook = {
                nombre: data.nombre,
                descripcion: data.descripcion,
                imagen: fileUrl,
                fecha: fechaActual.fecha,
                hora: fechaActual.hora,
                disponible:true
            };
            const docRef = await addDoc(booksCollectionRef, dataBook);
            console.log("Document written with ID: ", docRef.id);
            await redirectToHome()
        } catch (error) {
            alert("Error al guardar el registro: " + error.message);
            console.error("Error writing document to Firestore:", error);
        }
    };

    const handleRegisterArticle = (data) => {
        registerArticle(data);
    };

    return (
        <div>
            <h2>Registrar un Libro nuevo</h2>
            <div className="p-4 container row">
                <div className="col-4">
                    {
                        fileUpload
                        ?
                        <img src={fileUrl} alt="Imagen del libro" width="300px" className="img-fluid" />
                        :
                        <img src="https://cdn-icons-png.flaticon.com/512/13434/13434974.png" width="300px" alt="" />
                        
                    }
                
                </div>
                <form className='px-5 col-8' onSubmit={handleSubmit(handleRegisterArticle)}>
                    <div className="form-group my-2">
                        <label htmlFor="txt">Nombre del Libro *</label>
                        <input type="text" className="form-control" required {...register("nombre", { required: true })} />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="txt">Descripción del Libro *</label>
                        <textarea type="text" className="form-control h-100" required {...register("descripcion", { required: true })} />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="txt">Imagen del Libro *</label>
                        <input type="file" className="form-control" onChange={handleFileUpload} />                      
                    </div>
                    {
                            fileUpload
                            ?
                            <div className="">
                                <div className="alert alert-success d-flex align-items-center" role="alert">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                                    </svg>
                                    <div className="mx-2">
                                        Portada guardada correctamente
                                    </div>
                                </div>
                                <div className="form-group my-2">
                                    <input type="submit" className="btn btn-luis" value="Registrar" />
                                </div>
                            </div>
                            :
                            <div className="form-group my-2">
                                <input type="submit" className="btn btn-luis disabled" value="Registrar" />
                            </div>
                        }
                        
                </form>
                
            </div>
        </div>
    );
};

export default ContainerImportArticle;