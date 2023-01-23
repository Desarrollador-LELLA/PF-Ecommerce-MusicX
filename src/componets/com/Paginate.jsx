import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../redux/actions/productoAction"
import {productsReducer} from "../../redux/reducer/productsReducer"


export default function Paginate() {
// const teste = async () => {
//   const teste2 = await getTeste();

//   dispatch = useDispatch()
//   const productos  = useSelector(state => state.products)
  
let page = [];

useEffect(()=>{
    },[])
  
return(
  <div >
    {/* {currentPage !== 1 ? (
      <>
        <button
          onClick={() => dispatch(actions.ChangePage(currentPage - 1))}
        >
          {"<"}
        </button>
        <button
          onClick={() => dispatch(actions.ChangePage(currentPage - 1))}
        >
          {currentPage - 1}
        </button>
      </>
    ) : (
      <>
        <button disable>{"<"}</button>
        
      </>
    )}

    <button className="active">{currentPage}</button>

    {currentPage !== pages[pages.length - 1] ? (
      <>
        <button
          onClick={() => dispatch(actions.ChangePage(currentPage + 1))}
        >
          {currentPage + 1}
        </button>
        <button
          onClick={() => dispatch(actions.ChangePage(currentPage + 1))}
        >
          {">"}
        </button>
      </>
    ) : (
      <>
        
        <button disabled>{">"}</button>
      </> */}
    {/* )} */}
  </div>
);
    }