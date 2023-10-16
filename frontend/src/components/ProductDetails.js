import { useProductsContext } from "../hooks/useProductsContext"
import Swal from 'sweetalert2'  // Import the SweetAlert library

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const ProductDetails = ({ product }) => {

    const { dispatch } = useProductsContext()

    const handleClick = async () => {
        const response = await fetch('/api/products/' + product._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_PRODUCT', payload: json })
        }
    }

    const handleConfirm = () => {
        Swal.fire({
            title: 'Confirm Deletion',
            text: 'Are you sure you want to delete this Product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                handleClick(); // Call the delete function if confirmed
            }
        });
    };

    return (
        <div className="product-details">
            <h4>{product.pName}</h4>
            <p><strong>product Unit:</strong> {product.pUnit}</p>
            <p><strong>product Quantity:</strong> {product.pQty}</p>
            <p><strong>product Price (per Unit):</strong> {product.pPrice}</p>
            <p><strong>Supplier ID:</strong> {product.supplier}</p>
            <p>
                {product.createdAt ? (`Created: ${formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}`) : ('N/A')}
                {product.updatedAt && product.updatedAt !== product.createdAt ? (<span> | Updated: {formatDistanceToNow(new Date(product.updatedAt), { addSuffix: true })}</span>) : null}
            </p>
            <span onClick={handleConfirm}>Delete</span>

        </div>
    )
}

export default ProductDetails
