import React, { useEffect,useState } from 'react';

export const AcercadeMiComponent = (props) => {
    const {curriculumData,AcercadeMi} = props;
    const [titulo, setTitulo] = useState(curriculumData?.informacion.titulo || '< Acerca de Mi />');
    const [descripcion, setDescripcion] = useState(curriculumData?.informacion.descripcion || '');
    useEffect(() => {
        if (curriculumData){
            if(curriculumData.informacion.titulo) {
                setTitulo(curriculumData.informacion.titulo);
            } 
            if (curriculumData.informacion.descripcion){
                setDescripcion(curriculumData.informacion.descripcion);
            }
            AcercadeMi ( {
                informacion: {
                    titulo: curriculumData.informacion.titulo,
                    descripcion: curriculumData.informacion.descripcion,
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'informacion-titulo') {
            setTitulo(value);
        } else if (name === 'informacion-descripcion') {
            setDescripcion(value);
        };
        AcercadeMi ( {
            informacion: {
                titulo: name === 'informacion-titulo' ? value : titulo,
                descripcion: name === 'informacion-descripcion' ? value : descripcion,
            },
        });
    };
    return (
        <div className='col col-12'>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="informacion-titulo"
                    id="InputInformacionTitulo"
                    title="Escribe el titulo de información (por ejemplo: < Acerca de mi />)"
                    value={titulo}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="InputInformacionTitulo">Titulo para la Sección</label>
            </div>
            <div className="form-floating mb-3">
                <textarea
                    className="form-control"
                    name="informacion-descripcion"
                    id="InputInformacionDescripcion"
                    placeholder="Hola, soy ...."
                    value={descripcion}
                    onChange={handleChange}
                    required>
                </textarea>
                <label htmlFor="InputInformacionDescripcion">Descripción</label>
            </div>
        </div>
    )
}