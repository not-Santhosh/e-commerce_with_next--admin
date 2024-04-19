import { CldUploadWidget } from 'next-cloudinary';
import { Plus, Trash } from 'lucide-react';

import { Button } from '../ui/button';
import Image from 'next/image';

interface ImageUploaderProps {
    value: string[],
    onChange: (value:string) => void,
    onRemove: (value:string) => void
}

const ImageUploader:React.FC<ImageUploaderProps> = ({
    value,
    onChange,
    onRemove
}) => {

    const onUpload = (result:any) => {
        onChange(result.info.secure_url)
    }

    return (
        <div>
            <div className='mb-4 flex flex-wrap items-center gap-4'>
                {value.map((url, index) => (
                <div key={index} className='relative w-[200px] h-[200px]'>
                    <div className='absolute top-0 right-0 z-10'>
                        <Button key={index} onClick={() => onRemove(url)} size={'sm'} className='bg-red-1 text-white'>
                            <Trash className='h-4 w-4'/>
                        </Button>
                    </div>
                    <Image src={url}  width={200} height={200} alt='collections' key={index} className='object-cover rounded-lg'/>
                </div>
                ))}
            </div>
            <CldUploadWidget uploadPreset="fjpmrrqt" onUpload={onUpload}>
                {({ open }) => {
                    return (
                        <Button onClick={() => open()} className='bg-grey-1 text-white'>
                            <Plus className='h-4 w-4 mr-2'/>
                            Upload Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUploader
