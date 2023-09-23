import React, { useEffect,useState,useRef } from 'react';

export const ReferenciaComponent = (props) => {
    const {id_accordion, curriculumData,Referencia} = props;
    //const [values, setValues] = useState([]);//{`${id_accordion}`
    const [values, setValues] = useState([]);
    const [modalTitle, setModalTitle] = useState('Agregar');
    const [valuesParaEditar, setValuesParaEditar] = useState(null);
    const closeButtonRef = useRef(null);

    const [titulo, setTitulo] = useState(curriculumData?.referencias.titulo || '< Referencia />');
    useEffect(() => {
        if (curriculumData){
            if(curriculumData.referencias.titulo) {
                setTitulo(curriculumData.referencias.titulo);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'referencia-titulo') {
            setTitulo(value);
        }
        Referencia({
            referencias:{
                titulo: name === 'referencia-titulo' ? value : titulo,
                referencia:values
            }
        });
    };

    useEffect(() => {
        if (curriculumData && curriculumData.referencias && curriculumData.referencias.referencia) {
            const jsonData = curriculumData.referencias.referencia;
            setValues(jsonData);
            Referencia({
                referencias:{
                    titulo: titulo,
                    referencia:curriculumData.referencias.referencia
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombreReferencia = e.target.nameReferencia.value;
        const cargoReferencia = e.target.cargoReferencia.value;
        const numeroReferencia = e.target.numeroReferencia.value;
    
        if (nombreReferencia && cargoReferencia && numeroReferencia) {
            let nuevasValues;
            if (valuesParaEditar) {
                // Actualizar el referencia existente en el estado si estamos en modo de edición
                nuevasValues = values.map((value) => {
                if (value === valuesParaEditar) {
                    return {
                        nombre: nombreReferencia,
                        cargo: cargoReferencia,
                        numero: numeroReferencia,
                    };
                }
                return value;
                });
                setValues(nuevasValues);
                setValuesParaEditar(null); // Salir del modo de edición después de actualizar
                setModalTitle('Agregar'); // Restablecer el título del modal
            } else {
                const nuevoValues = { nombre: nombreReferencia, cargo: cargoReferencia, numero: numeroReferencia };
                nuevasValues = [...values, nuevoValues];
            }
            setValues(nuevasValues);
            e.target.reset();
            closeButtonRef.current.click();
            Referencia({
                referencias:{
                    titulo: titulo,
                    referencia:nuevasValues
                }
            });
        }
    };
    const handleEditarFila = (index) => {
        // Configurar el referencia para editar y mostrar el modal de edición
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
            Referencia({
                referencias:{
                    titulo: titulo,
                    referencia:nuevasValues
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
                        name="referencia-titulo"
                        id="InputReferenciaTitulo"
                        title='Escribe el titulo (por ejemplo: < Referencia />'
                        value={titulo}
                        onChange={handleChange}
                    />
                    <label htmlFor="InputReferenciaTitulo">Titulo para la Sección</label>
                </div>
            </div>
            <div className='col col-md-12'>
                <div className="card">
                    <div className="card-header">
                        <div className='col d-flex justify-content-end'>
                            <button className='btn btn-success' type='button' data-bs-toggle="modal" data-bs-target={`#exampleModal${id_accordion}`} onClick={() => setModalTitle('Agregar')}>Agregar Referencia</button>
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
                                                <input type="text" className="form-control" name="nameReferencia" id="nameReferencia" placeholder="Ingles" defaultValue={valuesParaEditar ? valuesParaEditar.nombre : ''} required></input>
                                                <label htmlFor="nameReferencia">Nombre de referencia</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" name="cargoReferencia" id="cargoReferencia" placeholder="Coordinador" defaultValue={valuesParaEditar ? valuesParaEditar.cargo : ''} required></input>
                                                <label htmlFor="cargoReferencia">Cargo de referencia</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" name="numeroReferencia" id="numeroReferencia" placeholder="(+51) 997767771" defaultValue={valuesParaEditar ? valuesParaEditar.numero : ''} required></input>
                                                <label htmlFor="numeroReferencia">Numero de referencia</label>
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
                                    <th>Cargo</th>
                                    <th>Numero</th>
                                    <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="referenciaTableBody">
                                {values.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value.nombre}</td>
                                        <td>{value.cargo}</td>
                                        <td>{value.numero}</td>
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
                                    <th>Cargo</th>
                                    <th>Numero</th>
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