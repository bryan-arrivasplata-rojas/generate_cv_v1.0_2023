import React,{useState,useEffect} from 'react';
import { CurriculumPDF } from './CurriculumPDF';
export const FooterConnectors = (props) => {
    const { curriculum  } = props;
    const [mostrarFlecha, setMostrarFlecha] = useState(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // Mostrar la flecha durante 3 segundos al cargar la página
        setTimeout(() => {
            setMostrarFlecha(false);
        }, 3000); // Ajusta el tiempo según tus necesidades
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="container-fluid">
            {mostrarFlecha && (
                <div className="flecha-container">
                    <div className="flecha">
                        <i className="bi bi-arrow-right"></i>
                    </div>
                    <div className="texto-flecha">
                        Generar CV en PDF
                    </div>
                </div>
            )}
            <button
                type='button'
                className='me-2 btn btn-success'
                id="btnGenerarCurriculum"
                title='Crear PDF'
                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                >
                    <h3><i className="bi bi-filetype-pdf"></i></h3>
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <CurriculumPDF curriculum={curriculum}/>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btnWidth" data-bs-dismiss="modal" style={{textAlignLast:'center'}}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}