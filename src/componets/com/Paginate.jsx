import React from 'react'
import { useEffect } from 'react';
import { getTeste } from '../../redux/actions/productoAction'

export default function Paginate() {
const teste = async () => {
  const teste2 = await getTeste();
  
  console.log(teste2.todo[0].data())
  console.log(teste2.siguente[0].data())
  console.log(teste2.anterior[0].data())

}
useEffect(()=>{
    teste()
},[])
  
return (
    <div>
      
    </div>
  )
}
 // hola 