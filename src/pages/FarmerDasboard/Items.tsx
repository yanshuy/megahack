"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Trash2, Edit, Eye } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { accessToken, BASE_URL } from "@/App"

interface Product {
  id: number
  name: string
  description: string
  price: string
  unit: string
  images: string[]
  certifications: string[]
  category: string
  stock: number
}

interface ProductCardProps {
  product: Product
  onDelete: (id: number) => void
}

function ProductCard({ product, onDelete }: ProductCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)


  const handleDelete = () => {
    setIsDeleting(true)
    onDelete(product.id)
    setTimeout(() => setIsDeleting(false), 300)
  }

  const truncateDescription = (text: string, maxLength = 120) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  return (
    <Card className={`overflow-hidden pb-6 transition-all duration-300 ${isDeleting ? "scale-95 opacity-50" : ""}`}>
      <div className="relative">
        <div className="aspect-video w-full relative bg-muted">
          <img
            src={product.images[0] || "/placeholder.svg?height=400&width=600"}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-2 right-2 flex gap-1">
          {product.stock === 0 && (
            <Badge variant="destructive" className="font-medium">
              Out of Stock
            </Badge>
          )}
          <Badge variant="secondary" className="font-medium">
            {product.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
         
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-3">{truncateDescription(product.description)}</p>

        <div className="flex flex-wrap gap-1 mt-2">
          {product.certifications.map((cert) => (
            <Badge key={cert} variant="outline" className="text-xs">
              {cert}
            </Badge>
          ))}
        </div>
      </CardContent>
       <div className="text-right flex flex-col items-start pl-7">
            <p className="font-bold text-lg">₹{product.price}</p>
            <p className="text-xs text-muted-foreground">per {product.unit}</p>
          </div>

      <CardFooter className="flex justify-between pt-2 border-t">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          
        </div>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function Items() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Alphonso Mangoes",
      description:
        "Experience the king of mangoes! Our Alphonso mangoes are grown in the sun-drenched orchards of Ratnagiri, Maharashtra, using time-honored techniques passed down through generations.",
      price: "1200.00",
      unit: "1 dozen",
      images: [
        "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
        "https://placehold.co/600x400?text=Alphonso+Mangoes+2",
        "https://placehold.co/600x400?text=Alphonso+Mangoes+3",
      ],
      certifications: ["FSSAI", "India Organic"],
      category: "Fruits",
      stock: 0,
    },
  ])

  const fetchData = async ()=>{
    
     const response = await fetch(`${BASE_URL}/api/products/my`, {
         method: "GET",
         headers: {
             'Authorization': `Bearer ${accessToken}`,
             'ngrok-skip-browser-warning': 'true'  
         }
     });

     const data = await response.json()

     console.log(data);
     setProducts(data)
     

    }


    useEffect(() => {
      fetchData()
    }, []);
    

  const [productToDelete, setProductToDelete] = useState<number | null>(null)

  const handleDeleteIntent = (id: number) => {
    setProductToDelete(id)
  }

  const confirmDelete = () => {
    if (productToDelete !== null) {
      setProducts(products.filter((product) => product.id !== productToDelete))
      setProductToDelete(null)
    }
  }



  return (
    <div className="pt-6">
        <h1 className="pl-4 mb-4 text-3xl font-semibold">My Items</h1>
      <div className="wrappwr px-4">

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={handleDeleteIntent} />
        ))}
      </div>
      </div>

      <AlertDialog open={productToDelete !== null} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}