import React, { useEffect,useState } from 'react';
//import { Http } from '../services/http';
//import Loading from './loading/loadingComponent';
//const image_me = process.env.REACT_APP_IMAGE_ME;

export const ColorComponet = (props) => {
    const {curriculumData,Color} = props;
    const [selectedColorLeft, setSelectedColorLeft] = useState('#3498db');
    const [selectedColorLeftText, setSelectedColorLeftText] = useState('#000000');
    const [selectedColorRight, setSelectedColorRight] = useState('#00aae4');
    const [selectedColorRightText, setSelectedColorRightText] = useState('#ffffff');
    const [selectedColorComponent, setSelectedColorComponent] = useState('#00aae4');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        Color({
            colors:{
                color_left: selectedColorLeft,
                color_left_text: selectedColorLeftText,
                color_right:selectedColorRight,
                color_right_text:selectedColorRightText,
                color_component:selectedColorComponent
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (curriculumData && curriculumData.colors) {
            setSelectedColorLeft(curriculumData.colors.color_left);
            setSelectedColorLeftText(curriculumData.colors.color_left_text);
            setSelectedColorRight(curriculumData.colors.color_right);
            setSelectedColorRightText(curriculumData.colors.color_right_text);
            setSelectedColorComponent(curriculumData.colors.color_component);
            Color({
                colors:{
                    color_left: curriculumData.colors.color_left,
                    color_left_text: curriculumData.colors.color_left_text,
                    color_right:curriculumData.colors.color_right,
                    color_right_text:curriculumData.colors.color_right_text,
                    color_component:curriculumData.colors.color_component
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curriculumData]);
    const handleColorChange = (e) => {
        const { name,value } = e.target;
        if(name==='color-right'){
            setSelectedColorRight(value);
        }else if(name==='color-right-text'){
            setSelectedColorRightText(value);
        }else if(name==='color-left'){
            setSelectedColorLeft(value);
        }else if(name==='color-left-text'){
            setSelectedColorLeftText(value);
        }else if(name==='color-component'){
            setSelectedColorComponent(value);
        }
        Color({
            colors:{
                color_left: name === 'color-left' ? value : selectedColorLeft,
                color_left_text: name === 'color-left-text' ? value : selectedColorLeftText,
                color_right:name === 'color-right' ? value : selectedColorRight,
                color_right_text:name === 'color-right-text' ? value : selectedColorRightText,
                color_component:name === 'color-component' ? value : selectedColorComponent,
            }
        });
    };
    
    return (
        <div className='col col-12 col-lg-6 col-md-6 col-sm-12 mb-3 colorComponent'>
            <h5>Seleccionar la combinacion de color</h5>
            <ul className="list-group">
                <li className="list-group-item">
                    <div className='row'>
                        <div className='col col-12 col-sm-12 col-md-6 col-lg-6'>
                            <div className='row'>
                                <div className='col col-9'>
                                    <h5>Left Color: </h5>
                                </div>
                                <div className='col col-3 colorButton'>
                                    <input
                                        type="color"
                                        className="form-control form-control-color"
                                        id="color-left"
                                        name='color-left'
                                        value={selectedColorLeft}
                                        title="Choose your color"
                                        onChange={handleColorChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col col-12 col-sm-12 col-md-6 col-lg-6'>
                            <div className='row'>
                                <div className='col col-9'>
                                    <h5>Text Left Color: </h5>
                                </div>
                                <div className='col col-3 colorButton'>
                                    <input
                                        type="color"
                                        className="form-control form-control-color"
                                        id="color-left-text"
                                        name='color-left-text'
                                        value={selectedColorLeftText}
                                        title="Choose your color"
                                        onChange={handleColorChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className='row'>
                        <div className='col col-12 col-sm-12 col-md-6 col-lg-6'>
                            <div className='row'>
                                <div className='col col-9'>
                                    <h5>Right Color: </h5>
                                </div>
                                <div className='col col-3 colorButton'>
                                    <input
                                        type="color"
                                        className="form-control form-control-color"
                                        id="color-right"
                                        name='color-right'
                                        value={selectedColorRight}
                                        title="Choose your color"
                                        onChange={handleColorChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col col-12 col-sm-12 col-md-6 col-lg-6'>
                            <div className='row'>
                                <div className='col col-9'>
                                    <h5>Text Right Color: </h5>
                                </div>
                                <div className='col col-3 colorButton'>
                                    <input
                                        type="color"
                                        className="form-control form-control-color"
                                        id="color-right-text"
                                        name='color-right-text'
                                        value={selectedColorRightText}
                                        title="Choose your color"
                                        onChange={handleColorChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className='row'>
                        <div className='col col-12 col-sm-12 col-md-12 col-lg-12'>
                            <div className='row'>
                                <div className='col col-9'>
                                    <h5>Componentes Line Circle Color: </h5>
                                </div>
                                <div className='col col-3 colorButton'>
                                    <input
                                        type="color"
                                        className="form-control form-control-color"
                                        id="color-component"
                                        name='color-component'
                                        value={selectedColorComponent}
                                        title="Choose your color"
                                        onChange={handleColorChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}