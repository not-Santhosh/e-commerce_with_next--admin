"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom-ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<productType>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <Link
                href={`/products/${row.original._id}`}
                className="hover:text-blue-1"
            >
                {row.original.title}
            </Link>
        )
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "collections",
        header: "Collections",
        cell: ({ row }) => row.original.collections.map((item) => item.title).join(', ')
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "expense",
        header: "Expense",
    },
    {
        id: "actions",
        cell: ({ row }) => <Delete item="product" id={row.original._id} />,
    },
]
