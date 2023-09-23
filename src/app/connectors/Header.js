import React from 'react';

export const HeaderConnectors = ({ onFileUpload }) => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];

      if (file) {
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop();
        if (fileExtension.toLowerCase() === 'json') {
          onFileUpload(file);
        } else {
          alert('El archivo debe estar en formato JSON.');
        }
      }
    };
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="https://www.bryanarrivasplata.com">Bryan Arrivasplata</a>
          <button className="navbar-toggler" id="navbarToggle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <button
              type='button'
              className='me-2 btn btn-outline-danger btnWidth'
              id="descargarJSON">Descargar CV en formato Json</button>
            <input type="file" accept=".json" style={{ display: 'none' }} id="fileInput" onChange={handleFileChange} />
            <label
              htmlFor="fileInput"
              id=""
              className='me-2 btn btn-outline-primary btnWidth'>Cargar Curriculum en formato json</label>
          </div>
        </div>
      </nav>
    )
}