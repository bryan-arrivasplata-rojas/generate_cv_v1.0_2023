import React, { useEffect,useState,useRef } from 'react';

export const ExperienciaComponent = (props) => {
    const {id_accordion, curriculumData, Experiencia} = props;
    const [values, setValues] = useState([]);
    const [modalTitle, setModalTitle] = useState('Agregar');
    const [valuesParaEditar, setValuesParaEditar] = useState(null);
    const closeButtonRef = useRef(null);
    
    const [titulo, setTitulo] = useState(curriculumData?.experiencias.titulo || '< Experiencia Laboral />');
    useEffect(() => {
        if (curriculumData){
            if(curriculumData.experiencias.titulo) {
                setTitulo(curriculumData.experiencias.titulo);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'experiencia-titulo') {
            setTitulo(value);
        }
        Experiencia({
            experiencias:{
                titulo: name === 'experiencia-titulo' ? value : titulo,
                experiencia:values
            }
        });
    };
    
    useEffect(() => {
        if (curriculumData && curriculumData.experiencias && curriculumData.experiencias.experiencia) {
            const jsonData = curriculumData.experiencias.experiencia;
            setValues(jsonData);
            Experiencia({
                experiencias:{
                    titulo: titulo,
                    experiencia:curriculumData.experiencias.experiencia
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombreExperiencia = e.target.nameExperiencia.value;
        const puestoExperiencia = e.target.puestoExperiencia.value;
        const descripcionExperiencia = e.target.descripcionExperiencia.value;
        const anoExperienciaInicio = e.target.anoExperienciaInicio.value;
        const mesExperienciaInicio = e.target.mesExperienciaInicio.value;
        const anoExperienciaFin = e.target.anoExperienciaFin.value;
        const mesExperienciaFin = e.target.mesExperienciaFin.value;
        if (nombreExperiencia && puestoExperiencia && descripcionExperiencia && anoExperienciaInicio && mesExperienciaInicio && anoExperienciaFin && mesExperienciaFin) {
            let nuevasValues;
            if (valuesParaEditar) {
            // Actualizar el experiencia existente en el estado si estamos en modo de edición
                nuevasValues = values.map((value) => {
                    if (value === valuesParaEditar) {
                        return {
                            nombre_empresa: nombreExperiencia,
                            puesto: puestoExperiencia,
                            descripcion: descripcionExperiencia,
                            inicio:{
                                year:anoExperienciaInicio,
                                mes:mesExperienciaInicio
                            },
                            final:{
                                year:anoExperienciaFin,
                                mes:mesExperienciaFin
                            }
                        };
                    }
                    return value;
                });
                setValues(nuevasValues);
                setValuesParaEditar(null); // Salir del modo de edición después de actualizar
                setModalTitle('Agregar'); // Restablecer el título del modal
            } else {
                const nuevoValues = { 
                    nombre_empresa: nombreExperiencia,
                    puesto: puestoExperiencia,
                    descripcion: descripcionExperiencia,
                    inicio:{
                        year:anoExperienciaInicio,
                        mes:mesExperienciaInicio
                    },
                    final:{
                        year:anoExperienciaFin,
                        mes:mesExperienciaFin
                    } 
                };
                nuevasValues = [...values, nuevoValues];
            }
            setValues(nuevasValues);
            e.target.reset();
            closeButtonRef.current.click();
            Experiencia({
                experiencias:{
                    titulo: titulo,
                    experiencia:nuevasValues
                }
            });
        }
    };
    const handleEditarFila = (index) => {
        // Configurar el experiencia para editar y mostrar el modal de edición
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
            Experiencia({
                experiencias:{
                    titulo: titulo,
                    experiencia:nuevasValues
                }
            });
        }
    };
    return (
        <div className='row'>
            <div className='col col-12 col-md-12 col-sm-12 col-lg-12'>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="experiencia-titulo"
                        id="InputExperienciaTitulo"
                        title='Escribe el titulo (por ejemplo: < Experiencia Laboral />'
                        value={titulo}
                        onChange={handleChange}
                    />
                    <label htmlFor="InputExperienciaTitulo">Titulo para la Sección</label>
                </div>
            </div>
            <div className='col col-md-12'>
                <div className="card">
                    <div className="card-header">
                        <div className='col d-flex justify-content-end'>
                            <button className='btn btn-success' type='button' data-bs-toggle="modal" data-bs-target={`#exampleModal${id_accordion}`} onClick={() => setModalTitle('Agregar')}>Agregar Experiencia</button>
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
                                                <input type="text" className="form-control" name="nameExperiencia" id="nameExperiencia" placeholder="MapowerGroup" defaultValue={valuesParaEditar ? valuesParaEditar.nombre_empresa : ''} required></input>
                                                <label htmlFor="nameExperiencia">Nombre de la empresa</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" name="puestoExperiencia" id="puestoExperiencia" placeholder="Analista de Sistemas" defaultValue={valuesParaEditar ? valuesParaEditar.puesto : ''} required></input>
                                                <label htmlFor="puestoExperiencia">Puesto en la empresa</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <textarea className="form-control" name="descripcionExperiencia" id="descripcionExperiencia" placeholder="Mis funciones fuerron ...." defaultValue={valuesParaEditar ? valuesParaEditar.descripcion : ''} required></textarea>
                                                <label htmlFor="descripcionExperiencia">Descripción de funciones</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="anoExperienciaInicio"
                                                    id="anoExperienciaInicio"
                                                    placeholder="2017"
                                                    required
                                                    defaultValue={valuesParaEditar ? valuesParaEditar.inicio.year : ''}
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
                                                <label htmlFor="anoExperienciaInicio">Año de Inicio</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="mesExperienciaInicio"
                                                    id="mesExperienciaInicio"
                                                    placeholder="8"
                                                    required
                                                    defaultValue={valuesParaEditar ? valuesParaEditar.inicio.mes : ''}
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
                                                <label htmlFor="mesExperienciaInicio">Mes de Inicio</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="anoExperienciaFin"
                                                    id="anoExperienciaFin"
                                                    placeholder="2017"
                                                    required
                                                    defaultValue={valuesParaEditar ? valuesParaEditar.final.year : ''}
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
                                                <label htmlFor="anoExperienciaFin">Año de Termino</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="mesExperienciaFin"
                                                    id="mesExperienciaFin"
                                                    placeholder="8"
                                                    required
                                                    defaultValue={valuesParaEditar ? valuesParaEditar.final.mes : ''}
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
                                                <label htmlFor="mesExperienciaFin">Mes de Termino</label>
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
                                    <th>Nombre de la Empresa</th>
                                    <th>Puesto</th>
                                    <th>Descripción</th>
                                    <th>Año-Inicio</th>
                                    <th>Mes-Inicio</th>
                                    <th>Año-Fin</th>
                                    <th>Mes-Fin</th>
                                    <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id='experienciaTableBody'>
                                {values.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value.nombre_empresa}</td>
                                        <td>{value.puesto}</td>
                                        <td>{value.descripcion}</td>
                                        <td>{value.inicio.year}</td>
                                        <td>{value.inicio.mes}</td>
                                        <td>{value.final.year}</td>
                                        <td>{value.final.mes}</td>
                                        <td>
                                            <button className='btn btn-primary' type='button' onClick={() => handleEditarFila(index)} data-bs-toggle="modal" data-bs-target={`#exampleModal${id_accordion}`}><i className="bi bi-pencil-fill"></i></button>
                                            <button className='btn btn-danger' type='button' onClick={() => handleEliminarFila(index)}><i className="bi bi-trash-fill"></i></button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                    <th>Nombre de la Empresa</th>
                                    <th>Puesto</th>
                                    <th>Descripción</th>
                                    <th>Año-Inicio</th>
                                    <th>Mes-Inicio</th>
                                    <th>Año-Fin</th>
                                    <th>Mes-Fin</th>
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