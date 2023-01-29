import React from 'react'
import { Link } from 'react-router-dom'
import styles from "../../css/AboutUs.module.css"
import github from "../images/github.png"
import nelson from "../images/nelson.jpg"
import mateo from "../images/mateo.jfif"
import sergio from "../images/sergio.jfif"
import donCulon from "../images/donculon.jfif"
import diego from "../images/diego.jfif"
import mariano from "../images/mariano.jfif"
import kennet from "../images/kennet.jfif"
import ronaldo from "../images/ronaldo.png"
import linkedin from "../images/linkedin.png"

export default function AboutUs() {
  return (
    <div className={styles.contenedor} >
      <div className={styles.contenedorTitulo}>
        <h1 className={styles.titulo}>Nuestro Equipo</h1>
      </div>
      <div className={styles.ContenedorCartas}>
        <div className={styles.cartas}>
          <div>
            <img className={styles.imagen} src={mateo}></img>
            <p>Mateo  Urquijo</p>
            <div className={styles.links}>
              <a href="https://github.com/ImOrion" target="_blank"><img className={styles.logo} src={github} /></a>
              <a href="https://github.com/ImOrion" target="_blank"><img className={styles.logo} src={linkedin} /></a>
            </div>
          </div>
          <div>
            <img className={styles.imagen} src={sergio} ></img>
            <p>Sergio Blanco</p>
            <div  className={styles.links}>
              <a href="https://github.com/Serblaor" target="_blank"><img className={styles.logo} src={github} /></a>
              <a href="https://github.com/ImOrion" target="_blank"><img className={styles.logo} src={linkedin} /></a>
            </div>
          </div>
          <div>
            <img className={styles.imagen} src={donCulon} ></img>
            <p>Luis Llancamil</p>
            <div className={styles.links}>
              <a href="https://github.com/Desarrollador-LELLA" target="_blank"><img className={styles.logo} src={github} /></a>
              <a href="https://github.com/ImOrion" target="_blank"><img className={styles.logo} src={linkedin} /></a>
            </div>
          </div>
          <div>
            <img className={styles.imagen} src={diego}></img>
            <p>Diego Amundaray</p>
            <div className={styles.links}>
              <a href="https://github.com/Aegox" target="_blank"><img className={styles.logo} src={github} /></a>
              <a href="https://github.com/ImOrion" target="_blank"><img className={styles.logo} src={linkedin} /></a>
            </div>
          </div>
          <div>
            <img className={styles.imagen} src={mariano}></img>
            <p>Mariano Teran</p>
            <div className={styles.links}>
              <a href="https://github.com/dogoarg" target="_blank"><img className={styles.logo} src={github} /></a>
              <a href="https://github.com/ImOrion" target="_blank"><img className={styles.logo} src={linkedin} /></a>
            </div>
          </div>
          <div>
            <img className={styles.imagen} src={kennet}></img>
            <p>Kenneth Urbina</p>
            <div className={styles.links}>
              <a href="https://github.com/KennethUC10" target="_blank"><img className={styles.logo} src={github} /></a>
              <a href="https://github.com/ImOrion" target="_blank"><img className={styles.logo} src={linkedin} /></a>
            </div>
          </div>
          <div>
            <img className={styles.imagen} src={ronaldo}></img>
            <p>Ronaldo Delgado</p>
            <div className={styles.links}>
              <a href="https://github.com/RonaldoMonki" target="_blank"><img className={styles.logo} src={github} /></a>
              <a href="https://github.com/ImOrion" target="_blank"><img className={styles.logo} src={linkedin} /></a>
            </div>
          </div>
          <div className={styles.carta}>
            <img className={styles.imagen} src={nelson}></img>
            <p >Nelson vargas </p>
            <div className={styles.links}>
            <a href="https://github.com/Nelsonvargas15" target="_blank"><img className={styles.logo} src={github} /></a>
            <a href="https://github.com/ImOrion" target="_blank"><img className={styles.logo} src={linkedin} /></a>
          </div>
        </div>
      </div>


    </div>

      {/* <Link to="/" className="btn btn-primary ">atras</Link>
      <h1 className={styles.titulo}>sobre nosotros </h1>
      <p>info sobre la pagina </p>

      <footer className={styles.footer} >
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase">Footer Content</h5>
              <p>Here you can use rows and columns to organize your footer content.</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">GitHub</h5>
              <ul className="list-unstyled">
                <li className=' my-3'><a href="https://github.com/ImOrion" target="_blank"><img src={github} width="30" height="30"/>Mateo Urquijo</a></li>
                <li className=' my-3' ><a href="https://github.com/Desarrollador-LELLA" target="_blank"><img src={github} width="30" height="30"/>Luis Llancamil</a></li>
                <li className=' my-3'><a href="https://github.com/RonaldoMonki" target="_blank"><img src={github} width="30" height="30"/>Ronaldo Delgado</a></li>
                <li className=' my-3'><a href="https://github.com/dogoarg" target="_blank"><img src={github} width="30" height="30"/>Mariano Teran</a></li>
              </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase"></h5>
              <ul className="list-unstyled "  >
                <li className=' my-3'><a href="https://github.com/Serblaor" target="_blank"><img src={github} width="30" height="30"/>Sergio Blanco</a></li>
                <li className=' my-3'><a href="https://github.com/Aegox" target="_blank"><img src={github} width="30" height="30"/>Diego Amundaray</a></li>
                <li className=' my-3'><a href="https://github.com/KennethUC10"target="_blank"><img src={github} width="30" height="30"/>Kenneth Urbina</a></li>
                <li className=' my-3'><a href="https://github.com/Nelsonvargas15" target="_blank"><img src={github} width="30" height="30"/> Nelson vargas </a></li>
              </ul>
            </div>
          </div>
        </div>
hola amigo mio 
 

      </footer> */}
    </div >
  )
}
