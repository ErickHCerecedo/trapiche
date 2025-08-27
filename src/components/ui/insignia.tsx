import React from 'react'

interface InsigniaProps {
  text: string;
  className?: string;
}

const Insignia: React.FC<InsigniaProps> = ({ text, className = "" }) => {
  return (
    <span className={`text-sm font-semibold uppercase text-red-800 tracking-wider line-clamp-1 mt-2 ${className}`}>
      {text}
    </span>
  )
}

export default Insignia