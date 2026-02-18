import React from 'react';
import { CreatePostForm } from '@/components/CreatePostForm';

export default function NuevaPublicacionPage() {
    return (
        <div className='w-full flex justify-center items-center'>
            <CreatePostForm  className='w-[70rem]'/>
        </div>
    );
}