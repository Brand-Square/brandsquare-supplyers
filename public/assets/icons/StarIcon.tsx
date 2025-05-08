import React from 'react'

const StarIcon = ({color} : { color?:string}) => {
  return (
    <div><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.375 7.875H12.2188L10 0.9375L7.78125 7.875H0.625L6.40625 12.1562L4.21875 19.0625L10 14.7812L15.7812 19.0625L13.5625 12.125L19.375 7.875Z" fill={color || "#FFCE31"}/>
    </svg>
    </div>
  )
}

export default StarIcon