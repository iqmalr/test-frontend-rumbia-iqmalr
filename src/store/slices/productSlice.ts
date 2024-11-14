import laptopData from "@/data/laptop.json";
import { Product } from "@/data/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: laptopData,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const productIdx = state.products.findIndex(
        (product) => product.id === action.payload.id,
      );
      if (productIdx !== -1) {
        state.products[productIdx] = action.payload;
        // Object.assign(product, action.payload);
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
  },
});

export const selectProductById = (
  state: { products: ProductState },
  id: number,
) => state.products.products.find((product) => product.id === id);

export const { setProducts, updateProduct, deleteProduct, addProduct } =
  productSlice.actions;
export default productSlice.reducer;
