import React, { useEffect,useState } from 'react';
import { Accordion } from '../components/accordion';
import { FormacionProfesionComponent } from '../components/FormacionProfesionComponent';
import { FormacionCertificadoComponent } from '../components/FormacionCertificadoComponent';

export const FormacionComponent = (props) => {
    const {curriculumData,Formacion,FormacionProfesion,FormacionCertificado} = props;
    const [titulo, setTitulo] = useState(curriculumData?.formaciones.titulo || '< Formación Profesional />');

    const handleGenerarValues = () => {
        Formacion({
            formaciones:{
                titulo: titulo,
                formacion:{}
            }
        });
    };
    
    useEffect(() => {
        if (curriculumData){
            if(curriculumData.formaciones.titulo) {
                setTitulo(curriculumData.formaciones.titulo);
                Formacion({
                    formaciones:{
                        titulo: curriculumData.formaciones.titulo,
                        formacion:{}
                    }
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);

    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'formacion-titulo') {
            setTitulo(value);
        }
        Formacion({
            formaciones:{
                titulo: name === 'formacion-titulo' ? value : titulo,
                formacion:{}
            }
        });
    };
    return (
        <div className='row'>
            <div className='col col-12 col-md-12 col-sm-12 col-lg-12'>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="formacion-titulo"
                        id="InputFormacionTitulo"
                        title='Escribe el titulo (por ejemplo: < Formación Profesional />'
                        value={titulo}
                        onChange={handleChange}
                    />
                    <label htmlFor="InputFormacionTitulo">Titulo para la Sección</label>
                </div>
            </div>
            <div className='col col-12 col-md-12 col-sm-12 col-lg-12'>
                <div className="accordion" id="CurriculumFormacion">
                    <Accordion  text_accordion={'Educación'} id_accordion={'FormacionProfesion'} component={<FormacionProfesionComponent id_accordion={'FormacionProfesion'} curriculumData={curriculumData} FormacionProfesion={FormacionProfesion} generarValues={handleGenerarValues}/>}/>
                    <Accordion  text_accordion={'Certificados'} id_accordion={'FormacionCertificado'} component={<FormacionCertificadoComponent id_accordion={'FormacionCertificado'} curriculumData={curriculumData} FormacionCertificado={FormacionCertificado} generarValues={handleGenerarValues}/>}/>
                </div>
            </div>
        </div>
    )
}