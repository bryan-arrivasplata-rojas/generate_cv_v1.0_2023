import React from 'react';
import { ColorComponet } from '../components/ColorComponent';
import { TipoComponet } from '../components/TipoComponent';

import { IdiomaComponent } from '../components/IdiomaComponent';
import { ConocimientoComponent } from '../components/ConocimientoComponent';
import { ProyectoComponent } from '../components/ProyectoComponent';
import { ReferenciaComponent } from '../components/ReferenciaComponent';
import { SkillComponent } from '../components/SkillComponent';
import { ExperienciaComponent } from '../components/ExperienciaComponent';

import { Accordion } from '../components/accordion';
import { InformacionPreviaComponent } from '../components/InformacionPreviaComponent';
import { AcercadeMiComponent } from '../components/AcercadeMiComponent';
import { InformacionContactoComponent } from '../components/InformacionContactoComponent';
import { FormacionComponent } from '../components/FormacionComponent';
import { ParticipacionComponent } from '../components/ParticipacionComponent';

export const BodyConnectors = (props) => {
    const {
        curriculumData,AcercadeMi,Conocimiento,Experiencia,FormacionCertificado,Formacion,
        FormacionProfesion,Idioma,InformacionContacto,InformacionPrevia,ParticipacionCharla,
        ParticipacionEvento,Participacion,Proyecto,Referencia,Skill,SkillDestacado,
        SkillNoDestacado,Color,Tipo,onFileImage
    } = props;
    return (
        <div className='container-fluid cv'>
            <div id="CurriculumForm">
                <h1>Crear Currículum</h1>
                <div className='row'>
                    <ColorComponet curriculumData={curriculumData} Color={Color}/>
                    <TipoComponet curriculumData={curriculumData} Tipo={Tipo}/>
                    <div className='col col-lg-12 col-md-12 col-sm-12 options'>
                        <div className="accordion" id="Curriculum">
                            <Accordion text_accordion={'Información Previa'} id_accordion={'InformacionPrevia'} component={<InformacionPreviaComponent id_accordion={'InformacionPrevia'} curriculumData={curriculumData} InformacionPrevia={InformacionPrevia} onFileImage={onFileImage}/>}/>
                            <Accordion text_accordion={'Acerca de Mi'} id_accordion={'AcercadeMi'} component={<AcercadeMiComponent id_accordion={'AcercadeMi'} curriculumData={curriculumData} AcercadeMi={AcercadeMi}/>}/>
                            <Accordion text_accordion={'Información de Contacto'} id_accordion={'Contacto'} component={<InformacionContactoComponent id_accordion={'Contacto'} curriculumData={curriculumData} InformacionContacto={InformacionContacto}/>}/>
                            <Accordion text_accordion={'Formación'} id_accordion={'Formacion'} component={<FormacionComponent id_accordion={'Formacion'} curriculumData={curriculumData} Formacion={Formacion} FormacionProfesion={FormacionProfesion} FormacionCertificado={FormacionCertificado}/>}/>
                            <Accordion text_accordion={'Participacion'} id_accordion={'Participacion'} component={<ParticipacionComponent id_accordion={'Participacion'} curriculumData={curriculumData} Participacion={Participacion} ParticipacionEvento={ParticipacionEvento} ParticipacionCharla={ParticipacionCharla}/>}/>
                            <Accordion text_accordion={'Idiomas'} id_accordion={'Idioma'} component={<IdiomaComponent id_accordion={'Idioma'} curriculumData={curriculumData} Idioma={Idioma}/>}/>
                            <Accordion text_accordion={'Conocimientos'} id_accordion={'Conocimiento'} component={<ConocimientoComponent id_accordion={'Conocimiento'} curriculumData={curriculumData} Conocimiento={Conocimiento}/>}/>
                            <Accordion text_accordion={'Proyectos'} id_accordion={'Proyecto'} component={<ProyectoComponent id_accordion={'Proyecto'} curriculumData={curriculumData} Proyecto={Proyecto}/>}/>
                            <Accordion text_accordion={'Referencias'} id_accordion={'Referencia'} component={<ReferenciaComponent id_accordion={'Referencia'} curriculumData={curriculumData} Referencia={Referencia}/>}/>
                            <Accordion text_accordion={'Skills'} id_accordion={'Skill'} component={<SkillComponent id_accordion={'Skill'} curriculumData={curriculumData} Skill={Skill} SkillDestacado={SkillDestacado} SkillNoDestacado={SkillNoDestacado}/>}/>
                            <Accordion text_accordion={'Experiencias'} id_accordion={'Experiencia'} component={<ExperienciaComponent id_accordion={'Experiencia'} curriculumData={curriculumData} Experiencia={Experiencia}/>}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}