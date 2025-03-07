"use client"

import { useInventory, type ItemType } from "@/context/InventoryContext"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export const InventoryControls = () => {
  const { addItem, clearInventory } = useInventory()
  const [selectedItem, setSelectedItem] = useState<ItemType>("apple")
  const [selectedShelf, setSelectedShelf] = useState<number>(0)
  const [selectedColumn, setSelectedColumn] = useState<number>(0)

  const handleAddItem = () => {
    addItem(selectedItem, selectedShelf, selectedColumn)
  }

  return (
    <div className="absolute bottom-4 left-4 p-4 bg-white/90 dark:bg-gray-900/90 rounded-lg shadow-lg flex flex-col gap-3 max-w-xs">
      <h3 className="text-lg font-semibold">Inventory Controls</h3>

      <div className="space-y-2">
        <label className="text-sm font-medium">Item Type</label>
        <Select value={selectedItem} onValueChange={(value) => setSelectedItem(value as ItemType)}>
          <SelectTrigger>
            <SelectValue placeholder="Select item" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="broccoli">Broccoli</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Shelf</label>
        <Select value={selectedShelf.toString()} onValueChange={(value) => setSelectedShelf(Number.parseInt(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Select shelf" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Bottom Shelf</SelectItem>
            <SelectItem value="1">Middle Shelf</SelectItem>
            <SelectItem value="2">Top Shelf</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Column</label>
        <Select value={selectedColumn.toString()} onValueChange={(value) => setSelectedColumn(Number.parseInt(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Select column" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Left</SelectItem>
            <SelectItem value="1">Middle</SelectItem>
            <SelectItem value="2">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleAddItem} className="flex-1">
          Add Item
        </Button>
        <Button variant="destructive" onClick={clearInventory}>
          Clear All
        </Button>
      </div>
    </div>
  )
}
