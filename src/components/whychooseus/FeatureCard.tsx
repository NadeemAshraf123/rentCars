interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className=" flex items-start gap-3 mt-10">
      <div className="text-blue-500 bg-[#ECF5FF] p-4 rounded-xl text-xl mt-1">{icon}</div>
      <div>
        <h4 className="text-md font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}
