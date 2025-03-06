"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

// Define item types
export type ItemType = "apple" | "banana" | "orange" | "carrot" | "broccoli"

export interface InventoryItem {
  id: string
  type: ItemType
  position: [number, number, number] // x, y, z
  rotation?: [number, number, number] // x, y, z
  scale?: number
}

interface InventoryContextType {
  items: InventoryItem[]
  addItem: (type: ItemType, shelfIndex: number) => void
  removeItem: (id: string) => void
  clearInventory: () => void
  updateItemPosition: (id: string, newPosition: [number, number, number]) => void
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined)

// Define shelf positions based on the actual rack model
// The main rack is at position [15.285, 5.164, 38.998] with rotation [-Math.PI / 2, 0, 0]
// We need to position items relative to this coordinate system
const shelfPositions = [
  [15.285, 3.5, 38.998], // Bottom shelf
  [15.285, 5.164, 38.998], // Middle shelf
  [15.285, 7.0, 38.998], // Top shelf
]

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<InventoryItem[]>([])

  const addItem = (type: ItemType, shelfIndex: number) => {
    const shelfPosition = shelfPositions[shelfIndex] || shelfPositions[0]

    // Calculate a random position on the shelf
    // Since the rack is rotated, we need to adjust our random positioning
    const randomX = Math.random() * 2 - 1 // -1 to 1
    const randomZ = Math.random() * 2 - 1 // -1 to 1

    const position: [number, number, number] = [
      shelfPosition[0] + randomX,
      shelfPosition[1],
      shelfPosition[2] + randomZ,
    ]

    // Random rotation for variety
    const rotation: [number, number, number] = [
      0,
      Math.random() * Math.PI * 2, // Random Y rotation
      0,
    ]

    // Random scale variation for realism, but keep it small to fit on shelves
    const scale = 0.5 + Math.random() * 0.3 // 0.5 to 0.8

    const newItem: InventoryItem = {
      id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      position,
      rotation,
      scale,
    }

    setItems((prevItems) => [...prevItems, newItem])
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const clearInventory = () => {
    setItems([])
  }

  const updateItemPosition = (id: string, newPosition: [number, number, number]) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, position: newPosition } : item)))
  }

  return (
    <InventoryContext.Provider value={{ items, addItem, removeItem, clearInventory, updateItemPosition }}>
      {children}
    </InventoryContext.Provider>
  )
}

export const useInventory = () => {
  const context = useContext(InventoryContext)
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider")
  }
  return context
}

