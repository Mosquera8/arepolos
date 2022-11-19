import React, { useState, useEffect } from 'react'
import CrudForm from './CrudForm'
import CrudTable from './CrudTable'
import Loader from './Loader'
import Message from './Message'
import { helpFetch } from '../../helpers/helpFetch'

const CrudApiOrders = () => {

  const API = helpFetch()
  const [editData, setEditData] = useState(null)
  const [orders, setOrders] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    setLoading(true)
    API.get("orders").then((response) => {
      if (!response.error) {
        setOrders(response)
        setErrorMessage(null)
      } else {
        setOrders(null)
        setErrorMessage(response.statusText)
      }

      setLoading(false)
    })    
  }, [])

  // inserción de datos
  const addOrder = (equipo) => {
    setLoading(true)
    const options = {
      body: equipo
    }

    API.post("orders", options).then(response => {
      if (!response.error) {
        setOrders([...orders, equipo])
        setErrorMessage(null)
      } else {
        setOrders(null)
        setErrorMessage(response.statusText)
      }

      setLoading(false)
    })
  }

  // editar un producto
  const editOrder = (equipo) => {
    setLoading(true)
    const options = {
      body: equipo
    }

    API.put("orders", options, equipo.id).then(response => {
      if (!response.error) {
        const newEquipos = orders.map(el => el.id === equipo.id ? equipo : el)
        setOrders(newEquipos)
        setEditData(null)
        setErrorMessage(null)
      } else {
        setOrders(null)
        setErrorMessage(response.statusText)
      }

      setLoading(false)
    })
  }

  // Eliminar un Equipo
  const deleteOrder = id => {
    setLoading(true)
    const isDelete = window.confirm(`¿Deseas eliminar el registro con id: ${id}?`)

    if (isDelete) {
      API.del("orders", id).then( response => {
        if (!response.error) {
          const newEquipos = orders.filter(el => el.id !== id)
          setOrders(newEquipos)
          setErrorMessage(null)
        } else {
          setOrders(null)
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
    <CrudForm addOrder={addOrder} editOrder={editOrder} editData={editData}/>
    { 
      loading
      ? <Loader />
      : orders && <CrudTable orders={orders} setEditData={setEditData} deleteOrder={deleteOrder}/> 
    }
    { errorMessage && <Message text={errorMessage}/> }
  </>
}

export default CrudApiOrders