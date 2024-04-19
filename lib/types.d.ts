type collectionType = {
    _id: string,
    title: string,
    description: string,
    image: string,
    products: productType[];
}

type productType = {
    _id: string,
    title: string,
    description: string,
    price: number,
    media: [string],
    category: string,
    collections: [collectionType],
    tags: [string],
    expense: number,
    size: [string],
    color: [string],
    createdAt: Date,
    updatedAt: Date
}