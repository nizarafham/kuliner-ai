'use client'

interface RecipeSearchFormProps {
    ingredient: string;
    setIngredient: (value: string) => void;
    province: string;
    setProvince: (value: string) => void;
    handleSearch: () => void;
    isLoading: boolean;
    provinces: string[];
}

const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export default function RecipeSearchForm({
    ingredient, setIngredient, province, setProvince, handleSearch, isLoading, provinces
}: RecipeSearchFormProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sulap Bahan Jadi Hidangan!</h2>
            <p className="text-gray-500 mb-6">Punya bahan apa di dapur? Yuk, kita cari inspirasi resep yang pas buatmu.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                    <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700 mb-1">Bahan Utama</label>
                    <input
                        id="ingredient"
                        type="text"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                        placeholder="Contoh: Ayam, Nasi, Telur"
                        className="w-full bg-gray-50 border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#d35a2f] focus:border-[#d35a2f] transition"
                    />
                </div>
                <div>
                    <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Khas Daerah (Opsional)</label>
                    <select
                        id="province"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full bg-gray-50 border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#d35a2f] focus:border-[#d35a2f] transition"
                    >
                        {provinces.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button
                onClick={handleSearch}
                disabled={isLoading || !ingredient}
                className="mt-6 w-full flex items-center justify-center bg-[#d35a2f] hover:bg-[#b94e29] text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
            >
                {isLoading ? <LoadingSpinner /> : 'Temukan Resep'}
            </button>
        </div>
    )
}
