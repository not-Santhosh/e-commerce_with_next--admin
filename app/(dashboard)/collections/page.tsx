"use client";

import { columns } from '@/components/collections/CollectionColumn';
import { DataTable } from '@/components/custom-ui/DataTable';
import Loader from '@/components/custom-ui/Loader';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const router = useRouter();

  const getCollection = async() => {
    try {
      setLoading(true);
      const res = await fetch('/api/collections',{
        method: "GET"
      });

      const data = await res.json();

      setCollection(data);
      
    } catch (error) {
      console.log("collection_GET", error);      
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCollection();
  }, []); 

  return loading ? <Loader /> : (
    <div className="py-10 px-5">
      <div className='flex items-center justify-between'>
        <p className='text-heading2-bold'>Collection</p>
        <Button className='bg-blue-1 text-white' onClick={() => (router.push('/collections/new'))}>
          <Plus className='h-4 w-4 mr-2'/>
          Create Collection
        </Button>
      </div>
      <Separator className='bg-grey-1 my-4'/>
      <DataTable columns={columns} data={collection} searchKey='title'/>
    </div>
  )
}

export default page
