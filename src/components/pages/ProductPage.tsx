import LaptopCard from "@/components/fragments/LaptopCard";
import laptopData from "@/data/laptop.json";
import { Product } from "@/data/type";
import EachUtils from "@/utils/EachUtils";

const ProductPage = () => {
  return (
       <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Laptop Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
  )
}

export default ProductPage