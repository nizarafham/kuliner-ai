import type { User } from "@supabase/supabase-js"
import Demo from "./Demo"

interface DemoSectionProps {
  user: User | null
}

export default function DemoSection({ user }: DemoSectionProps) {
  return (
    <div className="bg-gray-50 rounded-2xl p-8">
      <Demo user={user} />
    </div>
  )
}
