import React, { useEffect,useState,useRef } from 'react';

export const ParticipacionCharlaComponent = (props) => {
    const {id_accordion, curriculumData,ParticipacionCharla,generarValues} = props;
    const [values, setValues] = useState([]);
    const [modalTitle, setModalTitle] = useState('Agregar');
    const [valuesParaEditar, setValuesParaEditar] = useState(null);
    const closeButtonRef = useRef(null);
    
    const [titulo, setTitulo] = useState(curriculumData?.participaciones.participacion.charlas.titulo || 'Charlas');
    useEffect(() => {
        if (curriculumData){
            if(curriculumData.participaciones.participacion.charlas.titulo) {
                setTitulo(curriculumData.participaciones.participacion.charlas.titulo);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'participacion-charla-titulo') {
            setTitulo(value);
        }
        ParticipacionCharla({
            charlas:{
                titulo: name === 'participacion-charla-titulo' ? value : titulo,
                charla:values
            }
        });
    };
    
    useEffect(() => {
        if (curriculumData && curriculumData.participaciones && curriculumData.participaciones.participacion && curriculumData.participaciones.participacion.charlas && curriculumData.participaciones.participacion.charlas.charla) {
            const jsonData = curriculumData.participaciones.participacion.charlas.charla;
            setValues(jsonData);
            ParticipacionCharla({
                charlas:{
                    titulo: titulo,
                    charla: curriculumData.participaciones.participacion.charlas.charla
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombreCharla = e.target.nombreParticipacionCharla.value;
        const anoCharla = e.target.anoParticipacionCharla.value;
        const mesCharla = e.target.mesParticipacionCharla.value;
        if (nombreCharla && anoCharla && mesCharla) {
            let nuevasValues;
            if (valuesParaEditar) {
                // Actualizar el idioma existente en el estado si estamos en modo de edición
                nuevasValues = values.map((value) => {
                if (value === valuesParaEditar) {
                    return {
                        nombre: nombreCharla,
                        year: anoCharla,
                        mes: mesCharla,
                    };
                }
                return value;
                });
                setValues(nuevasValues);
                setValuesParaEditar(null); // Salir del modo de edición después de actualizar
                setModalTitle('Agregar'); // Restablecer el título del modal
            } else {
                const nuevoValues = { nombre: nombreCharla, year: anoCharla, mes: mesCharla };
                nuevasValues = [...values, nuevoValues];
            }
            setValues(nuevasValues);
            e.target.reset();
            closeButtonRef.current.click();
            ParticipacionCharla({
                charlas:{
                    titulo: titulo,
                    charla: nuevasValues
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
          ParticipacionCharla({
            charlas:{
                titulo: titulo,
                charla: nuevasValues
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
                        name="participacion-charla-titulo"
                        id="InputParticipacionCharlaTitulo"
                        title='Escribe el titulo (por ejemplo: Charlas'
                        value={titulo}
                        onChange={handleChange}
                    />
                    <label htmlFor="InputParticipacionCharlaTitulo">Titulo para la Sub Sección</label>
                </div>
            </div>
            <div className='col col-md-12'>
                <div className="card">
                    <div className="card-header">
                        <div className='col d-flex justify-content-end'>
                            <button className='btn btn-success' type='button' data-bs-toggle="modal" data-bs-target={`#exampleModal${id_accordion}`} onClick={() => setModalTitle('Agregar')}>Agregar Charla</button>
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
                                                <input type="text" className="form-control" name="nombreParticipacionCharla" id="nombreParticipacionCharla" placeholder="Ingeniería para los Procesos" defaultValue={valuesParaEditar ? valuesParaEditar.nombre : ''} required></input>
                                                <label htmlFor="nombreParticipacionCharla">Nombre</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="anoParticipacionCharla"
                                                    id="anoParticipacionCharla"
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
                                                <label htmlFor="anoParticipacionCharla">Año</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="mesParticipacionCharla"
                                                    id="mesParticipacionCharla"
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
                                                <label htmlFor="mesParticipacionCharla">Mes</label>
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
                                    <th>Año</th>
                                    <th>Mes</th>
                                    <th>Acciones</th>
                                </tr>
                                </thead>
                                <tbody id="participacionCharlaTableBody">
                                {values.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value.nombre}</td>
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
                                    <th>Nombre</th>
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