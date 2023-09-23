import React, { useEffect,useState,useRef } from 'react';

export const ConocimientoComponent = (props) => {
    const {id_accordion, curriculumData,Conocimiento} = props;
    //const [values, setValues] = useState([]);//{`${id_accordion}`
    const [values, setValues] = useState([]);
    const [modalTitle, setModalTitle] = useState('Agregar');
    const [valuesParaEditar, setValuesParaEditar] = useState(null);
    const closeButtonRef = useRef(null);
    
    const [titulo, setTitulo] = useState(curriculumData?.conocimientos.titulo || '< Conocimientos />');
    useEffect(() => {
        if (curriculumData){
            if(curriculumData.conocimientos.titulo) {
                setTitulo(curriculumData.conocimientos.titulo);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'conocimiento-titulo') {
            setTitulo(value);
        }
        Conocimiento({
            conocimientos:{
                titulo: name === 'conocimiento-titulo' ? value : titulo,// Agrega todos los valores que deseas enviar
                conocimiento:values
            }
        });
    };
    
    useEffect(() => {
        if (curriculumData && curriculumData.conocimientos && curriculumData.conocimientos.conocimiento) {
            const jsonData = curriculumData.conocimientos.conocimiento;
            setValues(jsonData);
            Conocimiento({
                conocimientos:{
                    titulo: titulo,// Agrega todos los valores que deseas enviar
                    conocimiento:curriculumData.conocimientos.conocimiento
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombreConocimiento = e.target.nameConocimiento.value;
        const nivelConocimiento = e.target.nivelConocimiento.value;
        if (nombreConocimiento && nivelConocimiento) {
            let nuevasValues;
            if (valuesParaEditar) {
                // Actualizar el conocimiento existente en el estado si estamos en modo de edición
                nuevasValues = values.map((value) => {
                    if (value === valuesParaEditar) {
                        return {
                            nombre: nombreConocimiento,
                            nivel: nivelConocimiento,
                        };
                    }
                    return value;
                });
                setValues(nuevasValues);
                setValuesParaEditar(null); // Salir del modo de edición después de actualizar
                setModalTitle('Agregar'); // Restablecer el título del modal
            } else {
                // Agregar el nuevo conocimiento al estado si no estamos en modo de edición
                const nuevoValues = { nombre: nombreConocimiento, nivel: nivelConocimiento };
                nuevasValues = [...values, nuevoValues];
            }
            setValues(nuevasValues);
            e.target.reset();
            closeButtonRef.current.click();
            Conocimiento({
                conocimientos: {
                    titulo: titulo,
                    conocimiento: nuevasValues,
                }
            });
        }
        
    };
    const handleEditarFila = (index) => {
        // Configurar el conocimiento para editar y mostrar el modal de edición
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
          Conocimiento({
            conocimientos: {
              titulo: titulo,
              conocimiento: nuevasValues,
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
                        name="conocimiento-titulo"
                        id="InputConocimientoTitulo"
                        title='Escribe el titulo (por ejemplo: < Conocimiento en Desarrollo />'
                        value={titulo}
                        onChange={handleChange}
                    />
                    <label htmlFor="InputConocimientoTitulo">Titulo para la Sección</label>
                </div>
            </div>
            <div className='col col-md-12'>
                <div className="card">
                    <div className="card-header">
                        <div className='col d-flex justify-content-end'>
                            <button className='btn btn-success' type='button' data-bs-toggle="modal" data-bs-target={`#exampleModal${id_accordion}`} onClick={() => setModalTitle('Agregar')}>Agregar Conocimiento</button>
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
                                                <input type="text" className="form-control" name="nameConocimiento" id="nameConocimiento" placeholder="Ingles" defaultValue={valuesParaEditar ? valuesParaEditar.nombre : ''} required></input>
                                                <label htmlFor="nameConocimiento">Nombre del conocimiento</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="nivelConocimiento"
                                                    id="nivelConocimiento"
                                                    placeholder="10"
                                                    required
                                                    defaultValue={valuesParaEditar ? valuesParaEditar.nivel : ''}
                                                    onInput={(e) => {
                                                        const value = parseInt(e.target.value, 10);
                                                        if (value < 1) {
                                                            e.target.value = '1';
                                                        } else if (value > 10) {
                                                            e.target.value = '10';
                                                        }
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'e' || e.key === 'E') {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                />
                                                <label htmlFor="nivelConocimiento">Nivel del conocimiento</label>
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
                                        <th>Nivel</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="conocimientoTableBody">
                                {values.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value.nombre}</td>
                                        <td>{value.nivel}</td>
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
                                        <th>Nivel</th>
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