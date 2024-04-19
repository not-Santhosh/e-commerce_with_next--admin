"use client";

import React, { useEffect, useState } from 'react';
import { string, z } from "zod";
import { Separator } from '../ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from '../ui/textarea';
import ImageUploader from '../custom-ui/ImageUploader';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Delete } from 'lucide-react';
import MultiText from '../custom-ui/MultiText';
import MultiSelect from '../custom-ui/MultiSelect';
import Loader from '../custom-ui/Loader';

const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().max(200).trim(),
    media: z.array(z.string()),
    category: z.string(),
    collections: z.array(z.string()),
    tags: z.array(z.string()),
    price: z.coerce.number().min(0.1),
    expense: z.coerce.number().min(0.1),
    size: z.array(z.string()),
    color: z.array(z.string()),
})

interface ProductDataProps {
    initialData?: productType | null
}

const ProductForm: React.FC<ProductDataProps> = ({ initialData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState<collectionType[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? {
                ...initialData,
                collections: initialData.collections.map(
                    (collection) => collection._id
                ),
            }
            : {
                title: "",
                description: "",
                media: [],
                category: "",
                collections: [],
                tags: [],
                size: [],
                color: [],
                price: 0.1,
                expense: 0.1,
            },
    })

    const getCollectons = async () => {
        try {
            setLoading(true);

            const res = await fetch('/api/collections', {
                method: "GET",
            })

            if (res.ok) {
                const data = await res.json();
                setCollection(data);
            }

        } catch (error) {
            console.log("Collection_ERR", error);
            toast.error("Something Went Wrong...");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCollectons();
    }, [])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const url = initialData ? `/api/products/${initialData._id}` : "/api/products"
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(values)
            });

            if (res.ok) {
                setLoading(false);
                toast.success(`Products ${initialData ? "updated" : "created"} succesffully`);
                window.location.href = "/products"
                router.push('/products');
            }
            else {
                console.log(res);
                setLoading(false);
                toast.error("Something went wrong! please try again");
            }
        } catch (error) {
            console.log("Product_Form", error);
        }
        finally {
            setLoading(false);
        }
    }
    console.log(initialData);

    return loading ? (
        <Loader />
    ): (
        <div className='p-10'>
            {initialData ? (
                <div className='flex url-center justify-between'>
                    <p className='text-heading2-bold'>Edit Product</p>
                    <Delete id={initialData._id} />
                </div>
            ) : (
                <p className='text-heading2-bold'>Create Product</p>
            )}

            <Separator className='bg-grey-1 mt-4 mb-5' />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} onKeyDown={handleKeyDown} />
                                </FormControl>
                                <FormMessage className='text-red-600' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} rows={5} onKeyDown={handleKeyDown} />
                                </FormControl>
                                <FormMessage className='text-red-600' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="media"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Media</FormLabel>
                                <FormControl>
                                    <ImageUploader
                                        value={field.value}
                                        onChange={(url: string) => field.onChange([...field.value, url])}
                                        onRemove={(url) => field.onChange([
                                            ...field.value.filter((item) => item !== url)
                                        ])} 
                                    />
                                </FormControl>
                                <FormMessage className='text-red-600' />
                            </FormItem>
                        )}
                    />
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <div className="mb-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input type='number' {...field} onKeyDown={handleKeyDown} />
                                        </FormControl>
                                        <FormMessage className='text-red-600' />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mb-4">
                            <FormField
                                control={form.control}
                                name="expense"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expense</FormLabel>
                                        <FormControl>
                                            <Input type='number' {...field} onKeyDown={handleKeyDown} />
                                        </FormControl>
                                        <FormMessage className='text-red-600' />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mb-4">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input {...field} onKeyDown={handleKeyDown} />
                                        </FormControl>
                                        <FormMessage className='text-red-600' />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mb-4">

                            <FormField
                                control={form.control}
                                name="collections"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Collections</FormLabel>
                                        <FormControl>
                                            <MultiSelect value={field.value}
                                                placeholder="Collections"
                                                collections={collection}
                                                onChange={(_id) => field.onChange([...field.value, _id])}
                                                onRemove={(idToRemove) => field.onChange([...field.value.filter((_id) => _id !== idToRemove)])}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-red-600' />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <MultiText values={field.value}
                                            onChange={(tag) => field.onChange([...field.value, tag])}
                                            onRemove={(tag) => field.onChange([...field.value.filter((item) => item !== tag)])}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-600' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <FormControl>
                                        <MultiText values={field.value}
                                            onChange={(color) => field.onChange([...field.value, color])}
                                            onRemove={(color) => field.onChange([...field.value.filter((item) => item !== color)])}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-600' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <FormControl>
                                        <MultiText values={field.value}
                                            onChange={(size) => field.onChange([...field.value, size])}
                                            onRemove={(size) => field.onChange([...field.value.filter((item) => item !== size)])}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-600' />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-10">
                        <Button type="submit" className='bg-blue-1 text-white'>Submit</Button>
                        <Button type='button' onClick={() => router.push('/products')} className='bg-red-1 text-white'>Discard</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ProductForm;
