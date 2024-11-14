import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Product } from "@/data/type";
import { deleteProductById } from "@/utils/productUtils";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";

const ActionsCell = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        deleteProductById(product.id, dispatch);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(product.id.toString())}
                >
                    Copy Product ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={`view-product/${product.id}`}>View</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={`/edit-product/${product.id}`}>Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="bg-destructive" onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionsCell;
