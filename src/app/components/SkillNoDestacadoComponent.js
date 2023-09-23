import React, { useEffect,useState,useRef } from 'react';

export const SkillNoDestacadoComponent = (props) => {
    const {id_accordion,curriculumData,SkillNoDestacado,generarValues} = props;
    const [values, setValues] = useState([]);
    const [modalTitle, setModalTitle] = useState('Agregar');
    const [valuesParaEditar, setValuesParaEditar] = useState(null);
    const closeButtonRef = useRef(null);
    
    const [titulo, setTitulo] = useState(curriculumData?.skills.skill.no_destacan.titulo || 'No Destacadas');
    useEffect(() => {
        if (curriculumData){
            if(curriculumData.skills.skill.no_destacan.titulo) {
                setTitulo(curriculumData.skills.skill.no_destacan.titulo);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'skill-nodestacado-titulo') {
            setTitulo(value);
        }
        SkillNoDestacado({
            no_destacan:{
                titulo: name === 'skill-nodestacado-titulo' ? value : titulo,// Agrega todos los valores que deseas enviar
                destacado:values
            }
        });
    };


    useEffect(() => {
        if (curriculumData && curriculumData.skills && curriculumData.skills.skill && curriculumData.skills.skill.no_destacan && curriculumData.skills.skill.no_destacan.destacado) {
            const jsonData = curriculumData.skills.skill.no_destacan.destacado;
            setValues(jsonData);
            SkillNoDestacado({
                no_destacan:{
                    titulo: curriculumData.skills.skill.no_destacan.titulo,// Agrega todos los valores que deseas enviar
                    destacado:curriculumData.skills.skill.no_destacan.destacado
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombreNoDestacado = e.target.nameSkillNoDestacado.value;
        if (nombreNoDestacado) {
            let nuevasValues;
            if (valuesParaEditar) {
                // Actualizar el idioma existente en el estado si estamos en modo de edición
                nuevasValues = values.map((value) => {
                if (value === valuesParaEditar) {
                    return nombreNoDestacado;
                }
                return value;
                });
                setValues(nuevasValues);
                setValuesParaEditar(null); // Salir del modo de edición después de actualizar
                setModalTitle('Agregar'); // Restablecer el título del modal
            } else {
                const nuevoValues = nombreNoDestacado;
                nuevasValues = [...values, nuevoValues];
            }
            setValues(nuevasValues);
            e.target.reset();
            closeButtonRef.current.click();
            SkillNoDestacado({
                no_destacan:{
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
            SkillNoDestacado({
                no_destacan:{
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
                        name="skill-nodestacado-titulo"
                        id="InputSkillNoDestacanTitulo"
                        title='Escribe el titulo (por ejemplo: No Destacadas'
                        value={titulo}
                        onChange={handleChange}
                    />
                    <label htmlFor="InputSkillNoDestacanTitulo">Titulo para la Sub Sección</label>
                </div>
            </div>
            <div className='col col-12 col-md-12'>
                <div className="card">
                    <div className="card-header">
                        <div className='col d-flex justify-content-end'>
                            <button className='btn btn-success' type='button' data-bs-toggle="modal" data-bs-target={`#exampleModal${id_accordion}`} onClick={() => setModalTitle('Agregar')}>Agregar No Destacado</button>
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
                                                <input type="text" className="form-control" name="nameSkillNoDestacado" id="nameSkillNoDestacado" placeholder="Trabajo en Equipo" defaultValue={valuesParaEditar ? valuesParaEditar : ''} required></input>
                                                <label htmlFor="nameSkillNoDestacado">Nombre de Habilidad</label>
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
                                <tbody id="skillNoDestacadoTableBody">
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