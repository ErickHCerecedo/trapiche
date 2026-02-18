"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface MediaDisplayProps {
  src: string
  alt: string
  width?: number
  height?: number
  quality?: number
  className?: string
  containerClassName?: string
  playable?: boolean // Nuevo prop
}

const MediaDisplay: React.FC<MediaDisplayProps> = ({
  src,
  alt,
  width = 1000,
  height = 800,
  quality = 80,
  className = '',
  containerClassName = '',
  playable = true // Por defecto true
}) => {
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'unknown'>('unknown')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Función para detectar el tipo de media basado en la URL
  const detectMediaType = (url: string): 'image' | 'video' | 'unknown' => {
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff)(\?.*)?$/i
    const videoExtensions = /\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv|m4v)(\?.*)?$/i
    
    // Detectar por extensión de archivo
    if (imageExtensions.test(url)) {
      return 'image'
    }
    if (videoExtensions.test(url)) {
      return 'video'
    }

    // Detectar URLs de servicios conocidos
    if (url.includes('youtube.com') || url.includes('youtu.be') || 
        url.includes('vimeo.com') || url.includes('dailymotion.com') ||
        url.includes('cloudinary.com/video/')) {
      return 'video'
    }
    
    // Si contiene cloudinary y no es específicamente video, probablemente es imagen
    if (url.includes('cloudinary.com') || url.includes('res.cloudinary.com')) {
      return 'image'
    }

    return 'unknown'
  }

  // Función para verificar el tipo de media haciendo una petición HEAD
  const verifyMediaType = async (url: string): Promise<'image' | 'video' | 'unknown'> => {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      const contentType = response.headers.get('content-type') || ''
      
      if (contentType.startsWith('image/')) {
        return 'image'
      }
      if (contentType.startsWith('video/')) {
        return 'video'
      }
      
      return 'unknown'
    } catch (error) {
      console.warn('Error verificando tipo de media:', error)
      return 'unknown'
    }
  }

  useEffect(() => {
    const determineMediaType = async () => {
      setIsLoading(true)
      
      // Primero intenta detectar por URL
      let type = detectMediaType(src)
      
      // Si no se puede determinar por URL, hacer petición HEAD
      if (type === 'unknown') {
        type = await verifyMediaType(src)
      }
      
      // Si aún es desconocido, asumir que es imagen por defecto
      if (type === 'unknown') {
        type = 'image'
      }
      
      setMediaType(type)
      setIsLoading(false)
    }

    if (src) {
      determineMediaType()
    }
  }, [src])

  const handleError = () => {
    setError(true)
    setIsLoading(false)
  }

  // Genera el thumbnail de Cloudinary en el segundo 5
  const getCloudinaryPoster = (videoUrl: string) => {
    if (!videoUrl.includes('/video/upload/')) return undefined;
    return videoUrl.replace('/video/upload/', '/video/upload/so_5/').replace(/\.(mp4|webm|ogg|mov|m4v)/, '.jpg');
  };

  if (isLoading) {
    return (
      <div className={containerClassName}>
        <div 
          className={`flex items-center justify-center bg-gray-200 animate-pulse ${className}`}
          style={{ width, height }}
        >
          <div className="text-gray-400">Cargando...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={containerClassName}>
        <div 
          className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 ${className}`}
          style={{ width, height }}
        >
          <div className="text-gray-500">Error al cargar el contenido</div>
        </div>
      </div>
    )
  }

  if (mediaType === 'video') {
    return (
      <div className={containerClassName}>
        <video
          className={`w-full h-auto object-cover ${className}`}
          width={width}
          height={height}
          controls={playable}
          preload="metadata"
          onError={handleError}
          poster={src.includes('cloudinary.com') ? getCloudinaryPoster(src) : undefined}
        >
          <source src={src} type={`video/${src.split('.').pop()?.split('?')[0] || 'mp4'}`} />
          <p>Tu navegador no soporta el elemento de video.</p>
        </video>
      </div>
    )
  }

  // Por defecto, renderizar como imagen
  return (
    <div className={containerClassName}>
      <Image 
        src={src} 
        alt={alt}  
        width={width} 
        height={height} 
        quality={quality} 
        className={`${className}`}
        onError={handleError}
        priority={true}
      />
    </div>
  )
}

export default MediaDisplay