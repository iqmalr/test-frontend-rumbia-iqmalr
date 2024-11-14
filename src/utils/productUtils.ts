import { Product } from "@/data/type";
import { deleteProduct, updateProduct } from "@/store/slices/productSlice";
import { AppDispatch } from "@/store/store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const deleteProductById = (id: number, dispatch: AppDispatch) => {
  dispatch(deleteProduct(id));
  console.log(`Product with ID ${id} deleted.`);
};
export const handleUpdateProduct = (
  product: Product,
  data: Product,
  dispatch: AppDispatch,
  router: AppRouterInstance,
) => {
  const payload: Product = { ...product, ...data, id: product.id };
  dispatch(updateProduct(payload));
  console.log("Updated Product:", payload);
  router.back();
};

export const addEmptyVariation = () => ({
  nama: "",
  sku: "",
  harga_jual: 0,
});
