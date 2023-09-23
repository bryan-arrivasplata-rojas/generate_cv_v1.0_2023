import React from 'react';
import { CvStyleOne } from '../components/cv/cvStyleOne';
import { CvStyleTwo } from '../components/cv/cvStyleTwo';
//import { CvStyleTwo } from '../cv/cvStyleTwo';
export const CurriculumPDF = (props) => {
    const {curriculum} = props;
    const archivoJSON = JSON.parse(JSON.stringify(curriculum));
    
    var MyPDFDocument;
    if(archivoJSON.tipo_selected==='tipo_1'){
        MyPDFDocument = <CvStyleOne archivoJSON={archivoJSON}/>
    }else if(archivoJSON.tipo_selected==='tipo_2'){
        MyPDFDocument = <CvStyleTwo archivoJSON={archivoJSON}/>
    }else{
        MyPDFDocument=<div>Error</div>
    }
    
    return (
        <div className="cvStyleOne" style={{ height: '100vh' }}>
            {MyPDFDocument}
        </div>
    );
}