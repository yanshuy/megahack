"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, MapPin, User, Phone, Mail, Tractor, Star } from "lucide-react"

export default function FarmerProfile({ farmerId = 1 }) {
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    image: null,
    rating: 0,
    products: [],
    location: "",
    verificationBadges: [],
    currentMarketPlaceId: null,
    totalReviews: 0,
    description: "",
    contactNumber: "",
    email: "",
  })

  // Fetch farmer details on component mount
  useEffect(() => {
    const fetchFarmerDetails = async () => {
      setIsLoading(true)
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/farmers/${farmerId}`)
        if (!response.ok) throw new Error('Failed to fetch farmer details')
        
        const farmerData = await response.json()
        setFormData(farmerData)
      } catch (error) {
        console.error("Error fetching farmer details:", error)
        // You could set an error state here
      } finally {
        setIsLoading(false)
      }
    }

    fetchFarmerDetails()
  }, [farmerId])

  // For demo purposes - comment this out when using the real API
  useEffect(() => {
    // Simulate API response with sample data
    setTimeout(() => {
      setFormData({
        id: 1,
        name: "S. Anant",
        image: "https://images.unsplash.com/photo-1609252509102-aa73ff792667?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.9,
        products: ["Vegetables", "Fruits"],
        location: "Karnataka",
        verificationBadges: ["Free-range", "Local"],
        currentMarketPlaceId: 1,
        totalReviews: 128,
        description: "Passionate organic farmer with over 15 years of experience in sustainable farming. Specializing in seasonal vegetables and exotic fruits.",
        contactNumber: "+91 98765 43210",
        email: "anant.s@farmersmarket.com",
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProductChange = (product) => {
    setFormData((prev) => {
      const updatedProducts = prev.products.includes(product)
        ? prev.products.filter((p) => p !== product)
        : [...prev.products, product]

      return {
        ...prev,
        products: updatedProducts,
      }
    })
  }

  const handleBadgeChange = (badge) => {
    setFormData((prev) => {
      const updatedBadges = prev.verificationBadges.includes(badge)
        ? prev.verificationBadges.filter((b) => b !== badge)
        : [...prev.verificationBadges, badge]

      return {
        ...prev,
        verificationBadges: updatedBadges,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      // Replace with your actual API endpoint
      const response = await fetch(`/api/farmers/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) throw new Error('Failed to update profile')
      
      const updatedFarmer = await response.json()
      setFormData(updatedFarmer)
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <Card className="w-full mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl sm:text-2xl font-bold">Edit Farmer Profile</CardTitle>
          <CardDescription>Update your farmer profile information</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-6">
            {/* Profile Image and Rating */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-dashed border-muted-foreground/25">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="profile-image"
                    className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Label>
                  <Input
                    id="profile-image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        // In a real app, you would upload this to your server and get a URL back
                        const imageUrl = URL.createObjectURL(e.target.files[0])
                        setFormData((prev) => ({
                          ...prev,
                          image: imageUrl,
                        }))
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="space-y-4 flex flex-col justify-center">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">Rating: {formData.rating} ({formData.totalReviews} reviews)</span>
                </div>
                <div>
                  <Label htmlFor="currentMarketPlaceId">Current Marketplace ID</Label>
                  <Input
                    id="currentMarketPlaceId"
                    name="currentMarketPlaceId"
                    type="number"
                    value={formData.currentMarketPlaceId || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="mr-1 h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber" className="flex items-center">
                      <Phone className="mr-1 h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      placeholder="+91 98765 43210"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Tractor className="mr-2 h-5 w-5" />
                Farm Information
              </h3>
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="State or Region"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Products (select all that apply)</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-3 gap-y-2">
                  {[
                    "Vegetables",
                    "Fruits",
                    "Grains",
                    "Dairy",
                    "Meat",
                    "Poultry",
                    "Eggs",
                    "Honey",
                    "Herbs",
                    "Spices",
                    "Nuts",
                    "Other",
                  ].map((product) => (
                    <div key={product} className="flex items-center space-x-2">
                      <Checkbox
                        id={`product-${product.toLowerCase()}`}
                        checked={formData.products?.includes(product) || false}
                        onCheckedChange={() => handleProductChange(product)}
                      />
                      <Label htmlFor={`product-${product.toLowerCase()}`}>{product}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Verification Badges</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-3 gap-y-2">
                  {[
                    "Organic",
                    "Free-range",
                    "Local",
                    "Sustainable",
                    "Fair-trade",
                    "Pesticide-free",
                    "Non-GMO",
                    "Certified",
                  ].map((badge) => (
                    <div key={badge} className="flex items-center space-x-2">
                      <Checkbox
                        id={`badge-${badge.toLowerCase()}`}
                        checked={formData.verificationBadges?.includes(badge) || false}
                        onCheckedChange={() => handleBadgeChange(badge)}
                      />
                      <Label htmlFor={`badge-${badge.toLowerCase()}`}>{badge}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Farmer Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Tell customers about yourself and your farm..."
                className="min-h-[120px] w-full"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-3">
            <Button variant="outline" type="button" className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Update Profile
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}