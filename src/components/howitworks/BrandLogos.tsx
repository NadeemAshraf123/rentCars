import React from 'react'

const brands = ['HONDA', 'JAGUAR', 'NISSAN', 'VOLVO', 'AUDI', 'ACURA']

export default function BrandLogos() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {brands.map((brand) => (
        <div
          key={brand}
          className="text-gray-700 font-semibold text-sm bg-white px-20 py-2 rounded shadow"
        >
          {brand}
        </div>
      ))}
    </div>
  )
}
