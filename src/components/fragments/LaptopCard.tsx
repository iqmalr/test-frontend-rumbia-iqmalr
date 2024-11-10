import { Product } from "@/data/type";
import Image from "next/image";
interface LaptopCardProps {
  product: Product;
}
const LaptopCard = ({ product }: LaptopCardProps) => {
  return (
    <div className="border rounded-lg shadow-lg p-4">
      <div className="relative w-auto h-[100px]">
        <Image src={product.gambar} alt={product.nama} fill loading="lazy" />
      </div>
      <h3 className="text-xl font-semibold truncate">{product.nama}</h3>
      <p className="text-sm text-gray-500 mb-4">{product.brand}</p>
      <div
        className="text-sm mb-4 line-clamp-2"
        dangerouslySetInnerHTML={{ __html: product.deskripsi }}
      />
      <h4 className="font-semibold">Variations:</h4>
      {product.variations.map((variation) => (
        <div
          key={variation.sku}
          className="border flex justify-between py-2 gap-1 truncate"
        >
          <span>{variation.nama}</span>
          <span>Rp {variation.harga_jual.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default LaptopCard;
