import React, { useEffect,useState } from 'react';
import { Accordion } from '../components/accordion';
import { ParticipacionEventoComponent } from '../components/ParticipacionEventoComponent';
import { ParticipacionCharlaComponent } from '../components/ParticipacionCharlaComponent';
export const ParticipacionComponent = (props) => {
    const {curriculumData,Participacion,ParticipacionEvento,ParticipacionCharla} = props;
    const [titulo, setTitulo] = useState(curriculumData?.participaciones.titulo || '< Participaciones />');
    
    const handleGenerarValues = () => {
        Participacion({
            participaciones:{
                titulo: titulo,
                participacion:{}
            }
        });
    };

    useEffect(() => {
        if (curriculumData){
            if(curriculumData.participaciones.titulo) {
                setTitulo(curriculumData.participaciones.titulo);
                Participacion({
                    participaciones:{
                        titulo: curriculumData.participaciones.titulo,
                        participacion:{}
                    }
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'participacion-titulo') {
            setTitulo(value);
        }
        Participacion({
            participaciones:{
                titulo: name === 'participacion-titulo' ? value : titulo,
                participacion:{}
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
                        name="participacion-titulo"
                        id="InputParticipacionTitulo"
                        title='Escribe el titulo (por ejemplo: < Participaciones />'
                        value={titulo}
                        onChange={handleChange}
                    />
                    <label htmlFor="InputParticipacionTitulo">Titulo para la Sección</label>
                </div>
            </div>
            <div className='col col-12 col-md-12 col-sm-12 col-lg-12'>
                <div className="accordion" id="CurriculumParticipacion">
                    <Accordion text_accordion={'Eventos'} id_accordion={'ParticipacionEvento'} component={<ParticipacionEventoComponent id_accordion={'ParticipacionEvento'} curriculumData={curriculumData} ParticipacionEvento={ParticipacionEvento} generarValues={handleGenerarValues}/>}/>
                    <Accordion text_accordion={'Charlas'} id_accordion={'ParticipacionCharla'} component={<ParticipacionCharlaComponent id_accordion={'ParticipacionCharla'} curriculumData={curriculumData} ParticipacionCharla={ParticipacionCharla} generarValues={handleGenerarValues}/>}/>
                </div>
            </div>
        </div>
    )
}