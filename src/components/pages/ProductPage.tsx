"use client";
import LaptopCard from "@/components/fragments/LaptopCard";
import laptopData from "@/data/laptop.json";
import { Product } from "@/data/type";
import { setProducts } from "@/store/slices/productSlice";
import { RootState } from "@/store/store";
import EachUtils from "@/utils/EachUtils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(setProducts(laptopData as Product[]));
    }
  }, [dispatch, products]);
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Laptop Products</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {laptopData.map((product: Product) => (
          <LaptopCard key={product.id} product={product} />
        ))}
        <EachUtils
          of={laptopData}
          render={(product: Product) => (
            <LaptopCard key={product.id} product={product} />
          )}
        />
      </div>
    </div>
  );
};

export default ProductPage;
