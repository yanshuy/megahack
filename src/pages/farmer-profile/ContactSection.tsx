"use client"

import { Phone, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Farmer } from "../farmer-products/page"

interface ContactSectionProps {
  farmer: Farmer
}

export const ContactSection = ({ farmer }: ContactSectionProps) => {
  const handleStartChat = () => {
    // Implement chat functionality
    console.log("Starting chat with farmer:", farmer.id)
  }

  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-800 dark:text-green-200">Contact Information</h2>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-green-700 dark:text-green-300" />
          <span className="text-green-800 dark:text-green-200">{farmer.contactNumber}</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-green-700 dark:text-green-300" />
          <span className="text-green-800 dark:text-green-200">{farmer.email}</span>
        </div>
      </div>

      <Button onClick={handleStartChat} className="w-full bg-green-700 text-white hover:bg-green-800 dark:bg-green-600 dark:text-white dark:hover:bg-green-700">
        <MessageCircle className="w-5 h-5 mr-2" />
        Chat with Farmer
      </Button>
    </div>
  )
}