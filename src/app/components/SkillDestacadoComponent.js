import React, { useEffect,useState,useRef } from 'react';

export const SkillDestacadoComponent = (props) => {
    const {id_accordion,curriculumData,SkillDestacado,generarValues} = props;
    const [values, setValues] = useState([]);
    const [modalTitle, setModalTitle] = useState('Agregar');
    const [valuesParaEditar, setValuesParaEditar] = useState(null);
    const closeButtonRef = useRef(null);
    
    const [titulo, setTitulo] = useState(curriculumData?.skills.skill.destacan.titulo || 'Destacado');
    useEffect(() => {
        if (curriculumData){
            if(curriculumData.skills.skill.destacan.titulo) {
                setTitulo(curriculumData.skills.skill.destacan.titulo);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'skill-destacado-titulo') {
            setTitulo(value);
        }
        SkillDestacado({
            destacan:{
                titulo: name === 'skill-destacado-titulo' ? value : titulo,// Agrega todos los valores que deseas enviar
                destacado:values
            }
        });
    };


    useEffect(() => {
        if (curriculumData && curriculumData.skills && curriculumData.skills.skill && curriculumData.skills.skill.destacan && curriculumData.skills.skill.destacan.destacado) {
            const jsonData = curriculumData.skills.skill.destacan.destacado;
            setValues(jsonData);
            SkillDestacado({
                destacan:{
                    titulo: curriculumData.skills.skill.destacan.titulo,// Agrega todos los valores que deseas enviar
                    destacado:curriculumData.skills.skill.destacan.destacado
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombreDestacado = e.target.nameSkillDestacado.value;
        if (nombreDestacado) {
            let nuevasValues;
            if (valuesParaEditar) {
                // Actualizar el idioma existente en el estado si estamos en modo de edición
                nuevasValues = values.map((value) => {
                if (value === valuesParaEditar) {
                    return nombreDestacado;
                }
                return value;
                });
                setValues(nuevasValues);
                setValuesParaEditar(null); // Salir del modo de edición después de actualizar
                setModalTitle('Agregar'); // Restablecer el título del modal
            } else {
                const nuevoValues = nombreDestacado;
                nuevasValues = [...values, nuevoValues];
            }
            setValues(nuevasValues);
            e.target.reset();
            closeButtonRef.current.click();
            SkillDestacado({
                destacan:{
                    titulo: titulo,// Agrega todos los valores que deseas enviar
                    destacado:nuevasValues
                }
            });
            generarValues();
        }
    };
    const handleEditarFila = (index) => {
        // Configurar el idioma para editar y mostrar el modal de edición
        setValuesParaEditar(values[index]);
        setModalTitle('Editar');
      };
    const handleEliminarFila = (index) => {
        // Mostrar un cuadro de confirmación
        if (window.confirm("¿Estás seguro de que quieres eliminar el registro?")) {
          // Eliminar la fila del estado
            const nuevasValues = [...values];
            nuevasValues.splice(index, 1);
            setValues(nuevasValues);
            SkillDestacado({
                destacan:{
                    titulo: titulo,// Agrega todos los valores que deseas enviar
                    destacado:nuevasValues
                }
            });
        }
    };
    return (
        <div className='row'>
            <div className='col col-12 col-md-12'>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="skill-destacado-titulo"
                        id="InputSkillDestacanTitulo"
                        title='Escribe el titulo (por ejemplo: Destacado'
                        value={titulo}
                        onChange={handleChange}
                    />
                    <label htmlFor="InputSkillDestacanTitulo">Titulo para la Sub Sección</label>
                </div>
            </div>
            <div className='col col-12 col-md-12'>
                <div className="card">
                    <div className="card-header">
                        <div className='col d-flex justify-content-end'>
                            <button className='btn btn-success' type='button' data-bs-toggle="modal" data-bs-target={`#exampleModal${id_accordion}`} onClick={() => setModalTitle('Agregar')}>Agregar Destacado</button>
                        </div>
                        <div className="modal fade" id={`exampleModal${id_accordion}`} tabIndex="-1" aria-labelledby={`exampleModal${id_accordion}Label`} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <form onSubmit={handleSubmit}>
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id={`exampleModal${id_accordion}Label`}>{modalTitle}</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" name="nameSkillDestacado" id="nameSkillDestacado" placeholder="Trabajo en Equipo" defaultValue={valuesParaEditar ? valuesParaEditar : ''} required></input>
                                                <label htmlFor="nameSkillDestacado">Nombre de Habilidad</label>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                                            <button type="submit" className="btn btn-primary">Save changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table id="example" className="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                                </thead>
                                <tbody id="skillDestacadoTableBody">
                                {values.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value}</td>
                                        <td>
                                            <button className='btn btn-primary' type='button' onClick={() => handleEditarFila(index)} data-bs-toggle="modal" data-bs-target={`#exampleModal${id_accordion}`}><i className="bi bi-pencil-fill"></i></button>
                                            <button className='btn btn-danger' type='button' onClick={() => handleEliminarFila(index)}><i className="bi bi-trash-fill"></i></button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>                                           
            </div>
        </div>
    )
}