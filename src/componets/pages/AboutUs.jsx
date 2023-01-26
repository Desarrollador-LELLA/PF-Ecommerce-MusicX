import React from 'react'
import { Link } from 'react-router-dom'
import styles from "../../css/AboutUs.module.css"


export default function AboutUs() {
  const style = {
    background : "#3456"
  }
  return (
    <div className='text-center my-3' >
      <Link to="/" className="btn btn-primary">Back</Link>
      <h1 className={styles.titulo}>sobre nosotros </h1>
      <p>info sobre la pagina </p>

      <footer className="page-footer font-small blue pt-4 back" style={style}  >
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase">Footer Content</h5>
              <p>Here you can use rows and columns to organize your footer content.</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled">
                <li><a href="#!">Link 1</a></li>
                <li><a href="#!">Link 2</a></li>
                <li><a href="#!">Link 3</a></li>
                <li><a href="#!">Link 4</a></li>
              </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled">
                <li><a href="#!">Link 1</a></li>
                <li><a href="#!">Link 2</a></li>
                <li><a href="#!">Link 3</a></li>
                <li><a href="#!">Link 4</a></li>
              </ul>
            </div>
          </div>
        </div>



      </footer>
    </div>
  )
}
