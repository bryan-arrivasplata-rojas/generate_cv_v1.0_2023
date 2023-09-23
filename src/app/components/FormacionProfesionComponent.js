import React, { useEffect,useState,useRef } from 'react';
export const FormacionProfesionComponent = (props) => {
    const {id_accordion,curriculumData,FormacionProfesion,generarValues} = props;
    const [values, setValues] = useState([]);
    const [selectedValue, setSelectedValue] = useState();
    const [modalTitle, setModalTitle] = useState('Agregar');
    const [valuesParaEditar, setValuesParaEditar] = useState(null);
    const closeButtonRef = useRef(null);

    const [titulo, setTitulo] = useState(curriculumData?.formaciones.formacion.profesiones.titulo || 'Educación');
    useEffect(() => {
        if (curriculumData){
            if(curriculumData.formaciones.formacion.profesiones.titulo) {
                setTitulo(curriculumData.formaciones.formacion.profesiones.titulo);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'formacion-profesion-titulo') {
            setTitulo(value);
        }
        FormacionProfesion({
            profesiones:{
                titulo: name === 'formacion-profesion-titulo' ? value : titulo,// Agrega todos los valores que deseas enviar
                profesion:values
            }
        });
    };

    useEffect(() => {
        if (curriculumData && curriculumData.formaciones && curriculumData.formaciones.formacion && curriculumData.formaciones.formacion.profesiones && curriculumData.formaciones.formacion.profesiones.profesion) {
            const jsonData = curriculumData.formaciones.formacion.profesiones.profesion;
            setValues(jsonData);
            FormacionProfesion({
                profesiones:{
                    titulo: titulo,// Agrega todos los valores que deseas enviar
                    profesion:curriculumData.formaciones.formacion.profesiones.profesion
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const gradoProfesion = e.target.gradoFormacionProfesion.value;
        const especialidadProfesion = e.target.especialidadFormacionProfesion.value;
        const universidadProfesion = e.target.universidadFormacionProfesion.value;
        const anoProfesion = e.target.anoFormacionProfesion.value;
        const mesProfesion = e.target.mesFormacionProfesion.value;
        if (gradoProfesion && especialidadProfesion && universidadProfesion && anoProfesion && mesProfesion) {
            let nuevasValues;
            if (valuesParaEditar) {
                // Actualizar el idioma existente en el estado si estamos en modo de edición
                nuevasValues = values.map((value) => {
                if (value === valuesParaEditar) {
                    return {
                        grado: gradoProfesion,
                        especialidad: especialidadProfesion,
                        universidad: universidadProfesion,
                        year: anoProfesion,
                        mes: mesProfesion,
                    };
                }
                return value;
                });
                setValues(nuevasValues);
                setValuesParaEditar(null); // Salir del modo de edición después de actualizar
                setModalTitle('Agregar'); // Restablecer el título del modal
            } else {
                const nuevoValues = { grado: gradoProfesion, especialidad: especialidadProfesion, universidad: universidadProfesion, year: anoProfesion, mes: mesProfesion };
                nuevasValues = [...values, nuevoValues];
            }
            setValues(nuevasValues);
            e.target.reset();
            closeButtonRef.current.click();
            FormacionProfesion({
                profesiones:{
                    titulo: titulo,// Agrega todos los valores que deseas enviar
                    profesion:nuevasValues
                }
            });
            generarValues();
        }
    };
    const handleEditarFila = (index) => {
        // Configurar el idioma para editar y mostrar el modal de edición
        setValuesParaEditar(values[index]);
        setModalTitle('Editar');
        setSelectedValue(values[index].grado);
      };
    const handleEliminarFila = (index) => {
        // Mostrar un cuadro de confirmación
        if (window.confirm("¿Estás seguro de que quieres eliminar el registro?")) {
            // Eliminar la fila del estado
            const nuevasValues = [...values];
            nuevasValues.splice(index, 1);
            setValues(nuevasValues);
            FormacionProfesion({
                profesiones:{
                    titulo: titulo,// Agrega todos los valores que deseas enviar
                    profesion:nuevasValues
                }
            });
        }
    };
    return (
        <div className='row'>
            <div className='col col-md-12'>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="formacion-profesion-titulo"
                        id="InputFormacionProfesionTitulo"
                        title='Escribe el titulo (por ejemplo: Educación'
                        value={titulo}
                        onChange={handleChange}
                    />
                    <label htmlFor="InputFormacionProfesionTitulo">Titulo para la Sub Sección</label>
                </div>
            </div>
            <div className='col col-md-12'>
                <div className="card">
                    <div className="card-header">
                        <div className='col d-flex justify-content-end'>
                            <button className='btn btn-success' type='button' data-bs-toggle="modal" data-bs-target={`#exampleModal${id_accordion}`} onClick={() => setModalTitle('Agregar')}>Agregar Educación</button>
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
                                                <select className="form-control form-select" name="gradoFormacionProfesion" id="gradoFormacionProfesion" aria-label="Default select example" value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} required>
                                                    <option value="">Seleccionar el mas adecuado</option>
                                                    <option value="Bachiller">Bachiller</option>
                                                    <option value="Título">Titulo</option>
                                                    <option value="Especialización">Especialización</option>
                                                    <option value="Maestría">Maestría</option>
                                                    <option value="Doctorado">Doctorado</option>
                                                    <option value="MBA">MBA</option>
                                                    <option value="PHD">PHD</option>
                                                </select>
                                                <label htmlFor="gradoFormacionProfesion">Grado de Educación</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" name="especialidadFormacionProfesion" id="especialidadFormacionProfesion" placeholder="Ingeniería de Sistemas" defaultValue={valuesParaEditar ? valuesParaEditar.especialidad : ''} required></input>
                                                <label htmlFor="especialidadFormacionProfesion">Especialidad</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" name="universidadFormacionProfesion" id="universidadFormacionProfesion" placeholder="Universidad Nacional de Ingeniería" defaultValue={valuesParaEditar ? valuesParaEditar.universidad : ''} required></input>
                                                <label htmlFor="universidadFormacionProfesion">Universidad</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="anoFormacionProfesion"
                                                    id="anoFormacionProfesion"
                                                    placeholder="2017"
                                                    required
                                                    defaultValue={valuesParaEditar ? valuesParaEditar.year : ''}
                                                    onInput={(e) => {
                                                        let value = e.target.value;

                                                        // Eliminar ceros a la izquierda y cualquier no número
                                                        value = value.replace(/\D/g, '');

                                                        // Asegurarse de que esté entre 1950 y el año actual (2023)
                                                        const currentYear = new Date().getFullYear();
                                                        if (value < 0) {
                                                            value = '0';
                                                        } else if (value > currentYear) {
                                                            value = currentYear.toString();
                                                        }

                                                        // Establecer el valor formateado en el campo de entrada
                                                        e.target.value = value;
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'e' || e.key === 'E') {
                                                        e.preventDefault();
                                                        }
                                                    }}
                                                />
                                                <label htmlFor="anoFormacionProfesion">Año</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="mesFormacionProfesion"
                                                    id="mesFormacionProfesion"
                                                    placeholder="8"
                                                    required
                                                    defaultValue={valuesParaEditar ? valuesParaEditar.mes : ''}
                                                    onInput={(e) => {
                                                        let value = e.target.value;

                                                        // Eliminar ceros a la izquierda y cualquier no número
                                                        value = value.replace(/\D/g, '');

                                                        // Asegurarse de que esté entre 1 y 12
                                                        if (value < 0) {
                                                            value = '0';
                                                        } else if (value > 12) {
                                                            value = '12';
                                                        }
                                                    
                                                        // Agregar un cero a la izquierda si es necesario
                                                        //value = value.length === 1 ? `0${value}` : value;

                                                        // Establecer el valor formateado en el campo de entrada
                                                        e.target.value = value;
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'e' || e.key === 'E') {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                />
                                                <label htmlFor="mesFormacionProfesion">Mes</label>
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
                                    <th>Grado</th>
                                    <th>Especialidad</th>
                                    <th>Universidad</th>
                                    <th>Año</th>
                                    <th>Mes</th>
                                    <th>Acciones</th>
                                </tr>
                                </thead>
                                <tbody id="formacionProfesionTableBody">
                                {values.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value.grado}</td>
                                        <td>{value.especialidad}</td>
                                        <td>{value.universidad}</td>
                                        <td>{value.year}</td>
                                        <td>{value.mes}</td>
                                        <td>
                                            <button className='btn btn-primary' type='button' onClick={() => handleEditarFila(index)} data-bs-toggle="modal" data-bs-target={`#exampleModal${id_accordion}`}><i className="bi bi-pencil-fill"></i></button>
                                            <button className='btn btn-danger' type='button' onClick={() => handleEliminarFila(index)}><i className="bi bi-trash-fill"></i></button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th>Grado</th>
                                    <th>Especialidad</th>
                                    <th>Universidad</th>
                                    <th>Año</th>
                                    <th>Mes</th>
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