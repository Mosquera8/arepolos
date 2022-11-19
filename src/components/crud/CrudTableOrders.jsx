import React from 'react'

const CrudTableOrders = ({ orders, setEditData, deleteOrder }) => {

  return <>
    <h3>Productos actuales</h3>
    <table className='table'>
      <thead>
        <tr>
          <td>id</td>
          <td>id costumer</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
      {
        orders.length === 0 ? <tr><td>No hay datos</td></tr>
        : orders.map((orders, index) => {
          return <tr key={index}>
                  <td>{orders.id}</td>
                  <td>{orders.idCostumer}</td>     
                  <td>
                    <button className='btn btn-outline-warning mx-1'
                    onClick={() => setEditData(orders)}>Editar</button>
                    <button className='btn btn-outline-danger mx-1'
                    onClick={() => deleteOrder(orders.id)}>Eliminar</button>
                  </td>
                </tr>
        })
      }
      </tbody>
    </table>
  </>
}

export default CrudTableOrders