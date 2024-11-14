'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { selectProductById } from "@/store/slices/productSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ViewProduct = ({ params }: { params: { id: number } }) => {
  const router = useRouter();

  const product = useSelector((state: RootState) => selectProductById(state, Number(params.id)));
  if (!product) return <p>Product not found</p>;
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">{product.nama}</h1>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{product.nama}</h2>
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
            </div>
            <Image
              src={product.gambar}
              alt={product.nama}
              width={200}
              height={200}
              className="rounded-md shadow-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{product.brand}</p>
          <div dangerouslySetInnerHTML={{ __html: product.deskripsi }} className="prose mt-4" />
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => router.back()} type="button">Go Back</Button>
        </CardFooter>
      </Card>

      {/* Card for Variations */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Variations</h3>
        {product.variations?.length > 0 ? (
          <div className="space-y-4">
            {product.variations.map((variation, index) => (
              <Card key={index} className="border rounded-lg shadow-sm">
                <CardHeader>
                  <h4 className="text-lg font-medium">{variation.nama}</h4>
                </CardHeader>
                <CardContent>
                  <p>SKU: {variation.sku}</p>
                  <p className="text-xl font-semibold">Harga: Rp {variation.harga_jual.toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No variations available</p>
        )}
      </div>
    </div>
  );
}

export default ViewProduct