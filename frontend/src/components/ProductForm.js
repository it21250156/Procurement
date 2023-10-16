import { useState, useContext } from "react"; // Import useContext
import { useProductsContext } from "../hooks/useProductsContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SupplierContext } from "../context/SupplierContext"; // Import the SupplierContext

const ProductForm = () => {
  const { dispatch } = useProductsContext();
  const [pName, setPname] = useState("");
  const [pUnit, setPunit] = useState("");
  const [pQty, setPqty] = useState("");
  const [pPrice, setPprice] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Access the supplier data from the SupplierContext
  const { supplier } = useContext(SupplierContext);

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

    // Access supplier._id from the context
    const supplierId = supplier ? supplier._id : null;

    console.log("Supplier ID:", supplierId); // Debugging statement

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    // Ensure that the supplier value is included in the product data
    const product = { pName, pUnit, pQty, pPrice, supplier: supplierId };

    console.log("Product:", product); // Debugging statement

    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setErrors({ submit: json.error });
    } else {
      setPname("");
      setPunit("");
      setPqty("");
      setPprice("");
      setErrors({});
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "New product added!",
      }).then(() => {
        dispatch({ type: "CREATE_PRODUCT", payload: json });
        navigate("/supProducts");
      });
    }
  };

  return (
    <form className="productForm" onSubmit={handleSubmit}>
      <h3>Add new Product</h3>

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

      <button>Add Product</button>
      {errors.submit && <div className="error">{errors.submit}</div>}
    </form>
  );
};

export default ProductForm;
