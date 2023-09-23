import React from 'react';
export const Accordion = (props) => {
    const { text_accordion, id_accordion,component } = props;
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${id_accordion}`} aria-expanded="false" aria-controls={`#${id_accordion}`}>
                    {text_accordion}
                </button>
            </h2>
            <div id={`${id_accordion}`} className="accordion-collapse collapse">
                <div className="accordion-body">
                    {component}
                </div>
            </div>
        </div>
    )
}