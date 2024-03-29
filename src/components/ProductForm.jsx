import { useMutation, useQueryClient } from "react-query";
import { createProduct } from "../api/productsAPI";

const ProductForm = () => {
  const queryClient = useQueryClient();
  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log("Product Added");
      queryClient.invalidateQueries();
    },
  });
  const handleSubmit = (e) => {
    // Esto se hace para no reiniciar la página en el submit
    e.preventDefault();

    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    addProductMutation.mutate({ ...product, inStock: true });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description" />

      <label htmlFor="price">Price</label>
      <input type="text" name="price" id="price" />

      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
