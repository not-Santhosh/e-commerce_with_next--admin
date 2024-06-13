"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { getSession } from "@/lib/Auth/actions";

const formSchema = z.object({
    username: z.string().min(4).max(20),
    password: z.string().max(35).min(8),
})

const SignIn = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            const res = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(values)
            });

            if (!res.ok) {
                const errorMsg = await res.text();
                toast.error(`Login Failed: ${errorMsg}`);
                return false;
            }

            const user = await res.json();

            const session = await getSession();

            session.userId = user._id;
            session.username = user.name;
            session.image = user.image;
            session.isLoggedIn = true;

            await session.save();
            
            toast.success("Login Successful");
            router.push("/");
        } catch (error) {
            toast.error(`Login Failed: ${error}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-grey-2 border rounded-xl shadow-xl mt-5 px-10 py-10 md:w-[500px] max-md:w-[80%]">
            <div className="flex justify-center w-full items-center mb-5 top-0 align-middle">
                <Image src={"/logo.png"} alt="logo" width={150} height={70} />
            </div>
            <div className="flex w-full items-center justify-start mt-2">
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
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage className='text-red-600' />
                                </FormItem>
                            )}
                        />
                        
                            {loading ?
                                ( 
                                    <div className="flex justify-center items-center">
                                        <Loader /> 
                                    </div>
                                ): (
                                <Button
                                    size="lg"
                                    type="submit"
                                    className="w-full flex justify-center items-center bg-blue-1 text-white"
                                >
                                    Submit
                                </Button>
                            )}
                        <p className="flex justify-center items-center">Dont Have an Account?&nbsp;<Link href={'/sign-up'} className="text-blue-1 hover:underline">Login</Link></p>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default SignIn
