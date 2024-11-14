import { Product } from "@/data/type";
import Image from "next/image";
interface LaptopCardProps {
  product: Product;
}
const LaptopCard = ({ product }: LaptopCardProps) => {
  return (
    <div className="rounded-lg border p-4 shadow-lg">
      <div className="relative h-[100px] w-auto">
        <Image src={product.gambar} alt={product.nama} fill loading="lazy" />
      </div>
      <h3 className="truncate text-xl font-semibold">{product.nama}</h3>
      <p className="mb-4 text-sm text-gray-500">{product.brand}</p>
      <div
        className="mb-4 line-clamp-2 text-sm"
        dangerouslySetInnerHTML={{ __html: product.deskripsi }}
      />
      <h4 className="font-semibold">Variations:</h4>
      {product.variations.map((variation) => (
        <div
          key={variation.sku}
          className="flex justify-between gap-1 truncate border py-2"
        >
          <span>{variation.nama}</span>
          <span>Rp {variation.harga_jual.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default LaptopCard;
