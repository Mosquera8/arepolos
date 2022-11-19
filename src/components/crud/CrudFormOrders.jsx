import React, { useState } from 'react'
import { useEffect } from 'react'

const CrudFormOrders = ({ addOrder, editOrder, editData }) => {
  
  const [formData, setFormData] = useState({
    idCostumer: null,
    id: null
  })

  useEffect(() => {
    if (editData !== null){
      setFormData(editData)
    } else {
      setFormData({
        idCostumer:null,
        id: null
      })
    }
  }, [editData])

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar que se recarge la página
    
    if (formData.idCostumer !== null) {
      if (editData !== null) {
        editOrder(formData)
      } else { 
        
        addOrder(formData)
        setFormData({
          idCostumer:null,
          id: null
        })
      }
    } else {
      alert("Por favor agrega id costumer.")
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.idCostumer]: e.target.value
    })
  }

  return <>
    <form className='m-3' onSubmit={handleSubmit}>
      
      <label htmlFor="idCostumer">id costumer:</label>
      <input type="number" name="idCostumer" onChange={handleChange} value={formData.idCostumer}/>
      <input className='btn btn-success mx-1' type="submit" value="Enviar" />
      <input className='btn btn-danger mx-1' type="reset" value="Cancelar" />
    </form>
  </>
}

export default CrudFormOrders