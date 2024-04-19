"use client";
import React, { useState } from 'react';
import { z } from "zod";
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

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(200).trim(),
  image: z.string()
})

interface InitialDataParams {
  initialData ?: collectionType | null
}

const CollectionForm: React.FC<InitialDataParams> = ({initialData}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? initialData : {
      title: "",
      description: "",
      image: ""
    },
  })

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === "Enter") {
      e.preventDefault()
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData ? `/api/collections/${initialData._id}` : "/api/collections"
      const res = await fetch(url,{
        method: "POST",
        body: JSON.stringify(values)
      });

      if(res.ok) {
        setLoading(false);
        toast.success(`Collection ${initialData ? "updated" :"created"} succesffully`);
        window.location.href = "/collections"
        router.push('/collections');
      }
      else {
        console.log(res);        
        setLoading(false);
        toast.error("Something went wrong! please try again");
      }
    } catch (error) {
      console.log("Collection_Form", error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-10'>
      {initialData ? (
        <div className='flex items-center justify-between'>
          <p className='text-heading2-bold'>Edit Collections</p>
          <Delete id={initialData._id}/>
        </div>
      ) : (
        <p className='text-heading2-bold'>Create Collections</p>
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
                  <Input {...field} onKeyDown={handleKeyDown}/>
                </FormControl>
                <FormMessage className='text-red-600'/>
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
                  <Textarea {...field} rows={5}  onKeyDown={handleKeyDown}/>
                </FormControl>
                <FormMessage className='text-red-600'/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUploader value={field.value ? [field.value] : []} onChange={(url: string) => field.onChange(url)} onRemove={() => field.onChange("")} />
                </FormControl>
                <FormMessage className='text-red-600'/>
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button type="submit" className='bg-blue-1 text-white'>Submit</Button>
            <Button type='button' onClick={() => router.push('/collections')} className='bg-red-1 text-white'>Discard</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CollectionForm
