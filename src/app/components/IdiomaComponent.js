import React, { useEffect,useState,useRef } from 'react';

export const IdiomaComponent = (props) => {
    const {id_accordion, curriculumData,Idioma} = props;
    //const [values, setValues] = useState([]);//{`${id_accordion}`
    const [values, setValues] = useState([]);
    const [selectedValue, setSelectedValue] = useState("Básico");
    const [modalTitle, setModalTitle] = useState('Agregar');
    const [valuesParaEditar, setValuesParaEditar] = useState(null);
    const closeButtonRef = useRef(null);
    
    const [titulo, setTitulo] = useState(curriculumData?.idiomas.titulo || '< Idiomas />');
    
    useEffect(() => {
        if (curriculumData){
            if(curriculumData.idiomas.titulo) {
                setTitulo(curriculumData.idiomas.titulo);
            }
        }
    }, [curriculumData]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'idioma-titulo') {
            setTitulo(value);
        }
        Idioma({
            idiomas:{
                titulo: name === 'idioma-titulo' ? value : titulo,
                idioma:values
            }
        });
    };
    
    useEffect(() => {
        if (curriculumData && curriculumData.idiomas && curriculumData.idiomas.idioma) {
            const jsonData = curriculumData.idiomas.idioma;
            setValues(jsonData);
            Idioma({
                idiomas:{
                    titulo: titulo,
                    idioma:curriculumData.idiomas.idioma
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombreIdioma = e.target.nameIdioma.value;
        const gradoIdioma = e.target.gradoIdioma.value;
        const nivelIdioma = e.target.nivelIdioma.value;
    
        if (nombreIdioma && gradoIdioma && nivelIdioma) {
            let nuevasValues;
            if (valuesParaEditar) {
                // Actualizar el idioma existente en el estado si estamos en modo de edición
                nuevasValues = values.map((value) => {
                if (value === valuesParaEditar) {
                    return {
                        nombre: nombreIdioma,
                        grado: gradoIdioma,
                        nivel: nivelIdioma,
                    };
                }
                return value;
                });
                setValues(nuevasValues);
                setValuesParaEditar(null); // Salir del modo de edición después de actualizar
                setModalTitle('Agregar'); // Restablecer el título del modal
            } else {
                const nuevoValues = { nombre: nombreIdioma, grado: gradoIdioma, nivel: nivelIdioma };
                nuevasValues = [...values, nuevoValues];
            }
            setValues(nuevasValues);
            e.target.reset();
            closeButtonRef.current.click();
            Idioma({
                idiomas:{
                    titulo: titulo,
                    idioma:nuevasValues
                }
            });
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
            Idioma({
                idiomas:{
                    titulo: titulo,
                    idioma:nuevasValues
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
                        name="idioma-titulo"
                        id="InputIdiomaTitulo"
                        title='Escribe el titulo (por ejemplo: < Idiomas />'
                        value={titulo}
                        onChange={handleChange}
                    />
                    <label htmlFor="InputIdiomaTitulo">Titulo para la Sección</label>
                </div>
            </div>
            <div className='col col-md-12'>
                <div className="card">
                    <div className="card-header">
                        <div className='col d-flex justify-content-end'>
                            <button className='btn btn-success' type='button' data-bs-toggle="modal" data-bs-target={`#exampleModal${id_accordion}`} onClick={() => setModalTitle('Agregar')}>Agregar Idioma</button>
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
                                                <input type="text" className="form-control" name="nameIdioma" id="nameIdioma" placeholder="Ingles" defaultValue={valuesParaEditar ? valuesParaEditar.nombre : ''} required></input>
                                                <label htmlFor="nameIdioma">Nombre del idioma</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <select className="form-control form-select" name="gradoIdioma" id="gradoIdioma" aria-label="Default select example" value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} required>
                                                    <option value="">Seleccionar el mas adecuado</option>
                                                    <option value="Básico">Básico</option>
                                                    <option value="Intermedio">Intermedio</option>
                                                    <option value="Avanzado">Avanzado</option>
                                                    <option value="Nativo">Nativo</option>
                                                </select>
                                                <label htmlFor="gradoIdioma">Grado del idioma</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="nivelIdioma"
                                                    id="nivelIdioma"
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
                                                <label htmlFor="nivelIdioma">Nivel del idioma</label>
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
                                        <th>Grado</th>
                                        <th>Nivel</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id='idiomaTableBody'>
                                {values.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value.nombre}</td>
                                        <td>{value.grado}</td>
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
                                        <th>Grado</th>
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