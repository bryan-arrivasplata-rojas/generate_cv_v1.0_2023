import React, { useEffect,useState } from 'react';
import { Accordion } from '../components/accordion';
import { SkillDestacadoComponent } from '../components/SkillDestacadoComponent';
import { SkillNoDestacadoComponent } from '../components/SkillNoDestacadoComponent';
export const SkillComponent = (props) => {
    const {curriculumData,Skill,SkillDestacado,SkillNoDestacado} = props;
    const [titulo, setTitulo] = useState(curriculumData?.skills.titulo || '< Habilidades />');
    
    const handleGenerarValues = () => {
        Skill({
            skills:{
                titulo: titulo,
                skill:{}
            }
        });
    };
    
    useEffect(() => {
        if (curriculumData){
            if(curriculumData.skills.titulo) {
                setTitulo(curriculumData.skills.titulo);
                Skill({
                    skills:{
                        titulo: curriculumData.skills.titulo,
                        skill:{}
                    }
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'skill-titulo') {
            setTitulo(value);
        }
        Skill({
            skills:{
                titulo: name === 'skill-titulo' ? value : titulo,
                skill:{}
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
                        name="skill-titulo"
                        id="InputSkillTitulo"
                        title='Escribe el titulo (por ejemplo: < Habilidades />'
                        value={titulo}
                        onChange={handleChange}
                    />
                    <label htmlFor="InputSkillTitulo">Titulo para la Sección</label>
                </div>
            </div>
            <div className='col col-12 col-md-12 col-sm-12 col-lg-12'>
                <div className="accordion" id="CurriculumSkill">
                    <Accordion  text_accordion={'Destacados'} id_accordion={'SkillDestacado'} component={<SkillDestacadoComponent id_accordion={'SkillDestacado'} curriculumData={curriculumData} SkillDestacado={SkillDestacado} generarValues={handleGenerarValues}/>}/>
                    <Accordion  text_accordion={'No Destacados'} id_accordion={'SkillNoDestacado'} component={<SkillNoDestacadoComponent id_accordion={'SkillNoDestacado'} curriculumData={curriculumData} SkillNoDestacado={SkillNoDestacado} generarValues={handleGenerarValues}/>}/>
                </div>
            </div>
        </div>
    )
}