import React from 'react'

interface StepCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function StepCard({ icon, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-blue-500 bg-[#ECF5FF] p-8 rounded-2xl text-4xl mb-3">{icon}</div>
      <h4 className="text-2xl mb-4 px-0 mt-3">{title}</h4>
      <p className="text-sm px-12 text-gray-600">{description}</p>
    </div>
  )
}
