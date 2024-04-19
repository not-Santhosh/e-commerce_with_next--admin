"use client";

import { useEffect, useState } from 'react';

import ProductForm from '@/components/products/ProductForm';
import Loader from '@/components/custom-ui/Loader';

const page = ({params}: {params: {productId: string}}) => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<productType | null>(null)
    
    const getProducts = async() => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${params.productId}`, {
          method: "GET",
        })
        console.log({res});
        
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      getProducts();
    }, [])
  
    return loading ?(
      <Loader />
    ) : (
      <ProductForm initialData = {product}/>
    )
}

export default page
