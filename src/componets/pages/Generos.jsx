import React from 'react';
import { Link } from 'react-router-dom'
// import "../../css/Generos.css"
function handleSort(e) {
  e.preventDefault();
};

function handleClick(e) {
  e.preventDefault();

};

function handleInputChange(e) {
  e.preventDefault();
};

function handleSubmit(e) {
  e.preventDefault();
};



const Generos = () => {
  return (
    <>
          <div className='container-fluid'>
        <h1 className="lista-generos">LISTA DE GENEROS</h1>
        <div>
  <input
    type='text'
    placeholder="Buscar..."
    onChange={(e) => handleInputChange(e)}
  />
  <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
</div>
<div>

  <select onChange={e => handleSort(e)}>

    <option value='art'>Artistas</option>
    <option value='su'>Sudamerica</option>
    <option value='int'>Internacionales</option>
    <option value='eu'>Europeos</option>
  </select>
</div>


        <div className='row row-cols-6'>
          <div className='col'>
            <div className='card' onClick={e => { handleClick(e) }}>
              <div className='card-body'>
                <h5 className='card-title'>Reggaeton</h5>
                
              </div>
              
            </div>
            
          </div>
          
          <div className='col'>
            <div className='card' onClick={e => { handleClick(e) }}>
              <div className='card-body'>
                <h5 className='card-title'>Música clásica</h5>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card' onClick={e => { handleClick(e) }}>
              <div className='card-body'>
                <h5 className='card-title'>Jazz</h5>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card' onClick={e => { handleClick(e) }}>
              <div className='card-body'>
                <h5 className='card-title'>Blues</h5>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card' onClick={e => { handleClick(e) }}>
              <div className='card-body'>
                <h5 className='card-title'>Góspel</h5>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card' onClick={e => { handleClick(e) }}>
              <div className='card-body'>
                <h5 className='card-title'>Pop</h5>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card' onClick={e => { handleClick(e) }}>
              <div className='card-body'>
                <h5 className='card-title'>Rock and Roll</h5>
              </div>
            </div>
          </div>
          
          <div className='col'>
            <div className='card' onClick={e => { handleClick(e) }}>
              <div className='card-body'>
                <h5 className='card-title'>Hip hop/Rap</h5>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card' onClick={e => { handleClick(e) }}>
              <div className='card-body'>
                <h5 className='card-title'>Salsa</h5>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card' onClick={e => { handleClick(e) }}>
              <div className='card-body'>
                <h5 className='card-title'>Reggae</h5>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="lista-generos">







<Link to='/create' className="btn btn-primary float-md-none">crear Genero</Link>

</div>


    </>


  );
};

export default Generos;