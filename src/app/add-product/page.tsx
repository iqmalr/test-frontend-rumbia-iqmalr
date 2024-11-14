'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/data/type";
import { addProduct } from "@/store/slices/productSlice";
import { PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const AddProduct = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Product>({
        defaultValues: {
            variations: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "variations"
    });
    const addVariation = () => {
        append({ nama: '', sku: '', harga_jual: 0 });
    };

    const onSubmit: SubmitHandler<Product> = (data) => {
        console.log(data);
        dispatch(addProduct(data));
        router.push('/product-list');
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Add New Product</h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="nama" className="block text-sm font-medium">
                        Nama Product:
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
                                    <label className="block text-sm font-medium">Nama Variation:</label>
                                    <Input
                                        {...register(`variations.${index}.nama` as const, {
                                            required: "Nama variation is required"
                                        })}
                                        className="mt-1"
                                    />
                                    {errors.variations?.[index]?.nama && (
                                        <p className="text-red-500 text-sm mt-1">{errors.variations[index]?.nama?.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">SKU Variation:</label>
                                    <Input
                                        {...register(`variations.${index}.sku` as const, {
                                            required: "SKU variation is required"
                                        })}
                                        className="mt-1"
                                    />
                                    {errors.variations?.[index]?.sku && (
                                        <p className="text-red-500 text-sm mt-1">{errors.variations[index]?.sku?.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Harga Jual:</label>
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
                                        <p className="text-red-500 text-sm mt-1">{errors.variations[index]?.harga_jual?.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4">
                    <Button type="submit">Submit</Button>
                    <Button variant="outline" onClick={() => router.back()} type="button">
                        Go Back
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
