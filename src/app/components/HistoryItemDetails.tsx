'use client'

type RecipeResult = {
  ingredients: string[]
  steps: string[]
}

interface HistoryItemDetailsProps {
    recipeResult: RecipeResult;
}

export default function HistoryItemDetails({ recipeResult }: HistoryItemDetailsProps) {
    return (
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-2">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Bahan-bahan:</h4>
                    <ul className="space-y-2">
                    {(recipeResult?.ingredients || []).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                            <span className="text-blue-500 mr-2">✓</span>
                            {item}
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="md:col-span-3">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Langkah-langkah:</h4>
                    <ol className="space-y-4">
                    {(recipeResult?.steps || []).map((step: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm mr-4 mt-1">{idx + 1}</div>
                            <p className="flex-1 text-gray-700 dark:text-gray-300">{step}</p>
                        </li>
                    ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}
