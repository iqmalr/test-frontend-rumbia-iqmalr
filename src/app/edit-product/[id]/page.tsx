'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/data/type";
import { selectProductById } from "@/store/slices/productSlice";
import { RootState } from "@/store/store";
import { addEmptyVariation, handleUpdateProduct } from "@/utils/productUtils";
import { PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const EditProductPage = ({ params }: { params: { id: number } }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const product = useSelector((state: RootState) => selectProductById(state, Number(params.id)));
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<Product>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "variations"
    });

    useEffect(() => {
        // const productId = params.id;
        // const foundProduct = laptopData.find((item: Product) => item.id == productId);

        if (product) {
            setValue('nama', product.nama);
            setValue('brand', product.brand);
            setValue('sku', product.sku);
            setValue('gambar', product.gambar);
            setValue('deskripsi', product.deskripsi);
            setValue('variations', product.variations);
        }
    }, [product, setValue]);

    const onSubmit: SubmitHandler<Product> = (data) => {
        if (product) {
            handleUpdateProduct(product, data, dispatch, router);
        }
    };

    const addVariation = () => {
        append(addEmptyVariation());
    };
    if (!product) return <p>Product not found</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Edit Product: {product.nama}</h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="nama" className="block text-sm font-medium">
                        Nama Laptop:
                    </label>
                    <Input
                        id="nama"
                        {...register("nama", {
                            required: "Nama is required",
                            minLength: { value: 3, message: "Minimum length is 3 characters" }
                        })}
                        className="mt-1"
                    />
                    {errors.nama && (
                        <p className="text-red-500 text-sm mt-1">{errors.nama.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="brand" className="block text-sm font-medium">
                        Brand:
                    </label>
                    <Input
                        id="brand"
                        {...register("brand", {
                            required: "Brand is required",
                            minLength: { value: 2, message: "Minimum length is 2 characters" }
                        })}
                        className="mt-1"
                    />
                    {errors.brand && (
                        <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="sku" className="block text-sm font-medium">
                        SKU:
                    </label>
                    <Input
                        id="sku"
                        {...register("sku", {
                            required: "SKU is required",
                            pattern: {
                                value: /^[A-Za-z0-9-]+$/,
                                message: "SKU must contain only letters, numbers, and hyphens"
                            }
                        })}
                        className="mt-1"
                    />
                    {errors.sku && (
                        <p className="text-red-500 text-sm mt-1">{errors.sku.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="gambar" className="block text-sm font-medium">
                        Gambar:
                    </label>
                    <Input
                        id="gambar"
                        {...register("gambar", {
                            required: "Gambar is required",
                            pattern: {
                                value: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
                                message: "Invalid image format"
                            }
                        })}
                        className="mt-1"
                    />
                    {errors.gambar && (
                        <p className="text-red-500 text-sm mt-1">{errors.gambar.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="deskripsi" className="block text-sm font-medium">
                        Deskripsi:
                    </label>
                    <Input
                        id="deskripsi"
                        {...register("deskripsi", {
                            required: "Deskripsi is required",
                            minLength: { value: 10, message: "Minimum length is 10 characters" }
                        })}
                        className="mt-1"
                    />
                    {errors.deskripsi && (
                        <p className="text-red-500 text-sm mt-1">{errors.deskripsi.message}</p>
                    )}
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium">Variations:</label>
                        <Button
                            type="button"
                            onClick={addVariation}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Add Variation
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-lg space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium">Variation {index + 1}</h3>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => remove(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">
                                        Nama Variation:
                                    </label>
                                    <Input
                                        {...register(`variations.${index}.nama` as const, {
                                            required: "Nama variation is required"
                                        })}
                                        className="mt-1"
                                    />
                                    {errors.variations?.[index]?.nama && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.variations[index]?.nama?.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">
                                        SKU Variation:
                                    </label>
                                    <Input
                                        {...register(`variations.${index}.sku` as const, {
                                            required: "SKU variation is required"
                                        })}
                                        className="mt-1"
                                    />
                                    {errors.variations?.[index]?.sku && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.variations[index]?.sku?.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">
                                        Harga Jual:
                                    </label>
                                    <Input
                                        type="number"
                                        {...register(`variations.${index}.harga_jual` as const, {
                                            required: "Harga jual is required",
                                            min: {
                                                value: 0,
                                                message: "Harga jual must be positive"
                                            }
                                        })}
                                        className="mt-1"
                                    />
                                    {errors.variations?.[index]?.harga_jual && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.variations[index]?.harga_jual?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-4">
                    <Button type="submit">Submit</Button>
                    {/* <Button variant={"destructive"}>Delete Data</Button> */}
                    <Button variant="outline" onClick={() => router.back()} type="button">
                        Go Back
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditProductPage;