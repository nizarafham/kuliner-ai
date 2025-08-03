'use client'

interface Recipe {
  recipeName: string
  ingredients: string[]
  steps: string[]
}

interface RecipeDisplayProps {
    recipe: Recipe;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-fade-in">
            <div className="p-6 sm:p-8 bg-[#d35a2f] text-white">
              <h2 className="text-3xl font-bold">{recipe.recipeName}</h2>
            </div>
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Bahan-bahan</h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                        <span className="text-[#d35a2f] mr-2 font-bold">✓</span>
                        {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Cara Membuat</h3>
                <ol className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 bg-[#d35a2f] text-white rounded-full h-7 w-7 flex items-center justify-center font-bold text-sm mr-4 mt-1">{index + 1}</div>
                      <p className="flex-1 text-gray-600">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
        </div>
    )
}
