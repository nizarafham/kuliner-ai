'use client'

import HistoryItemActions from './HistoryItemActions'
import HistoryItemDetails from './HistoryItemDetails'
import type { History } from '@/types'

interface HistoryItemProps {
    history: History;
    isEditing: boolean;
    isExpanded: boolean;
    newName: string;
    setNewName: (name: string) => void;
    onToggleExpand: () => void;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
    onDelete: () => void;
}

export default function HistoryItem({ 
    history, isEditing, isExpanded, newName, setNewName, 
    onToggleExpand, onEdit, onSave, onCancel, onDelete 
}: HistoryItemProps) {
    return (
        <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-grow mb-4 sm:mb-0">
              {isEditing ? (
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-lg"
                    autoFocus
                />
              ) : (
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{history.recipe_name}</h3>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Bahan: {history.ingredient} | Daerah: {history.province}
              </p>
            </div>

            <HistoryItemActions 
                isEditing={isEditing}
                isExpanded={isExpanded}
                onEdit={onEdit}
                onDelete={onDelete}
                onSave={onSave}
                onCancel={onCancel}
                onToggleExpand={onToggleExpand}
            />
          </div>

          {isExpanded && (
            <HistoryItemDetails recipeResult={history.recipe_result} />
          )}
        </div>
    )
}
