import React from 'react'
import { useForm } from '../../hooks/useForm'

const formData= {
    name: '',
    description: '',
    price: 0.0,
    img: '',
    id: null
  }

const CrudForm = ({ addProduct, editProduct, editData }) => {

const {name, description,price,img,id,onInputChange,onResetForm} =useForm (formData)

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar que se recarge la página
    
    if (name !== '' && description !== '' && price !== null && img !== '') {
      if (editData !== null) {
        editProduct({name,description,price,img})
      } else { 
        id = Date.now()
        addProduct({id,name,description,price,img})
        onResetForm()
      }
    } else {
      alert("Por favor agregar datos de producto.")
    }
  }
 

  return <>
    <form className='m-3' onSubmit={handleSubmit}>
      <label htmlFor="name">Producto:</label>
      <input type="text" name="name" onChange={onInputChange} value={name}/>
      <label htmlFor="name">Descripcion:</label>
      <input type="text" name="description" onChange={onInputChange} value={description}/>
      <label htmlFor="price">Precio:</label>
      <input type="number" name="price" onChange={onInputChange} value={price}/>
      <label htmlFor="name">IMG:</label>
      <input type="text" name="img" onChange={onInputChange} value={img}/>
      <input className='btn btn-success mx-1' type="submit" value="Enviar" />
      <input className='btn btn-danger mx-1' type="reset" value="Cancelar" />
    </form>
  </>
}

export default CrudForm