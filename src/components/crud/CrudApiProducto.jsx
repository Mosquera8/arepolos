import React, { useState, useEffect } from 'react'
import CrudFormProduct from './CrudFormProduct'
import CrudTableProduct from './CrudTableProduct'
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
  const addProduct = (product) => {
    setLoading(true)
    const options = {
      body: product
    }

    API.post("products", options).then(response => {
      if (!response.error) {
        setProducts([...products, product])
        setErrorMessage(null)
      } else {
        setProducts(null)
        setErrorMessage(response.statusText)
      }

      setLoading(false)
    })
  }

  // editar un producto
  const editProduct = (product) => {
    setLoading(true)
    const options = {
      body: product
    }

    API.put("products", options, product.id).then(response => {
      if (!response.error) {
        const newProducts = products.map(el => el.id === product.id ? product : el)
        setProducts(newProducts)
        setEditData(null)
        setErrorMessage(null)
      } else {
        setProducts(null)
        setErrorMessage(response.statusText)
      }

      setLoading(false)
    })
  }

  // Eliminar un product
  const deleteProduct = id => {
    setLoading(true)
    const isDelete = window.confirm(`¿Deseas eliminar el registro con id: ${id}?`)

    if (isDelete) {
      API.del("products", id).then( response => {
        if (!response.error) {
          const newProducts = products.filter(el => el.id !== id)
          setProducts(newProducts)
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
    <CrudFormProduct addProduct={addProduct} editProduct={editProduct} editData={editData}/>
    { 
      loading
      ? <Loader />
      : products && <CrudTableProduct products={products} setEditData={setEditData} deleteProduct={deleteProduct}/> 
    }
    { errorMessage && <Message text={errorMessage}/> }
  </>
}

export default CrudApiProducto