"use client";
import React, { useEffect, useState } from 'react'

import CollectionForm from '@/components/collections/CollectionForm';
import Loader from '@/components/custom-ui/Loader';

const CollectionDetails = ({params} : {params: {collectionId: string}}) => {  
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState<collectionType | null>(null)
  
  const getCollections = async() => {
    setLoading(true);
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      })
      console.log({res});
      
      const data = await res.json();
      setCollection(data);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCollections();
  }, [])

  return loading ? <Loader /> : (
    <CollectionForm initialData = {collection}/>
  )
}

export default CollectionDetails
