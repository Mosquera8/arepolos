import React, { useState, useEffect } from 'react'
import CrudForm from './CrudForm'
import CrudTable from './CrudTable'
import Loader from './Loader'
import Message from './Message'
import { helpFetch } from '../../helpers/helpFetch'

const CrudApiProducto = () => {

  const API = helpFetch()
  const [editData, setEditData] = useState(null)
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    setLoading(true)
    API.get("products").then((response) => {
      if (!response.error) {
        setProducts(response)
        setErrorMessage(null)
      } else {
        setProducts(null)
        setErrorMessage(response.statusText)
      }

      setLoading(false)
    })    
  }, [])

  // inserción de datos
  const addProduct = (equipo) => {
    setLoading(true)
    const options = {
      body: equipo
    }

    API.post("products", options).then(response => {
      if (!response.error) {
        setProducts([...products, equipo])
        setErrorMessage(null)
      } else {
        setProducts(null)
        setErrorMessage(response.statusText)
      }

      setLoading(false)
    })
  }

  // editar un producto
  const editProduct = (equipo) => {
    setLoading(true)
    const options = {
      body: equipo
    }

    API.put("products", options, equipo.id).then(response => {
      if (!response.error) {
        const newEquipos = products.map(el => el.id === equipo.id ? equipo : el)
        setProducts(newEquipos)
        setEditData(null)
        setErrorMessage(null)
      } else {
        setProducts(null)
        setErrorMessage(response.statusText)
      }

      setLoading(false)
    })
  }

  // Eliminar un Equipo
  const deleteProduct = id => {
    setLoading(true)
    const isDelete = window.confirm(`¿Deseas eliminar el registro con id: ${id}?`)

    if (isDelete) {
      API.del("products", id).then( response => {
        if (!response.error) {
          const newEquipos = products.filter(el => el.id !== id)
          setProducts(newEquipos)
          setErrorMessage(null)
        } else {
          setProducts(null)
          setErrorMessage(response.statusText)
        }
  
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }

  return <>
    <h2>CRUD API de Productos</h2>
    <CrudForm addProduct={addProduct} editProduct={editProduct} editData={editData}/>
    { 
      loading
      ? <Loader />
      : products && <CrudTable products={products} setEditData={setEditData} deleteProduct={deleteProduct}/> 
    }
    { errorMessage && <Message text={errorMessage}/> }
  </>
}

export default CrudApiProducto