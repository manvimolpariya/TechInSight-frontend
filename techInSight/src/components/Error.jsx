import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
   <section className='max_padd_container flexCenter flex-col pt-44'>
         <div className='text-3xl font-extrabold text-red-500'>
          Error 404 - Page not found
         </div>
      <div className='mt-4 bold-16'>
          <Link to={'/'}>Go back to <span className='text-secondary'>Home</span>
          </Link>
      </div>
   </section>
  )
}

export default Error
