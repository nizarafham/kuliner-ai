"use client"

import type React from "react"

const ChefHatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 18.5a2.5 2.5 0 0 1-5 0V16h5v2.5Z" />
    <path d="M15 18.5a2.5 2.5 0 0 1-5 0V16h5v2.5Z" />
    <path d="M20 18.5a2.5 2.5 0 0 1-5 0V16h5v2.5Z" />
    <path d="M5 16v-3.5a2.5 2.5 0 0 1 5 0V16" />
    <path d="M10 16v-3.5a2.5 2.5 0 0 1 5 0V16" />
    <path d="M15 16v-3.5a2.5 2.5 0 0 1 5 0V16" />
    <path d="M5 12.5V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3.5" />
  </svg>
)

export default function RecipePlaceholder() {
  return (
    <div className="text-center py-16 px-6 border-2 border-dashed border-gray-300 rounded-xl">
      <ChefHatIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700">Resep Ajaib Menantimu</h3>
      <p className="max-w-xs mx-auto mt-1 text-gray-500">
        Masukkan bahan yang kamu punya untuk memulai petualangan rasa!
      </p>
    </div>
  )
}
