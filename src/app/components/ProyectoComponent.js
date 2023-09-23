import React, { useEffect,useState,useRef } from 'react';

export const ProyectoComponent = (props) => {
    const {id_accordion, curriculumData,Proyecto} = props;
    //const [values, setValues] = useState([]);//{`${id_accordion}`
    const [values, setValues] = useState([]);
    const [modalTitle, setModalTitle] = useState('Agregar');
    const [valuesParaEditar, setValuesParaEditar] = useState(null);
    const closeButtonRef = useRef(null);
    
    const [titulo, setTitulo] = useState(curriculumData?.proyectos.titulo || '< Proyectos propios />');
    useEffect(() => {
        if (curriculumData){
            if(curriculumData.proyectos.titulo) {
                setTitulo(curriculumData.proyectos.titulo);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'proyecto-titulo') {
            setTitulo(value);
        }
        Proyecto({
            proyectos:{
                titulo: name === 'proyecto-titulo' ? value : titulo,
                proyecto:values
            }
        });
    };

    useEffect(() => {
        if (curriculumData && curriculumData.proyectos && curriculumData.proyectos.proyecto) {
            const jsonData = curriculumData.proyectos.proyecto;
            setValues(jsonData);
            Proyecto({
                proyectos:{
                    titulo: titulo,
                    proyecto:curriculumData.proyectos.proyecto
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombreProyecto = e.target.nameProyecto.value;
        const descripcionProyecto = e.target.descripcionProyecto.value;
        const lenguajeProyecto = e.target.lenguajeProyecto.value;
        const enlaceProyecto = e.target.enlaceProyecto.value;
    
        if (nombreProyecto && descripcionProyecto && lenguajeProyecto && enlaceProyecto) {
            let nuevasValues;
            if (valuesParaEditar) {
                // Actualizar el proyecto existente en el estado si estamos en modo de edición
                nuevasValues = values.map((value) => {
                    if (value === valuesParaEditar) {
                        return {
                            nombre: nombreProyecto,
                            descripcion: descripcionProyecto,
                            lenguajes: lenguajeProyecto,
                            enlace: enlaceProyecto,
                        };
                    }
                    return value;
                });
                setValues(nuevasValues);
                setValuesParaEditar(null); // Salir del modo de edición después de actualizar
                setModalTitle('Agregar'); // Restablecer el título del modal
            } else {
                const nuevoValues = { nombre: nombreProyecto, descripcion: descripcionProyecto, lenguajes: lenguajeProyecto, enlace:enlaceProyecto };
                nuevasValues = [...values, nuevoValues];
            }
            setValues(nuevasValues);
            e.target.reset();
            closeButtonRef.current.click();
            Proyecto({
                proyectos:{
                    titulo: titulo,
                    proyecto:nuevasValues
                }
            });
        }
    };
    const handleEditarFila = (index) => {
        // Configurar el proyecto para editar y mostrar el modal de edición
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
            Proyecto({
                proyectos:{
                    titulo: titulo,
                    proyecto:nuevasValues
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
                        name="proyecto-titulo"
                        id="InputProyectoTitulo"
                        title='Escribe el titulo (por ejemplo: < Proyectos propios />'
                        value={titulo}
                        onChange={handleChange}
                    />
                    <label htmlFor="InputProyectoTitulo">Titulo para la Sección</label>
                </div>
            </div>
            <div className='col col-md-12'>
                <div className="card">
                    <div className="card-header">
                        <div className='col d-flex justify-content-end'>
                            <button className='btn btn-success' type='button' data-bs-toggle="modal" data-bs-target={`#exampleModal${id_accordion}`} onClick={() => setModalTitle('Agregar')}>Agregar Proyecto</button>
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
                                                <input type="text" className="form-control" name="nameProyecto" id="nameProyecto" placeholder="Ingles" defaultValue={valuesParaEditar ? valuesParaEditar.nombre : ''} required></input>
                                                <label htmlFor="nameProyecto">Nombre del proyecto</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <textarea className="form-control" name="descripcionProyecto" id="descripcionProyecto" placeholder="Hola este es ...." defaultValue={valuesParaEditar ? valuesParaEditar.descripcion : ''} required></textarea>
                                                <label htmlFor="descripcionProyecto">Descripción</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" name="lenguajeProyecto" id="lenguajeProyecto" placeholder="HTML | CSS | JavaScript (React)" defaultValue={valuesParaEditar ? valuesParaEditar.lenguajes : ''} required></input>
                                                <label htmlFor="lenguajeProyecto">Lenguajes del proyecto</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" name="enlaceProyecto" id="enlaceProyecto" placeholder="https://www.bryanarrivasplata.com/" defaultValue={valuesParaEditar ? valuesParaEditar.enlace : ''} required></input>
                                                <label htmlFor="enlaceProyecto">Enlace del proyecto</label>
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
                                    <th>Descripción</th>
                                    <th>Lenguajes</th>
                                    <th>Enlace</th>
                                    <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="proyectoTableBody">
                                {values.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value.nombre}</td>
                                        <td>{value.descripcion}</td>
                                        <td>{value.lenguajes}</td>
                                        <td>{value.enlace}</td>
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
                                    <th>Descripción</th>
                                    <th>Lenguajes</th>
                                    <th>Enlace</th>
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