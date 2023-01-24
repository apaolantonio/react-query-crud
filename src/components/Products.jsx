import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteProduct, getProducts, updateProduct } from "../api/productsAPI";

export const Products = () => {
  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Product deleted succesfully");
      queryClient.invalidateQueries();
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      console.log("Product updated succesfully");
      queryClient.invalidateQueries();
    },
  });

  const handleDelete = (id) => {
    deleteProductMutation.mutate(id);
  };

  // const handleOnChange = (e, product) => {
  //   updateProductMutation({ ...product, inStock: e.target.checked });
  // };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message} </div>;
  }

  return products.map((product) => (
    <div key={product.id}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={() => handleDelete(product.id)}>Delete</button>
      <input
        onChange={(e) => {
          updateProductMutation.mutate({
            ...product,
            inStock: e.target.checked,
          });
        }}
        id={product.id}
        type="checkbox"
        checked={product.inStock}
      />
      <label htmlFor={product.id}>In Stock</label>
    </div>
  ));
};

export default Products;
