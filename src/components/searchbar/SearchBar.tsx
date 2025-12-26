import React, { useState } from 'react'
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import LocationDropdown from './LocationDropdown'
import DateTimePicker from './DateTImePicker'

export default function SearchBar() {
  const [location, setLocation] = useState('')
  const [pickup, setPickup] = useState('')
  const [returnDate, setReturnDate] = useState('')

  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showPickupPicker, setShowPickupPicker] = useState(false)
  const [showReturnPicker, setShowReturnPicker] = useState(false)

  const handleSearch = () => {
    console.log({ location, pickup, returnDate })
    // later: call API or navigate
  }

  return (
    <div className="relative z-10 flex flex-col md:flex-row px-8 bg-white rounded-lg  shadow-xl mt-[-100px] mb-50">
      
      <div className="flex-1 ">
        <label className="text-sm font-semibold px-1 text-gray-700 block">Location</label>
        <button
          onClick={() => setShowLocationDropdown(true)}
          className="w-full flex items-center justify-between rounded-lg py-2 bg-white text-gray-800"
        >
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-gray-500 text-xl" />
            <span className='text-xs'>{location || 'Search your location'}</span>
          </div>
        </button>
        {showLocationDropdown && (
          <LocationDropdown
            onSelect={(city) => {
              setLocation(city)
              setShowLocationDropdown(false)
            }}
                onClose={() => setShowLocationDropdown(false)}
          />
        )}
      </div>

      
      <div className="flex-1 relative border-l-1 border-gray-300 px-12">
        <label className="text-sm font-semibold px-2 text-gray-700 block">Pickup date</label>
        <button
          onClick={() => setShowPickupPicker(true)}
          className="w-full flex items-center justify-between rounded-lg px-2 py-2 bg-white text-gray-800"
        >
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500 text-xl" />
            <span className='text-xs'>{pickup || 'Select pickup date'}</span>
          </div>
        </button>
        {showPickupPicker && (
          <DateTimePicker
            onSelect={(dateTime) => {
              setPickup(dateTime)
              setShowPickupPicker(false)
            }}
                onClose={() => setShowPickupPicker(false)}
          />
        )}
      </div>

    
      <div className="flex-1 relative border-l-1 border-gray-300 px-12">
        <label className="text-sm font-semibold text-gray-700 px-2 block">Return date</label>
        <button
          onClick={() => setShowReturnPicker(true)}
          className="w-full flex items-center justify-between rounded-lg px-2 py-2 bg-white text-gray-800"
        >
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500 text-xl" />
            <span className='text-xs'>{returnDate || 'Select return date'}</span>
          </div>
        </button>
        {showReturnPicker && (
          <DateTimePicker
            onSelect={(dateTime) => {
              setReturnDate(dateTime)
              setShowReturnPicker(false)
            }}
                onClose={() => setShowReturnPicker(false)}
          />
        )}
      </div>
      <div className="h-full flex items-end">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          Search
        </button>
      </div>

    </div>
  )
}
