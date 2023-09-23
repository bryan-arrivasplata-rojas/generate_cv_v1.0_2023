$(document).ready(function () {
    // Obtener una referencia al botón de descarga
    if(document.querySelector('.btn.btn-outline-danger.btnWidth')){
        const descargarBtn = document.querySelector('.btn.btn-outline-danger.btnWidth');

        // Agregar un evento clic al botón
        $('#descargarJSON').on('click', function(){
        // Crear un objeto que almacenará los datos del CV
            const radioButtonsColor = document.getElementsByName('listGroupRadioColor');
            const radioButtonsTipo = document.getElementsByName('listGroupRadioTipo');
            let selectedValueTipo = null;

            for (const radioButton of radioButtonsTipo) {
                if (radioButton.checked) {
                    selectedValueTipo = radioButton.value;
                    break; // Salir del bucle una vez que se encuentre el radio button seleccionado
                }
            }
            const cvData = {
                titulo: document.querySelector('#InputTitulo').value,
                search: document.querySelector('#InputBusqueda').value,
                nombres: document.querySelector('#InputName').value,
                apellidos: document.querySelector('#InputApellidos').value,
                edad: document.querySelector('#InputEdad').value,
                foto: document.querySelector('#InputFoto').value,
                tipo_selected:selectedValueTipo,
                colors:{
                    color_left:document.querySelector('#color-left').value,
                    color_left_text:document.querySelector('#color-left-text').value,
                    color_right:document.querySelector('#color-right').value,
                    color_right_text:document.querySelector('#color-right-text').value,
                    color_component:document.querySelector('#color-component').value,
                },
                informacion:{
                    titulo: document.querySelector('#InputInformacionTitulo').value,
                    descripcion: document.querySelector('#InputInformacionDescripcion').value,
                },
                contacto:{
                    titulo: document.querySelector('#InputContactoTitulo').value,
                    direccion: document.querySelector('#InputContactoDireccion').value,
                    numero: document.querySelector('#InputContactoNumero').value,
                    correo: document.querySelector('#InputContactoCorreo').value,
                    github: document.querySelector('#InputContactoGithub').value,
                    website: document.querySelector('#InputContactoWebsite').value,
                    linkedin: document.querySelector('#InputContactoLinkedin').value,
                },
                formaciones:{
                    titulo: document.querySelector('#InputFormacionTitulo').value,
                    formacion:{
                        profesiones: {
                            titulo: document.querySelector('#InputFormacionProfesionTitulo').value,
                            profesion:[],
                        },
                        certificados:{
                            titulo: document.querySelector('#InputFormacionCertificadoTitulo').value,
                            certificado:[]
                        }
                    }
                },
                participaciones:{
                    titulo: document.querySelector('#InputParticipacionTitulo').value,
                    participacion: {
                        eventos:{
                            titulo: document.querySelector('#InputParticipacionEventoTitulo').value,
                            evento:[]
                        },
                        charlas:{
                            titulo: document.querySelector('#InputParticipacionCharlaTitulo').value,
                            charla:[]
                        }
                    },
                },
                idiomas:{
                    titulo: document.querySelector('#InputIdiomaTitulo').value,
                    idioma: [],
                },
                conocimientos:{
                    titulo: document.querySelector('#InputConocimientoTitulo').value,
                    conocimiento: [],
                },
                proyectos:{
                    titulo: document.querySelector('#InputProyectoTitulo').value,
                    proyecto: [],
                },
                referencias:{
                    titulo: document.querySelector('#InputReferenciaTitulo').value,
                    referencia: [],
                },
                skills:{
                    titulo: document.querySelector('#InputSkillTitulo').value,
                    skill:{
                        destacan: {
                            titulo: document.querySelector('#InputSkillDestacanTitulo').value,
                            destacado:[],
                        },
                        no_destacan:{
                            titulo: document.querySelector('#InputSkillNoDestacanTitulo').value,
                            destacado:[]
                        }
                    }
                },
                experiencias:{
                    titulo: document.querySelector('#InputExperienciaTitulo').value,
                    experiencia: [],
                }
                // Agregar más campos aquí según sea necesario
            };
            
            //FORMACIÓN
            $('#example tbody#formacionProfesionTableBody tr').each(function () {
                const gradoFormacionProfesion = $(this).find('td:eq(0)').text();
                const especialidadFormacionProfesion = $(this).find('td:eq(1)').text();
                const universidadFormacionProfesion = $(this).find('td:eq(2)').text();
                const anoFormacionProfesion = $(this).find('td:eq(3)').text();
                const mesFormacionProfesion = $(this).find('td:eq(4)').text();
        
                // Crear un objeto para el idioma y agregarlo al arreglo de idiomas
                const value = {
                    grado: gradoFormacionProfesion,
                    especialidad: especialidadFormacionProfesion,
                    universidad: universidadFormacionProfesion,
                    year: anoFormacionProfesion,
                    mes:mesFormacionProfesion
                };
        
                cvData.formaciones.formacion.profesiones.profesion.push(value);
            });
            $('#example tbody#formacionCertificadoTableBody tr').each(function () {
                const nombreFormacionCertificado = $(this).find('td:eq(0)').text();
                const anoFormacionCertificado = $(this).find('td:eq(1)').text();
                const mesFormacionCertificado = $(this).find('td:eq(2)').text();
        
                // Crear un objeto para el idioma y agregarlo al arreglo de idiomas
                const value = {
                    nombre: nombreFormacionCertificado,
                    year: anoFormacionCertificado,
                    mes:mesFormacionCertificado
                };
        
                cvData.formaciones.formacion.certificados.certificado.push(value);
            });
            //PARTICIPACION
            $('#example tbody#participacionEventoTableBody tr').each(function () {
                const nombreParticipacionEvento = $(this).find('td:eq(0)').text();
                const anoParticipacionEvento = $(this).find('td:eq(1)').text();
                const mesParticipacionEvento = $(this).find('td:eq(2)').text();
        
                // Crear un objeto para el idioma y agregarlo al arreglo de idiomas
                const value = {
                    nombre: nombreParticipacionEvento,
                    year: anoParticipacionEvento,
                    mes:mesParticipacionEvento
                };
        
                cvData.participaciones.participacion.eventos.evento.push(value);
            });
            $('#example tbody#participacionCharlaTableBody tr').each(function () {
                const nombreParticipacionCharla = $(this).find('td:eq(0)').text();
                const anoParticipacionCharla = $(this).find('td:eq(1)').text();
                const mesParticipacionCharla = $(this).find('td:eq(2)').text();
        
                // Crear un objeto para el idioma y agregarlo al arreglo de idiomas
                const value = {
                    nombre: nombreParticipacionCharla,
                    year: anoParticipacionCharla,
                    mes:mesParticipacionCharla
                };
        
                cvData.participaciones.participacion.charlas.charla.push(value);
            });
            // Obtener todas las filas de la tabla de idiomas
            $('#example tbody#idiomaTableBody tr').each(function () {
                const nombreIdioma = $(this).find('td:eq(0)').text();
                const gradoIdioma = $(this).find('td:eq(1)').text();
                const nivelIdioma = $(this).find('td:eq(2)').text();
        
                // Crear un objeto para el idioma y agregarlo al arreglo de idiomas
                const value = {
                    nombre: nombreIdioma,
                    grado: gradoIdioma,
                    nivel: parseInt(nivelIdioma), // Convierte el nivel a entero
                };
        
                cvData.idiomas.idioma.push(value);
            });
            //CONOCIMIENTO
            $('#example tbody#conocimientoTableBody tr').each(function () {
                const nombreConocimiento = $(this).find('td:eq(0)').text();
                const nivelConocimiento = $(this).find('td:eq(1)').text();
        
                // Crear un objeto para el idioma y agregarlo al arreglo de idiomas
                const value = {
                    nombre: nombreConocimiento,
                    nivel: parseInt(nivelConocimiento), // Convierte el nivel a entero
                };
        
                cvData.conocimientos.conocimiento.push(value);
            });
            //PROYECTO
            $('#example tbody#proyectoTableBody tr').each(function () {
                const nombreProyecto = $(this).find('td:eq(0)').text();
                const descripcionProyecto = $(this).find('td:eq(1)').text();
                const lenguajeProyecto = $(this).find('td:eq(2)').text();
                const enlaceProyecto = $(this).find('td:eq(3)').text();
        
                // Crear un objeto para el idioma y agregarlo al arreglo de idiomas
                const value = {
                    nombre: nombreProyecto,
                    descripcion: descripcionProyecto,
                    lenguajes: lenguajeProyecto,
                    enlace: enlaceProyecto
                };
        
                cvData.proyectos.proyecto.push(value);
            });
            //REFERENCIA
            $('#example tbody#referenciaTableBody tr').each(function () {
                const nombreReferencia = $(this).find('td:eq(0)').text();
                const cargoReferencial = $(this).find('td:eq(1)').text();
                const numeroReferencia = $(this).find('td:eq(2)').text();
        
                // Crear un objeto para el idioma y agregarlo al arreglo de idiomas
                const value = {
                    nombre: nombreReferencia,
                    cargo: cargoReferencial,
                    numero: numeroReferencia, // Convierte el nivel a entero
                };
        
                cvData.referencias.referencia.push(value);
            });
            //SKILL
            $('#example tbody#skillDestacadoTableBody tr').each(function () {
                const nombreSkillDestacado = $(this).find('td:eq(0)').text();
        
                // Crear un objeto para el idioma y agregarlo al arreglo de idiomas
                const value = nombreSkillDestacado;
        
                cvData.skills.skill.destacan.destacado.push(value);
            });
            $('#example tbody#skillNoDestacadoTableBody tr').each(function () {
                const nombreSkillNoDestacado = $(this).find('td:eq(0)').text();
        
                // Crear un objeto para el idioma y agregarlo al arreglo de idiomas
                const value = nombreSkillNoDestacado;
        
                cvData.skills.skill.no_destacan.destacado.push(value);
            });
            //EXPERIENCIA
            $('#example tbody#experienciaTableBody tr').each(function () {
                const nombreExperiencia = $(this).find('td:eq(0)').text();
                const puestoExperiencia = $(this).find('td:eq(1)').text();
                const descripcionExperiencia = $(this).find('td:eq(2)').text();
                const anoInicioExperiencia = $(this).find('td:eq(3)').text();
                const mesInicioExperiencia = $(this).find('td:eq(4)').text();
                const anoFinExperiencia = $(this).find('td:eq(5)').text();
                const mesFinExperiencia = $(this).find('td:eq(6)').text();
        
                // Crear un objeto para el idioma y agregarlo al arreglo de idiomas
                const value = {
                    nombre_empresa: nombreExperiencia,
                    puesto: puestoExperiencia,
                    descripcion: descripcionExperiencia,
                    inicio: {
                        year:anoInicioExperiencia,
                        mes:mesInicioExperiencia
                    },
                    final: anoFinExperiencia ? {
                        year: anoFinExperiencia, mes: mesFinExperiencia
                    } : {}
                };
                
                cvData.experiencias.experiencia.push(value);
            });
            
            // Convertir el objeto a una cadena JSON
            const cvJson = JSON.stringify(cvData, null, 2);

            // Crear un enlace de descarga
            const a = document.createElement('a');
            a.href = `data:application/json;charset=utf-8,${encodeURIComponent(cvJson)}`;
            a.download = 'cv.json';

            // Simular un clic en el enlace para iniciar la descarga
            a.click();
        });
    }
    

});