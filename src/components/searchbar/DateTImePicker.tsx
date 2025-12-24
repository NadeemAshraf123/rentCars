import React, { useEffect, useRef, useState } from 'react'

interface DateTimePickerProps {
  onSelect: (formatted: string) => void
  onClose: () => void
}

export default function DateTimePicker({ onSelect, onClose }: DateTimePickerProps) {
  const [dateTime, setDateTime] = useState('')
    const pickerRef = useRef<HTMLDivElement | null>(null)




  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const handleConfirm = () => {
    if (!dateTime) return

    const formatted = new Date(dateTime).toLocaleString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })

    onSelect(formatted)
    onClose()
  }

  return (
    <div className="absolute z-10 bg-white shadow-lg rounded-lg p-4 w-72" ref={pickerRef}>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Select date & time</h3>
      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      />
      <button
        onClick={handleConfirm}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Confirm
      </button>
    </div>
  )
}
