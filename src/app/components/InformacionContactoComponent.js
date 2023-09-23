import React, { useEffect,useState } from 'react';

export const InformacionContactoComponent = (props) => {
    const {curriculumData,InformacionContacto} = props;
    const [titulo, setTitulo] = useState(curriculumData?.contacto.titulo || '< Datos personales />');
    const [direccion, setDireccion] = useState(curriculumData?.contacto.direccion || '');
    const [numero, setNumero] = useState(curriculumData?.contacto.numero || '');
    const [correo, setCorreo] = useState(curriculumData?.contacto.correo || '');
    const [github, setGithub] = useState(curriculumData?.contacto.github || '');
    const [website, setWebsite] = useState(curriculumData?.contacto.website || '');
    const [linkedin, setLinkedin] = useState(curriculumData?.contacto.linkedin || '');
    useEffect(() => {
        if (curriculumData){
            if(curriculumData.contacto.titulo) {
                setTitulo(curriculumData.contacto.titulo);
            } 
            if (curriculumData.contacto.direccion){
                setDireccion(curriculumData.contacto.direccion);
            }
            if(curriculumData.contacto.numero){
                setNumero(curriculumData.contacto.numero);
            }
            if(curriculumData.contacto.correo){
                setCorreo(curriculumData.contacto.correo);
            }
            if(curriculumData.contacto.github){
                setGithub(curriculumData.contacto.github);
            }
            if(curriculumData.contacto.website){
                setWebsite(curriculumData.contacto.website);
            }
            if(curriculumData.contacto.linkedin){
                setLinkedin(curriculumData.contacto.linkedin);
            }
            InformacionContacto ( {
                contacto: {
                    titulo: curriculumData.contacto.titulo,
                    direccion: curriculumData.contacto.direccion,
                    numero: curriculumData.contacto.numero,
                    correo: curriculumData.contacto.correo,
                    github: curriculumData.contacto.github,
                    website: curriculumData.contacto.website,
                    linkedin: curriculumData.contacto.linkedin,
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        if (name === 'contacto-titulo') {
            setTitulo(value);
        } else if (name === 'contacto-direccion') {
            setDireccion(value);
        } else if (name === 'contacto-numero') {
            setNumero(value);
        } else if (name === 'contacto-correo') {
            setCorreo(value);
        } else if (name === 'contacto-github') {
            setGithub(value);
        } else if (name === 'contacto-website') {
            setWebsite(value);
        } else if (name === 'contacto-linkedin') {
            setLinkedin(value);
        };
        InformacionContacto ( {
            contacto: {
                titulo: name === 'contacto-titulo' ? value : titulo,
                direccion: name === 'contacto-direccion' ? value : direccion,
                numero: name === 'contacto-numero' ? value : numero,
                correo: name === 'contacto-correo' ? value : correo,
                github: name === 'contacto-github' ? value : github,
                website: name === 'contacto-website' ? value : website,
                linkedin: name === 'contacto-linkedin' ? value : linkedin,
            },
        });
    };
    return (
        <div className='row'>
            <div className='col col-12 col-md-12 col-sm-12 col-lg-4'>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="contacto-titulo"
                        id="InputContactoTitulo"
                        title='Escribe el titulo (por ejemplo: < Datos personales />'
                        value={titulo}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="InputContactoTitulo">Titulo para la Sección</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="contacto-direccion"
                        id="InputContactoDireccion"
                        placeholder="Jirón Zorritos 1134, Lima, Perú"
                        title='Escribe el titulo (por ejemplo: Jirón Zorritos 1134, Lima, Perú'
                        value={direccion}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="InputContactoDireccion">Dirección</label>
                </div>
            </div>
            <div className='col col-12 col-md-12 col-sm-12 col-lg-4'>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="contacto-numero"
                        id="InputContactoNumero"
                        placeholder="(+51) 997767771"
                        title='Escribe el número (por ejemplo: (+51) 997767771'
                        value={numero}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="InputContactoNumero">Número</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        name="contacto-correo"
                        id="InputContactoCorreo"
                        placeholder="Correo"
                        value={correo}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="InputContactoCorreo">Correo</label>
                </div>
            </div>
            <div className='col col-12 col-md-12 col-sm-12 col-lg-4'>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="contacto-github"
                        id="InputContactoGithub"
                        placeholder="Github"
                        value={github}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="InputContactoGithub">Github</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="contacto-website"
                        id="InputContactoWebsite"
                        placeholder="www.bryanarrivasplata.com"
                        value={website}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="InputContactoWebsite">Página Web</label>
                </div>
            </div>
            <div className='col col-md-12'>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="contacto-linkedin"
                        id="InputContactoLinkedin"
                        placeholder="Linkedin"
                        value={linkedin}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="InputContactoLinkedin">Linkedin</label>
                </div>
            </div>
        </div>
    )
}