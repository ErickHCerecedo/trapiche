import React from 'react';
import { CreatePostForm } from '@/components/CreatePostForm';

export default function NuevaPublicacionPage() {
    return (
        <div>
            <h1>Nueva Publicación</h1>
            <div className='w-full p-4 flex justify-center items-center'>
                <CreatePostForm  className='w-1/2'/>
            </div>
            
        </div>
    );
}