'use client'

import { useState } from 'react'

interface ServerLogoProps {
  logoUrl?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ServerLogo({ logoUrl, name, size = 'md', className = '' }: ServerLogoProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg'
  }

  // If no logo URL or image failed to load, show fallback
  if (!logoUrl || imageError) {
    return (
      <div className={`${sizeClasses[size]} rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold ${textSizes[size]} ${className}`}>
        {name.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <div className={`${sizeClasses[size]} relative ${className}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 rounded bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse flex items-center justify-center">
          <div className={`${textSizes[size]} text-gray-500 dark:text-gray-400`}>
            {name.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
      <img 
        src={logoUrl} 
        alt={`${name} logo`}
        className={`${sizeClasses[size]} rounded object-contain bg-gray-50 dark:bg-gray-800 p-1 transition-opacity duration-200 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  )
}
