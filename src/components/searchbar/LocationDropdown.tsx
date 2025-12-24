import React, { useEffect, useRef } from 'react'

interface LocationDropdownProps {
  onSelect: (city: string) => void
  onClose: () => void
}

const cities = ['Lahore', 'Karachi', 'Islamabad', 'Multan', 'Peshawar']

export default function LocationDropdown({ onSelect, onClose }: LocationDropdownProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div ref={ref} className="absolute z-10 bg-white shadow-lg rounded-lg p-4 w-64">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Select a city</h3>
      <ul className="space-y-2">
        {cities.map((city) => (
          <li
            key={city}
            onClick={() => onSelect(city)}
            className="cursor-pointer px-3 py-2 rounded hover:bg-blue-50 text-gray-800"
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  )
}
