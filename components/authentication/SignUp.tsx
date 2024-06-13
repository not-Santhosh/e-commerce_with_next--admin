"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    username: z.string().min(4).max(20),
    password: z.string().max(15).min(8),
    confirmPassword: z.string().min(8).max(15),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
});

const SignUp = () => {
    const router = useRouter();
    const [loading, setLoding] = useState(false);
    console.log({loading});
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoding(true);
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(values)
            });

            if (!res.ok) {
                const errorMsg = await res.text();
                toast.error(`Registration Failed: ${errorMsg}`);
                return false;    
            }

            console.log({loading});
            

            toast.success("Registration Successful");
            router.push("/sign-in");

        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        } finally {
            setLoding(false);
        }
    }

    return (
        <div className='bg-grey-2 border rounded-xl shadow-xl mt-5 px-10 py-10 md:w-[500px] max-md:w-[80%]'>
            <div className='flex justify-center items-center mb-5'>
                <Image src={'/logo.png'} alt="logo" width={150} height={70} />
            </div>
            <div className='flex items-center w-full'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input className="w-full" {...field} />
                                    </FormControl>
                                    <FormMessage className='text-red-600' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} />
                                    </FormControl>
                                    <FormMessage className='text-red-600' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} />
                                    </FormControl>
                                    <FormMessage className='text-red-600' />
                                </FormItem>
                            )}
                        />
                        {!loading ? (
                            <Button
                                size="lg"
                                type="submit"
                                className="w-full flex justify-center items-center bg-blue-1 text-white"
                            >
                                Submit
                            </Button>) :
                            <div className='flex justify-center items-center'>
                                <Loader />
                            </div>
                        }
                        <p className="flex justify-center items-center">Already Have an Account ?&nbsp;<Link href={'/sign-in'} className="text-blue-1 hover:underline">Login</Link></p>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default SignUp
