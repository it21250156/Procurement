import React, { useEffect } from 'react'
import ProductForm from '../components/ProductForm'
import { useProductsContext } from '../hooks/useProductsContext'




function AddProduct () {

    const {dispatch} = useProductsContext()


    useEffect(() =>{
        const fetchProducts = async () => {
          const response = await fetch('/api/products')
          const json = await response.json()
    
          if(response.ok) {
    
            dispatch({type: 'SET_PRODUCTS', payload: json})
            
          }
        }
    
        fetchProducts()
      },[dispatch])
    
    return (
        <div className= "AddProductsPage">
 
  <ProductForm/>
  
</div>

    )


}

export default AddProduct

