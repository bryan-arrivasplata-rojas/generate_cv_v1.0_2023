import React, { useEffect,useState,useRef } from 'react';
export const FormacionCertificadoComponent = (props) => {
    const {id_accordion, curriculumData,FormacionCertificado,generarValues} = props;
    const [values, setValues] = useState([]);
    const [modalTitle, setModalTitle] = useState('Agregar');
    const [valuesParaEditar, setValuesParaEditar] = useState(null);
    const closeButtonRef = useRef(null);
    
    const [titulo, setTitulo] = useState(curriculumData?.formaciones.formacion.certificados.titulo || 'Certificaciones');
    useEffect(() => {
        if (curriculumData && curriculumData.formaciones && curriculumData.formaciones.formacion && curriculumData.formaciones.formacion.certificados && curriculumData.formaciones.formacion.certificados.certificado) {
            const jsonData = curriculumData.formaciones.formacion.certificados.certificado;
            setValues(jsonData);
            FormacionCertificado({
                certificados:{
                    titulo: titulo,// Agrega todos los valores que deseas enviar
                    certificado:curriculumData.formaciones.formacion.certificados.certificado
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);

    useEffect(() => {
        if (curriculumData){
            if(curriculumData.formaciones.formacion.certificados.titulo) {
                setTitulo(curriculumData.formaciones.formacion.certificados.titulo);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'formacion-certificado-titulo') {
            setTitulo(value);
        }
        FormacionCertificado({
            certificados:{
                titulo: name === 'formacion-certificado-titulo' ? value : titulo,// Agrega todos los valores que deseas enviar
                certificado:values
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombreCertificado = e.target.nombreFormacionCertificado.value;
        const anoCertificado = e.target.anoFormacionCertificado.value;
        const mesCertificado = e.target.mesFormacionCertificado.value;
        if (nombreCertificado && anoCertificado && mesCertificado) {
            let nuevasValues;
            if (valuesParaEditar) {
                // Actualizar el idioma existente en el estado si estamos en modo de edición
                nuevasValues = values.map((value) => {
                if (value === valuesParaEditar) {
                    return {
                        nombre: nombreCertificado,
                        year: anoCertificado,
                        mes: mesCertificado,
                    };
                }
                return value;
                });
                setValues(nuevasValues);
                setValuesParaEditar(null); // Salir del modo de edición después de actualizar
                setModalTitle('Agregar'); // Restablecer el título del modal
            } else {
                const nuevoValues = { nombre: nombreCertificado, year: anoCertificado, mes: mesCertificado };
                nuevasValues = [...values, nuevoValues];
            }
            setValues(nuevasValues);
            e.target.reset();
            closeButtonRef.current.click();
            FormacionCertificado({
                certificados:{
                    titulo: titulo,// Agrega todos los valores que deseas enviar
                    certificado:nuevasValues
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
            FormacionCertificado({
                certificados:{
                    titulo: titulo,// Agrega todos los valores que deseas enviar
                    certificado:nuevasValues
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
                        name="formacion-certificado-titulo"
                        id="InputFormacionCertificadoTitulo"
                        title='Escribe el titulo (por ejemplo: Certificaciones'
                        value={titulo}
                        onChange={handleChange}
                    />
                    <label htmlFor="InputFormacionCertificadoTitulo">Titulo para la Sub Sección</label>
                </div>
            </div>
            <div className='col col-md-12'>
                <div className="card">
                    <div className="card-header">
                        <div className='col d-flex justify-content-end'>
                            <button className='btn btn-success' type='button' data-bs-toggle="modal" data-bs-target={`#exampleModal${id_accordion}`} onClick={() => setModalTitle('Agregar')}>Agregar Certificado</button>
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
                                                <input type="text" className="form-control" name="nombreFormacionCertificado" id="nombreFormacionCertificado" placeholder="Master PHP" defaultValue={valuesParaEditar ? valuesParaEditar.nombre : ''} required></input>
                                                <label htmlFor="nombreFormacionCertificado">Nombre</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="anoFormacionCertificado"
                                                    id="anoFormacionCertificado"
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
                                                <label htmlFor="anoFormacionCertificado">Año</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="mesFormacionCertificado"
                                                    id="mesFormacionCertificado"
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
                                                <label htmlFor="mesFormacionCertificado">Mes</label>
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
                                <tbody id='formacionCertificadoTableBody'>
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