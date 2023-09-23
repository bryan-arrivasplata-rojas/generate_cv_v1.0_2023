import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom';
import './App.scss';
import { HeaderConnectors } from './app/connectors/Header';
import { BodyConnectors } from './app/connectors/Body';
import { FooterConnectors } from './app/connectors/Footer';

function App() {
  const [curriculumData, setCurriculumData] = useState(null);
  const [curriculum,setCurriculum] = useState([]);
  const [AcercadeMi, setAcercadeMi] = useState(null);
  const [Color, setColor] = useState(null);
  const [Tipo, setTipo] = useState(null);
  const [Conocimiento, setConocimiento] = useState(null);
  const [Experiencia, setExperiencia] = useState(null);
  const [FormacionCertificado, setFormacionCertificado] = useState(null);
  const [Formacion, setFormacion] = useState(null);
  const [FormacionProfesion, setFormacionProfesion] = useState(null);
  const [Idioma, setIdioma] = useState(null);
  const [InformacionContacto, setInformacionContacto] = useState(null);
  const [InformacionPrevia, setInformacionPrevia] = useState([]);
  const [ParticipacionCharla, setParticipacionCharla] = useState([]);
  const [ParticipacionEvento, setParticipacionEvento] = useState([]);
  const [Participacion, setParticipacion] = useState([]);
  const [Proyecto, setProyecto] = useState(null);
  const [Referencia, setReferencia] = useState(null);
  const [Skill, setSkill] = useState(null);
  const [SkillDestacado, setSkillDestacado] = useState(null);
  const [SkillNoDestacado, setSkillNoDestacado] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonData = JSON.parse(event.target.result);
      setCurriculumData(jsonData);
    };
    reader.readAsText(file);
  };
  const handleImageUpload = (image) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result)
    }
    reader.readAsDataURL(image);
  };

  const handleAcercadeMi = (values) => {setAcercadeMi(values);};
  const handleColor = (values) => {setColor(values);};
  const handleTipo = (values) => {setTipo(values);};
  const handleConocimiento = (values) => {setConocimiento(values);};
  const handleExperiencia = (values) => {setExperiencia(values);};
  const handleFormacionCertificado = (values) => {setFormacionCertificado(values);};
  const handleFormacion = (values) => {setFormacion(values);};
  const handleFormacionProfesion = (values) => {setFormacionProfesion(values);};
  const handleIdioma = (values) => {setIdioma(values);};
  const handleInformacionContacto = (values) => {setInformacionContacto(values);};
  const handleParticipacionCharla = (values) => {setParticipacionCharla(values);};
  const handleParticipacionEvento = (values) => {setParticipacionEvento(values);};
  const handleParticipacion = (values) => {setParticipacion(values);};
  const handleProyecto = (values) => {setProyecto(values);};
  const handleReferencia = (values) => {setReferencia(values);};
  const handleSkill = (values) => {setSkill(values);};
  const handleSkillDestacado = (values) => {setSkillDestacado(values);};
  const handleSkillNoDestacado = (values) => {setSkillNoDestacado(values);};
  const handleInformacionPrevia = (values) => {setInformacionPrevia(values);};
  
  var foto;
  useEffect(() => {
    if (Formacion && Formacion.formaciones && Formacion.formaciones.formacion) {
      Formacion.formaciones.formacion.profesiones = { ...FormacionProfesion }.profesiones; // Agrega FormacionProfesion al array.
      Formacion.formaciones.formacion.certificados = { ...FormacionCertificado }.certificados; // Agrega FormacionCertificado al array.
    }
    if (Skill && Skill.skills && Skill.skills.skill) {
      Skill.skills.skill.destacan = { ...SkillDestacado }.destacan; // Agrega FormacionProfesion al array.
      Skill.skills.skill.no_destacan = { ...SkillNoDestacado }.no_destacan; // Agrega FormacionCertificado al array.
    }
    if (Participacion && Participacion.participaciones && Participacion.participaciones.participacion) {
      Participacion.participaciones.participacion.eventos = { ...ParticipacionEvento }.eventos; // Agrega FormacionProfesion al array.
      Participacion.participaciones.participacion.charlas = { ...ParticipacionCharla }.charlas; // Agrega FormacionCertificado al array.
    }
    if (InformacionPrevia){
      var titulo = InformacionPrevia.titulo;
      var search = InformacionPrevia.search;
      var nombres = InformacionPrevia.nombres;
      var apellidos = InformacionPrevia.apellidos;
      var edad = InformacionPrevia.edad;
    }
    if(Color){
      var colors = Color.colors;
    }
    if(Tipo){
      var tipo_selected = Tipo.tipo_selected;
    }
    if(InformacionContacto){var contacto = InformacionContacto.contacto;}
    if(AcercadeMi){var informacion = AcercadeMi.informacion;}
    if(Idioma){var idiomas = Idioma.idiomas;}
    if(Referencia){var referencias = Referencia.referencias;}
    if(Skill){var skills = Skill.skills; }
    if(Participacion){var participaciones = Participacion.participaciones;}
    if(Formacion){var formaciones = Formacion.formaciones;}
    if(Conocimiento){var conocimientos = Conocimiento.conocimientos;}
    if(Experiencia){var experiencias = Experiencia.experiencias;}
    if(Proyecto){var proyectos = Proyecto.proyectos;}
    if(uploadedImage){foto = uploadedImage;}
    setCurriculum({
      titulo,search,nombres,apellidos,edad,foto,colors,tipo_selected,
      contacto,informacion,idiomas,referencias,skills,participaciones,
      formaciones,conocimientos,experiencias,proyectos,
    });
  }, [InformacionPrevia,Color,Tipo,InformacionContacto,AcercadeMi,Idioma,Referencia,Skill,Participacion,Formacion,Conocimiento,Experiencia,Proyecto,uploadedImage]);

  return (
    <Router basename='/generate_cv'>
      <Routes>
        <Route path="/" element={
          <div className="app">
            <div className="app-header">
              <HeaderConnectors onFileUpload={handleFileUpload}/>
            </div>
            <div className='app-body'>
              <BodyConnectors curriculumData={curriculumData}
                AcercadeMi={handleAcercadeMi}
                Conocimiento={handleConocimiento}
                Experiencia={handleExperiencia}
                FormacionCertificado={handleFormacionCertificado}
                Formacion={handleFormacion}
                FormacionProfesion={handleFormacionProfesion}
                Idioma={handleIdioma}
                InformacionContacto={handleInformacionContacto}
                InformacionPrevia={handleInformacionPrevia} onFileImage={handleImageUpload}
                ParticipacionCharla={handleParticipacionCharla}
                ParticipacionEvento={handleParticipacionEvento}
                Participacion={handleParticipacion}
                Proyecto={handleProyecto}
                Referencia={handleReferencia}
                Skill={handleSkill}
                SkillDestacado={handleSkillDestacado}
                SkillNoDestacado={handleSkillNoDestacado}
                Color={handleColor}
                Tipo={handleTipo}
              />
            </div>
            <div className='app-footer'>
              <FooterConnectors curriculum={curriculum}/>
            </div>
          </div>
        }/>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;