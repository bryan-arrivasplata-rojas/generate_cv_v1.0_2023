import React, { useEffect,useState } from 'react';

export const InformacionPreviaComponent = (props) => {
    const {curriculumData,InformacionPrevia, onFileImage} = props;
    const [titulo, setTitulo] = useState(curriculumData?.titulo || '');
    const [nombres, setNombres] = useState(curriculumData?.nombres || '');
    const [apellidos, setApellidos] = useState(curriculumData?.apellidos || '');
    const [edad, setEdad] = useState(curriculumData?.edad || '');
    const [busqueda, setBusqueda] = useState(curriculumData?.search || '');
    // Esta función useEffect se ejecutará cuando curriculumData cambie
    useEffect(() => {
        if (curriculumData){
            if(curriculumData.titulo) {
                setTitulo(curriculumData.titulo);
            } 
            if (curriculumData.nombres){
                setNombres(curriculumData.nombres);
            }
            if(curriculumData.apellidos){
                setApellidos(curriculumData.apellidos);
            }
            if(curriculumData.edad){
                setEdad(curriculumData.edad);
            }
            if(curriculumData.search){
                setBusqueda(curriculumData.search);
            }
            InformacionPrevia({
                titulo: curriculumData.titulo,
                nombres: curriculumData.nombres,
                apellidos: curriculumData.apellidos,
                edad: curriculumData.edad,
                search: curriculumData.search
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    
    const handleImageChange = (event) => {
        const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
        if (file) {
            onFileImage(file);
        }
    };

    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'titulo') {
            setTitulo(value);
        } else if (name === 'nombres') {
            setNombres(value);
        } else if (name === 'apellidos') {
            setApellidos(value);
        } else if (name === 'edad') {
            setEdad(value);
        } else if (name === 'busqueda') {
            setBusqueda(value);
        }
        InformacionPrevia({
            titulo: name === 'titulo' ? value : titulo,
            nombres: name === 'nombres' ? value : nombres,
            apellidos: name === 'apellidos' ? value : apellidos,
            edad: name === 'edad' ? value : edad,
            search: name === 'busqueda' ? value : busqueda,
            foto:""
        });
    };
    return (
        <div className='row'>
            <div className='col col-12 col-md-12 col-sm-12 col-lg-4'>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="titulo"
                        id="InputTitulo"
                        placeholder="BRYAN ARRIVASPLATA"
                        title="Escribe el titulo de tu CV (por ejemplo: BRYAN ARRIVASPLATA)"
                        value={titulo}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="InputTitulo">Titulo para CV</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                        type="text"
                        className="form-control"
                        name="nombres"
                        id="InputName"
                        placeholder="Bryan Daniell"
                        value={nombres}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="InputNombre">Nombres</label>
                </div>
            </div>
            <div className='col col-12 col-md-12 col-sm-12 col-lg-4'>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="apellidos"
                        id="InputApellidos"
                        placeholder="Arrivasplata Rojas"
                        value={apellidos}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="InputApellidos">Apellidos</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="edad"
                        id="InputEdad"
                        placeholder="24 años"
                        value={edad}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="InputEdad">Edad</label>
                </div>
            </div>
            <div className='col col-12 col-md-12 col-sm-12 col-lg-4'>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="busqueda"
                        id="InputBusqueda"
                        placeholder="FullStack - Backend - FrontEnd"
                        title="Escribe tus habilidades (por ejemplo: FullStack - Backend - FrontEnd)"
                        value={busqueda}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="InputBusqueda">Busqueda para CV</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="file" className="form-control file-input" name="foto" id="InputFoto" onChange={handleImageChange} multiple></input>
                    <label htmlFor="InputFoto">Imagen de Perfil</label>
                </div>
            </div>
        </div>
    )
}