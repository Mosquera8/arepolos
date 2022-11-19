import React from 'react'

const CrudTable = ({ products, setEditData, deleteEquipo }) => {

  return <>
    <h3>Productos actuales</h3>
    <table className='table'>
      <thead>
        <tr>
          <td>Producto</td>
          <td>Precio</td>
          <td>Descripción</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
      {
        products.length === 0 ? <tr><td>No hay datos</td></tr>
        : products.map((product, index) => {
          return <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>
                    <button className='btn btn-outline-warning mx-1'
                    onClick={() => setEditData(product)}>Editar</button>
                    <button className='btn btn-outline-danger mx-1'
                    onClick={() => deleteEquipo(product.id)}>Eliminar</button>
                  </td>
                </tr>
        })
      }
      </tbody>
    </table>
  </>
}

export default CrudTable