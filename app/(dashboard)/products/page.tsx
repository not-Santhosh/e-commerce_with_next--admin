"use client";

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { DataTable } from '@/components/custom-ui/DataTable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { columns } from '@/components/products/ProductColumn';
import Loader from '@/components/custom-ui/Loader';

const Products = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<productType[]>([]);

    const getProducts = async () => {

        try {
            setLoading(true)

            const res = await fetch('/api/products', {
                method: "GET",
            })

            if (!res.ok) {
                console.log(res);
                toast.error("Something went wrong...");
                return false;
            }

            const data = await res.json();
            setProducts(data);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return loading ? <Loader /> : (
        <div className='px-10 py-5'>
            <div className='flex items-center justify-between'>
                <p className='text-heading2-bold'>Products</p>
                <Button className='bg-blue-1 text-white' onClick={() => (router.push('/products/new'))}>
                    <Plus className='h-4 w-4 mr-2' />
                    Create Products
                </Button>
            </div>
            <Separator className='bg-grey-1 my-4' />
            <DataTable columns={columns} data={products} searchKey='title' />
        </div>
    )
}

export default Products
