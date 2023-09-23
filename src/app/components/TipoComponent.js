import React, { useEffect,useState } from 'react';

export const TipoComponet = (props) => {
    const {curriculumData,Tipo} = props;
    const [selectedOption, setSelectedOption] = useState('tipo_1'); // Estado para el radio button seleccionado
    
    useEffect(() => {
        Tipo({
            tipo_selected: 'tipo_1'
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (curriculumData && curriculumData.tipo_selected) {
            setSelectedOption(curriculumData.tipo_selected);
            Tipo({
                tipo_selected:curriculumData.tipo_selected
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value); // Actualiza el estado cuando se selecciona un radio button
        Tipo({
            tipo_selected:e.target.value
        });
    };
    return (
        <div className='col col-12 col-lg-6 col-md-6 col-sm-12 mb-3 tipoComponent'>
            <h5>Seleccionar el tipo de CV</h5>
            <div className='row'>
                <div className='col col-12 col-lg-12 col-md-12 col-sm-12'>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input className="form-check-input me-1" type="radio" name="listGroupRadioTipo" value="tipo_1" id="tipo_1" required checked={selectedOption === 'tipo_1'} onChange={handleOptionChange}></input>
                        <label className="form-check-label" htmlFor="firstRadio1">Creativo</label>
                    </li>
                    <li className="list-group-item">
                        <input className="form-check-input me-1" type="radio" name="listGroupRadioTipo" value="tipo_2" id="tipo_2" required checked={selectedOption === 'tipo_2'} onChange={handleOptionChange}></input>
                        <label className="form-check-label" htmlFor="secondRadio1">Estandar</label>
                    </li>
                </ul>
                </div>
            </div>
        </div>
    )
}