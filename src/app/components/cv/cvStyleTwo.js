import React from 'react';
import { PDFViewer, Page, Document, Text, StyleSheet, View, Image } from '@react-pdf/renderer';
export const CvStyleTwo = (props) => {
  const {archivoJSON} = props;

  var color_left = archivoJSON.colors ? archivoJSON.colors.color_left: '#3498DB';
  var color_left_text = archivoJSON.colors ? archivoJSON.colors.color_left_text: '#000000';
  var color_right = archivoJSON.colors ? archivoJSON.colors.color_right: '#00AAE4';
  var color_right_text = archivoJSON.colors ? archivoJSON.colors.color_right_text: '#FFFFFF';
  var color_component = archivoJSON.colors ? archivoJSON.colors.color_component: '#00AAE4';
  const color_component_close = '#ecf0f1';

  const styles = StyleSheet.create({
    // Define tus estilos para el PDF aquí
    encabezado:{
      fondo:{
        backgroundColor: '#fff',
        padding: 5,
        textAlign:"center",
        alignItems: 'center', // Centra elementos horizontalmente
        justifyContent: 'center', // Centra elementos verticalmente
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
      },
      title_text:{
        color: '#000',
        fontSize: 24,
        fontWeight:"bold"
      },
      description:{
        color: '#000',
        fontSize: 16,
        padding:5,
      },
      image: {
        width: 100, // Ancho de la imagen
        height: 100, // Alto de la imagen
        borderRadius: 100,
        position: 'absolute',
        textAlign:"center",
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        top:'75',
        zIndex: -1,
        /*position: 'absolute', // Establece la posición absoluta
        top: 0, // Ajusta la posición superior según sea necesario
        right: 0,
        zIndex: 9999,*/
      },
    },
    image_profile:{
      container:{
        width:"100%",
        display: 'flex',
        position:"absolute",
        left:"89%"
      },
      image: {
        width: 60, // Ancho de la imagen
        height: 60, // Alto de la imagen
        borderRadius: "5%",
        margin:'3',
        right:-1,
        zIndex: 9999
      }
    },
    sub_encabezado:{
      main: {
        flexDirection: 'row',
        width:"100%",
        zIndex: 1,
      },
      left:{
        fondo:{
          backgroundColor: color_left,
          textAlign:"center",
          alignItems: 'center', // Centra elementos horizontalmente
          justifyContent: 'center', // Centra elementos verticalmente
          padding:10,
          width:"100%",
          borderWidth: 0,
          borderColor: 'transparent',
        },
        texto:{
          color: color_left_text,
          fontSize: 10,
          fontWeight:"bold",
        }
      },
      right:{
        fondo:{
          backgroundColor: color_right,
          textAlign:"center",
          alignItems: 'center', // Centra elementos horizontalmente
          justifyContent: 'center', // Centra elementos verticalmente
          padding:10,
          width:"100%",
          borderWidth: 0,
          borderColor: 'transparent',
        },
        texto:{
          color: color_right_text,
          fontSize: 10,
          fontWeight:"bold",
        }
      },
      image:{
        height:20,
        width:20,
        borderRadius:100,
        flexDirection: 'column', // Apila los elementos verticalmente
        alignItems: 'center', // Alinea los elementos al centro horizontalmente
        marginBottom: 10, // Espacio entre el icono y el encabezado
        position:"absolute",
        top:"-10",
        backgroundColor:"#fff",
        padding:5
      }
    },
    contenido_base: {
      main: {
        flexDirection: 'row',
        width:"100%",
        zIndex: 1,
      },
      fondo:{
        padding:10,
        width:"50%",
        borderWidth: 0,
        borderColor: 'transparent',
      },
      sub_fondo:{
      },
      sub_fondo_low:{
        padding:10,
        alignItems: 'center', // Centra verticalmente
        justifyContent: 'center', // Centra horizontalmente y verticalmente
        textAlign:'center'
      },
      container:{
        padding:0
      },
      container_row:{
        marginBottom: 10,
        width: '100%', // Cada elemento ocupará el 50% del ancho de la página
      },
      title:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:"center",
      },
      texto:{
        fontSize: 12,
        textAlign: "justify",
      },
      subtitle:{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:"center",
        alignItems: 'center', // Centra verticalmente
        justifyContent: 'center',
      },
      container_texto:{
        main:{
          flexDirection: 'row',
          width:"93%",
          padding:5,
          marginBottom:5,
          alignItems: 'center', // Centra verticalmente
          justifyContent: 'center', // Centra horizontalmente y verticalmente
          textAlign:'center',
        },
        main_low:{
          flexDirection: 'row',
          width:"100%",
          paddingLeft:5,
          paddingRight:5,
          alignItems: 'center', // Centra verticalmente
          justifyContent: 'center', // Centra horizontalmente y verticalmente
          textAlign:'center'
        },
        container_texto_timeline:{
          width:"15%",
          height:"100%",
          alignItems: 'center', // Centra verticalmente
          justifyContent: 'center', // Centra horizontalmente y verticalmente
          textAlign:'center'
        },
        texto_timeline:{
          fontSize:10,
          textAlign: 'center',
        },
        container_texto_texto:{
          width:"85%",
          justifyContent: 'center',
        },
        titulo_primary:{
          fontWeight:'bold',
          fontSize:14,
          textAlign: 'center',
          marginBottom:1
        },
        titulo_secondary:{
          fontWeight:'bold',
          fontSize:12,
          marginBottom:5
        },
        container_fecha:{
          
        },
        texto:{
          fontSize:12,
          textAlign:'justify'
        },
        cuadrado_celeste: {
          backgroundColor:  color_component,
          width: '25%',
          height: '3'
        },
        linea: {
          // Estilos para la línea de unión
          backgroundColor: color_component, // Cambia el color de la línea según tus preferencias
          width: 3, // Ancho de la línea
          height: '35%', // La línea ocupa toda la altura disponible
          marginLeft: 5, // Espacio entre la línea y los textos
          marginRight: 5,
          alignItems:"center",
          position:'relative'
        },
        container_texto_circular:{
          width:"75%",
          height:"100%",
          flexDirection: 'row', // Centra horizontalmente y verticalmente
          alignItems:"center",
        },
        texto_circular_open:{
          width: 15,
          height: 15,
          borderRadius: '100%',
          backgroundColor: color_component, // Puedes usar el color celeste aquí
          marginRight: 2,
        },
        texto_circular_close:{
          width: 15,
          height: 15,
          borderRadius: '100%',
          backgroundColor: color_component_close, // Puedes usar el color plomo aquí
          marginRight: 2,
        },
        texto_linear_open:{
          borderWidth:0,
          padding:0,
          marginLeft:0,
          marginRight:0,
          borderColor:'none',
          width: 20,
          height: 5,
          backgroundColor: color_component, // Puedes usar el color celeste aquí
        },
        texto_linear_close:{
          borderWidth:0,
          padding:0,
          marginLeft:0,
          marginRight:0,
          borderColor:'none',
          width: 20,
          height: 5,
          backgroundColor: color_component_close, // Puedes usar el color plomo aquí
        },
        container_texto_texto_low:{
          marginLeft:5,
          width:"25%",
          justifyContent: 'center',
        },
      },
      center: {
        backgroundColor:color_component,
        width: '3',
        top: '50',
        left:"50%",
        position:"absolute",
        zIndex:9999,
        height:"100000"
      },
    },
  });

  var blob = '';
  if(archivoJSON.foto){
    blob = base64ToBlob (archivoJSON.foto);
  }
  
  function base64ToBlob (base64Image){
    // Decodifica la cadena base64
    const byteCharacters = atob(base64Image.split(',')[1]);

    // Crea un array de bytes
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
    // Crea un Blob a partir del array de bytes
    const blob = new Blob([byteArray], { type: 'image/png' });
    return blob;
  }

  return (
    <PDFViewer width="100%" height="100%">
      <Document>
        <Page size={[595.28, Infinity]} style={styles.page}>
          <View style={styles.encabezado.fondo}>
            <Text style={styles.encabezado.title_text} >{archivoJSON.titulo ? archivoJSON.titulo : 'CURRICULUM'}</Text>
            <Text style={styles.encabezado.description} >{archivoJSON.search ? archivoJSON.search : 'SEARCH_1 - SEARCH_2 - SEARCH_3'}</Text>
          </View>
            {(archivoJSON.foto) && (
            <View style={styles.image_profile.container}>
              <Image src={blob?URL.createObjectURL(blob):''} style={styles.image_profile.image} />
            </View>
            )}
          <View style={styles.sub_encabezado.main}>
            <View style={styles.sub_encabezado.left.fondo}>
              <Image src="https://cdn-icons-png.flaticon.com/512/0/191.png" style={styles.sub_encabezado.image} />
              <Text style={styles.sub_encabezado.left.texto}>{archivoJSON.contacto ? archivoJSON.contacto.numero: 'Número_contacto'}</Text>
            </View>
            <View style={styles.sub_encabezado.right.fondo}>
              <Image src="https://cdn-icons-png.flaticon.com/512/542/542638.png" style={styles.sub_encabezado.image} />
              <Text style={styles.sub_encabezado.right.texto}>{archivoJSON.contacto ? archivoJSON.contacto.correo: 'Correo_electrónico'}</Text>
            </View>
          </View>
          {/*APARTADO BASE*/}
          <View style={styles.contenido_base.main}>
            <View style={styles.contenido_base.fondo}>
              {/*DATOS PERSONALES*/}
              {(archivoJSON.edad && archivoJSON.contacto ? (archivoJSON.contacto.direccion && archivoJSON.contacto.linkedin && archivoJSON.contacto.github && archivoJSON.contacto.website):'') && (
              <View style={styles.contenido_base.container}>
                <Text style={styles.contenido_base.title}>{archivoJSON.contacto.titulo}</Text>
                <Text style={styles.contenido_base.texto}>Edad: {archivoJSON.edad}</Text>
                <Text style={styles.contenido_base.texto}>Dirección: {archivoJSON.contacto.direccion}</Text>
                <Text style={styles.contenido_base.texto}>Linkedin: {archivoJSON.contacto.linkedin}</Text>
                <Text style={styles.contenido_base.texto}>GitHub: {archivoJSON.contacto.github}</Text>
                <Text style={styles.contenido_base.texto}>Sitio web: {archivoJSON.contacto.website}</Text>
              </View>
              )}
              
            </View>
            <View style={styles.contenido_base.fondo}>
              {/*ACERCA DE MI*/}
              {(archivoJSON.informacion ? archivoJSON.informacion.descripcion:'') && (
                <View style={styles.contenido_base.container}>
                  <Text style={styles.contenido_base.title}>{archivoJSON.informacion.titulo}</Text>
                  <Text style={styles.contenido_base.texto}>{archivoJSON.informacion.descripcion}</Text>
                </View>
              )}
            </View>
          </View>
          {/*EXPERIENCIA LABORAL*/}
          {(archivoJSON.experiencias ? (archivoJSON.experiencias.experiencia && archivoJSON.experiencias.experiencia.length>0):'') &&(
            <View style={styles.contenido_base.container}>
              <Text style={styles.contenido_base.title}>{archivoJSON.experiencias.titulo}</Text>
              {archivoJSON.experiencias.experiencia
                .sort((a, b) => {
                  // Función para obtener un valor comparable para la fecha final
                  const obtenerValorFecha = (fecha) => {
                    const year = fecha.year || "9999"; // Usamos "9999" como valor ficticio para fechas no especificadas
                    const mes = fecha.mes || "12"; // Usamos "12" como valor ficticio para meses no especificados
                    return parseInt(`${year}${mes}`, 10);
                  };

                  // Comparamos las fechas finales para ordenar de forma descendente
                  const fechaFinalA = obtenerValorFecha(a.final);
                  const fechaFinalB = obtenerValorFecha(b.final);
                  return fechaFinalB - fechaFinalA;
                })
                .map((experiencia, index) => (
                  <View key={index} style={styles.contenido_base.container_texto.main}>
                    <View style={styles.contenido_base.container_texto.container_texto_timeline}>
                      <View style={styles.contenido_base.container_texto.cuadrado_celeste}></View>
                      <Text style={styles.contenido_base.container_texto.texto_timeline}>
                        {`${experiencia.final.year || 'Actualidad'} -\n${experiencia.final.mes || 'Presente'}`}
                      </Text>
                      <View style={styles.contenido_base.container_texto.linea}></View>
                      <Text style={styles.contenido_base.container_texto.texto_timeline}>
                        {`${experiencia.inicio.year} -\n${experiencia.inicio.mes}`}
                      </Text>
                    </View>
                    <View style={styles.contenido_base.container_texto.container_texto_texto}>
                      <Text style={styles.contenido_base.container_texto.titulo_primary}>
                        {`${experiencia.nombre_empresa}`}
                      </Text>
                      <Text style={styles.contenido_base.container_texto.titulo_secondary}>
                        {`${experiencia.puesto}`}
                      </Text>
                      <Text style={styles.contenido_base.container_texto.texto}>
                        {`${experiencia.descripcion}`}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          )}
          {/*PROYECTOS PROPIOS*/}
          {(archivoJSON.proyectos ? (archivoJSON.proyectos.proyecto && archivoJSON.proyectos.proyecto.length>0):'') &&(
            <View style={styles.contenido_base.container}>
              <Text style={styles.contenido_base.title}>{archivoJSON.proyectos.titulo}</Text>
              {archivoJSON.proyectos.proyecto
                .map((proyecto, index) => (
                  <View key={index} style={styles.contenido_base.sub_fondo_low}>
                    <Text style={styles.contenido_base.container_texto.titulo_primary}>{proyecto.nombre}</Text>
                    <Text style={styles.contenido_base.container_texto.texto}>{proyecto.descripcion}</Text>
                    <Text style={styles.contenido_base.container_texto.texto}>Lenguajes empleados: {proyecto.lenguajes}</Text>
                    <Text style={styles.contenido_base.container_texto.texto}>Visitar proyecto: {proyecto.enlace}</Text>
                  </View>
                ))}
            </View>
          )}
          {/*FORMACION PROFESIONONAL*/}
          <View style={styles.contenido_base.container}>
            <Text style={styles.contenido_base.title}>{archivoJSON.formaciones ? archivoJSON.formaciones.titulo:''}</Text>
            <View style={styles.contenido_base.main}>
              <View style={styles.contenido_base.fondo}>
                {(archivoJSON.formaciones ? (archivoJSON.formaciones.formacion.profesiones.profesion && archivoJSON.formaciones.formacion.profesiones.profesion.length > 0) : '') && (
                <View style={styles.contenido_base.sub_fondo}>
                  <Text style={styles.contenido_base.subtitle}>{archivoJSON.formaciones.formacion.profesiones.titulo}</Text>
                  {archivoJSON.formaciones.formacion.profesiones.profesion
                    .sort((a, b) => {
                      // Ordenar primero por año de forma descendente
                      if (a.year !== b.year) {
                        return b.year - a.year;
                      }

                      // Si los años son iguales, ordenar por mes de forma descendente
                      return b.mes - a.mes;
                    })
                    .map((profesion, index) => (
                      <View key={index} style={styles.contenido_base.container_texto.main}>
                        <View style={styles.contenido_base.container_texto.container_texto_timeline}>
                          <View style={styles.contenido_base.container_texto.cuadrado_celeste}></View>
                          <Text style={styles.contenido_base.container_texto.texto_timeline}>{`${profesion.year} -\n${profesion.mes}`}</Text>
                        </View>
                        <View style={styles.contenido_base.container_texto.container_texto_texto}>
                          <Text style={styles.contenido_base.container_texto.texto}>{`${profesion.grado}`}</Text>
                          <Text style={styles.contenido_base.container_texto.texto}>{`${profesion.especialidad}`}</Text>
                          <Text style={styles.contenido_base.container_texto.texto}>{`${profesion.universidad}`}</Text>
                        </View>
                      </View>

                      ))}
                  </View>
                )}
                {/*IDIOMAS*/}
                {(archivoJSON.idiomas ? (archivoJSON.idiomas.idioma && archivoJSON.idiomas.idioma.length>0):'') &&(
                  <View style={styles.contenido_base.container}>
                    <Text style={styles.contenido_base.title}>{archivoJSON.idiomas.titulo}</Text>
                      <View style={styles.contenido_base.sub_fondo}>
                        {archivoJSON.idiomas.idioma
                          .map((idioma, index) => (
                            <View key={index} style={styles.contenido_base.container_texto.main}>
                              <View style={styles.contenido_base.container_texto.container_texto_texto_low}>
                                <Text style={styles.contenido_base.container_texto.texto}>{`${idioma.nombre}`}</Text>
                                <Text style={styles.contenido_base.container_texto.texto}>{`${idioma.grado}`}</Text>
                              </View>
                              <View style={styles.contenido_base.container_texto.container_texto_circular}>
                                {Array.from({ length: idioma.nivel }, (_, i) => (
                                  <View key={i} style={styles.contenido_base.container_texto.texto_linear_open}></View>
                                ))}
                                {Array.from({ length: 10 - idioma.nivel }, (_, i) => (
                                  <View key={i} style={styles.contenido_base.container_texto.texto_linear_close}></View>
                                ))}
                              </View>
                            </View>
                          ))}
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.contenido_base.fondo}>
                {(archivoJSON.formaciones ? (archivoJSON.formaciones.formacion.certificados.certificado && archivoJSON.formaciones.formacion.certificados.certificado.length > 0):'') && (
                  <View style={styles.contenido_base.sub_fondo}>
                    <Text style={styles.contenido_base.subtitle}>{archivoJSON.formaciones.formacion.certificados.titulo}</Text>
                    {archivoJSON.formaciones.formacion.certificados.certificado
                      .sort((a, b) => {
                        // Ordenar primero por año de forma descendente
                        if (a.year !== b.year) {
                          return b.year - a.year;
                        }

                        // Si los años son iguales, ordenar por mes de forma descendente
                        return b.mes - a.mes;
                      })
                      .map((certificado, index) => (
                        <View key={index} style={styles.contenido_base.container_texto.main}>
                          <View style={styles.contenido_base.container_texto.container_texto_timeline}>
                            <View style={styles.contenido_base.container_texto.cuadrado_celeste}></View>
                            <Text style={styles.contenido_base.container_texto.texto_timeline}>{`${certificado.year} -\n${certificado.mes}`}</Text>
                          </View>
                          <View style={styles.contenido_base.container_texto.container_texto_texto}>
                            <Text style={styles.contenido_base.container_texto.texto}>{`${certificado.nombre}`}</Text>
                          </View>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={styles.contenido_base.main}>
            <View style={styles.contenido_base.fondo}>
              {/*CONOCIMIENTO EN DESARROLLO*/}
              {(archivoJSON.conocimientos ? (archivoJSON.conocimientos.conocimiento && archivoJSON.conocimientos.conocimiento.length>0):'') &&(
                <View style={styles.contenido_base.container}>
                  <Text style={styles.contenido_base.title}>{archivoJSON.conocimientos.titulo}</Text>
                  <View style={styles.contenido_base.sub_fondo}>
                    {archivoJSON.conocimientos.conocimiento
                      .map((conocimiento, index) => (
                        <View key={index} style={styles.contenido_base.container_texto.main}>
                          <View style={styles.contenido_base.container_texto.container_texto_texto_low}>
                            <Text style={styles.contenido_base.container_texto.texto}>{`${conocimiento.nombre}`}</Text>
                          </View>
                          <View style={styles.contenido_base.container_texto.container_texto_circular}>
                            {Array.from({ length: conocimiento.nivel }, (_, i) => (
                              <View key={i} style={styles.contenido_base.container_texto.texto_circular_open}></View>
                            ))}
                            {Array.from({ length: 10 - conocimiento.nivel }, (_, i) => (
                              <View key={i} style={styles.contenido_base.container_texto.texto_circular_close}></View>
                            ))}
                          </View>
                        </View>
                      ))}
                  </View>
                </View>
              )}
            </View>
            <View style={styles.contenido_base.fondo}>
              {/*HABILIDADES*/}
              {(archivoJSON.skills ? (archivoJSON.skills.skill.destacan.destacado.length > 0 || archivoJSON.skills.skill.no_destacan.destacado.length > 0):'') && (
                <View style={styles.contenido_base.container}>
                  <Text style={styles.contenido_base.title}>{archivoJSON.skills.titulo}</Text>
                  {archivoJSON.skills.skill.destacan.destacado && archivoJSON.skills.skill.destacan.destacado.length > 0 && (
                    <View style={styles.contenido_base.sub_fondo}>
                      <Text style={styles.contenido_base.subtitle}>{archivoJSON.skills.skill.destacan.titulo}</Text>
                      {archivoJSON.skills.skill.destacan.destacado
                        .map((destacado, index) => (
                          <Text key={index} style={styles.contenido_base.container_texto.texto}>{`\u2022 ${destacado}`}</Text>
                        ))}
                    </View>
                  )}
                  {archivoJSON.skills.skill.no_destacan.destacado && archivoJSON.skills.skill.no_destacan.destacado.length > 0 && (
                    <View style={styles.contenido_base.sub_fondo}>
                      <Text style={styles.contenido_base.subtitle}>{archivoJSON.skills.skill.no_destacan.titulo}</Text>
                      {archivoJSON.skills.skill.no_destacan.destacado
                        .map((destacado, index) => (
                          <Text key={index} style={styles.contenido_base.container_texto.texto}>{`\u2022 ${destacado}`}</Text>
                        ))}
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
          <View style={styles.contenido_base.main}>
            <View style={styles.contenido_base.fondo}>
              {/*PARTICIPACION*/}
              {(archivoJSON.participaciones ? (archivoJSON.participaciones.participacion.charlas.charla.length > 0 || archivoJSON.participaciones.participacion.eventos.evento.length > 0):'') && (
                <View style={styles.contenido_base.container}>
                  <Text style={styles.contenido_base.title}>{archivoJSON.participaciones.titulo}</Text>
                  {archivoJSON.participaciones.participacion.eventos.evento && archivoJSON.participaciones.participacion.eventos.evento.length > 0 && (
                    <View style={styles.contenido_base.sub_fondo}>
                      <Text style={styles.contenido_base.subtitle}>{archivoJSON.participaciones.participacion.eventos.titulo}</Text>
                      {archivoJSON.participaciones.participacion.eventos.evento
                        .sort((a, b) => {
                          // Ordenar primero por año de forma descendente
                          if (a.year !== b.year) {
                            return b.year - a.year;
                          }

                          // Si los años son iguales, ordenar por mes de forma descendente
                          return b.mes - a.mes;
                        })
                        .map((participacion, index) => (
                          <View key={index} style={styles.contenido_base.container_texto.main}>
                            <View style={styles.contenido_base.container_texto.container_texto_timeline}>
                              <View style={styles.contenido_base.container_texto.cuadrado_celeste}></View>
                              <Text style={styles.contenido_base.container_texto.texto_timeline}>{`${participacion.year} -\n${participacion.mes}`}</Text>
                            </View>
                            <View style={styles.contenido_base.container_texto.container_texto_texto}>
                              <Text style={styles.contenido_base.container_texto.texto}>{`${participacion.nombre}`}</Text>
                            </View>
                          </View>

                        ))}
                    </View>
                  )}
                  {archivoJSON.participaciones.participacion.charlas.charla && archivoJSON.participaciones.participacion.charlas.charla.length > 0 && (
                    <View style={styles.contenido_base.sub_fondo}>
                      <Text style={styles.contenido_base.subtitle}>{archivoJSON.participaciones.participacion.charlas.titulo}</Text>
                      {archivoJSON.participaciones.participacion.charlas.charla
                        .sort((a, b) => {
                          // Ordenar primero por año de forma descendente
                          if (a.year !== b.year) {
                            return b.year - a.year;
                          }

                          // Si los años son iguales, ordenar por mes de forma descendente
                          return b.mes - a.mes;
                        })
                        .map((participacion, index) => (
                          <View key={index} style={styles.contenido_base.container_texto.main}>
                            <View style={styles.contenido_base.container_texto.container_texto_timeline}>
                              <View style={styles.contenido_base.container_texto.cuadrado_celeste}></View>
                              <Text style={styles.contenido_base.container_texto.texto_timeline}>{`${participacion.year} -\n${participacion.mes}`}</Text>
                            </View>
                            <View style={styles.contenido_base.container_texto.container_texto_texto}>
                              <Text style={styles.contenido_base.container_texto.texto}>{`${participacion.nombre}`}</Text>
                            </View>
                          </View>

                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>
            <View style={styles.contenido_base.fondo}>
              {/*REFERENCIAS*/}
              {(archivoJSON.referencias ? (archivoJSON.referencias.referencia && archivoJSON.referencias.referencia.length>0):'') &&(
                <View style={styles.contenido_base.container}>
                  <Text style={styles.contenido_base.title}>{archivoJSON.referencias.titulo}</Text>
                    <View style={styles.contenido_base.sub_fondo}>
                      {archivoJSON.referencias.referencia
                        .map((referencia, index) => (
                          <View key={index} style={styles.contenido_base.sub_fondo_low}>
                            <Text style={styles.contenido_base.container_texto.titulo_primary}>{`${referencia.cargo}`}</Text>
                            <Text style={styles.contenido_base.container_texto.texto}>{`${referencia.nombre}`}</Text>
                            <Text style={styles.contenido_base.container_texto.texto}>{`${referencia.numero}`}</Text>
                          </View>
                        ))}
                  </View>
                </View>
              )}
            </View>
          </View>
          
        </Page>
      </Document>
    </PDFViewer>
  );
}