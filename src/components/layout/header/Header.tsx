import React from 'react'
import { Link } from 'react-router-dom'
import AppIcon from '../../../assets/icons/AppIcon.png';

const navItems = [
  { label: 'Become a renter', href: '/renter' },
  { label: 'Rental deals', href: '/deals' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Why choose us', href: '/why-us' },
]

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 bg-white">
        
      <Link to="/" className="flex items-center gap-2 text-blue-900 hover:text-[#1572D3] transition-all text-lg font-bold">
        <img src={AppIcon} alt="Rentcars Logo" className="w-8 h-8 object-contain" />
        RENTCARS
      </Link>
      <nav className="flex">
        {navItems.map((item) => (
          <Link key={item.label} to={item.href} className="px-20 py-2 rounded-full text-md font-large text-grey-500 hover:bg-blue-50 transition">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex gap-4">
        <button className="hover:bg-[#1572D3]  hover:text-white px-8 py-3 rounded-lg">Sign in</button>
        <button className="bg-[#1572D3] text-white hover:text-white px-8 py-3 rounded-lg">Sign up</button>
      </div>
    </header>
  )
}
