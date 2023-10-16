import { useState, useEffect } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const UpdateProductForm = () => {
  const { dispatch } = useProductsContext();
  const [pName, setPname] = useState("");
  const [pUnit, setPunit] = useState("");
  const [pQty, setPqty] = useState("");
  const [pPrice, setPprice] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { _id } = useParams(); // Retrieve product ID from the URL

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${_id}`);
        if (response.ok) {
          const productData = await response.json();
          const { pName, pUnit, pQty, pPrice } = productData;
          setPname(pName);
          setPunit(pUnit);
          setPqty(pQty);
          setPprice(pPrice);
        }
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };

    fetchProduct();
  }, [_id]);

  const validateForm = () => {
    let formErrors = {};
  
    if (!pName) {
      formErrors.pName = "Product Name is required";
    }
  
    if (!pUnit) {
      formErrors.pUnit = "Product Unit is required";
    }
  
    if (!pQty || isNaN(pQty) || pQty <= 0) {
      formErrors.pQty = "Product Quantity is required and must be a positive number";
    }
  
    if (!pPrice || isNaN(pPrice) || pPrice <= 0) {
      formErrors.pPrice = "Product Price is required and must be a positive number";
    }
  
    return formErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    const updatedProduct = { pName, pUnit, pQty, pPrice };

    const response = await fetch(`/api/products/${_id}`, {
      method: "PATCH", // Use PATCH for updating
      body: JSON.stringify(updatedProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const json = await response.json();
      setErrors({ submit: json.error });
    } else {
      setErrors({});
      console.log("Product updated successfully");
      dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
       // Show SweetAlert2 success message
       Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product updated successfully!",
      }).then(() => {
        navigate("/supProducts");
      });
    }
  };

  return (
    <form className="update-productForm" onSubmit={handleSubmit}>
      <h3>Update Product</h3>

      <label>Product Name: </label>
      <input
        type="text"
        onChange={(e) => setPname(e.target.value)}
        value={pName}
      />
      {errors.pName && <div className="error">{errors.pName}</div>}

      <label>Product Unit (e.g., pieces, liters, kilograms): </label>
      <input
        type="text"
        onChange={(e) => setPunit(e.target.value)}
        value={pUnit}
      />
      {errors.pUnit && <div className="error">{errors.pUnit}</div>}

      <label>Product Quantity: </label>
      <input
        type="number"
        onChange={(e) => setPqty(e.target.value)}
        value={pQty}
      />
      {errors.pQty && <div className="error">{errors.pQty}</div>}

      <label>Product Price(per Unit): </label>
      <input
        type="number"
        onChange={(e) => setPprice(e.target.value)}
        value={pPrice}
      />
      {errors.pPrice && <div className="error">{errors.pPrice}</div>}

      <button>Update Product</button>
      {errors.submit && <div className="error">{errors.submit}</div>}
    </form>
  );
};

export default UpdateProductForm;
