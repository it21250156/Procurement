import { useEffect } from "react"
import { useProductsContext } from "../hooks/useProductsContext"

//components
import ProductDetails from '../components/ProductDetails'

const AllProducts = () => {

    const {products, dispatch} = useProductsContext()

    useEffect(() =>{
        const fetchProducts = async() =>{
            const response = await fetch('/api/products')
            const json = await response.json()

            if (response.ok) {
                
                dispatch({type: 'SET_PRODUCTS', payload: json})
            }
        }

        fetchProducts()

    },[dispatch])

    return(

        <div className="allProducts">
           <div className="products">

            {products && products.map((product) =>(


                <ProductDetails key={product._id} product={product}/>

            ))}
           </div>

        </div>
    )
}

export default AllProducts