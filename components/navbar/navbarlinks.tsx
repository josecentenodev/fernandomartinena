import Link from 'next/link'
import React from 'react'


const NavBarLinks = () => {
  return (
    <div className='flex gap-5 text-2xl'>
        <Link href='/'>home</Link>
        <Link href='/about'>about</Link>
        <Link href='/news'>news</Link>
        <Link href='/shop'>shop</Link>
        <Link href='/contact'>contact</Link>
    </div>
  )
}

export default NavBarLinks