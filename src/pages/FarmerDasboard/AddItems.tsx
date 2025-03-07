import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Upload, FileVideo, Image, Trash2, Mic, Send, MicOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AddItems = () => {
  const [product, setProduct] = useState({
    name: "Alphonso Mangoes",
    description: "Experience the king of mangoes! Our Alphonso mangoes are grown in the sun-drenched orchards of Ratnagiri, Maharashtra, using time-honored techniques passed down through generations. These mangoes are known for their exquisite sweetness, rich aroma, and unparalleled flavor. Each bite is a burst of sunshine, perfect for enjoying fresh or using in your favorite desserts and smoothies.",
    price: 1200,
    unit: "1 dozen",
    certifications: ["FSSAI", "India Organic"],
    category: "Fruits",
    availableQuantities: ["1 dozen", "2 dozen", "5 kg"],
  });

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [newCertification, setNewCertification] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript) {
      setProduct(prevProduct => ({
        ...prevProduct,
        description: transcript
      }));
    }
  }, [listening, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  const toggleSpeaking = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsSpeaking(!isSpeaking);
  };
  
  const videoInputRef = useRef(null)
  const imageInputRef  = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('productData', JSON.stringify(product));
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });
      if (video) {
        formData.append('video', video);
      }
      
      console.log("Product data:", product);
      console.log("Images:", images);
      console.log("Video:", video);
      
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="fixed bottom-4 cursor-pointer rounded-3xl right-4 flex flex-col items-center justify-center">
        <div onClick={() => setIsOpen(true)} className="bg-slate-950 w-12 p-3 rounded-3xl">
          <Mic className="text-white"/>
        </div> 
        <p className="text-center">Smart Fill</p>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Voice Input
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              value={transcript}
              onChange={(e) => setProduct(prevProduct => ({
                ...prevProduct,
                description: e.target.value
              }))}
              placeholder="Speak or type your message here..."
              className="min-h-32 resize-none"
            />
            
            <div className="flex items-center justify-between gap-2">
              <div>
                {!listening ? (
                  <Button
                    onClick={toggleSpeaking}
                    variant="outline"
                    className="gap-2"
                  >
                    <Mic size={16} />
                    Start Speaking
                  </Button>
                ) : (
                  <Button
                    onClick={toggleSpeaking}
                    variant="destructive"
                    className="gap-2"
                  >
                    <MicOff size={16} />
                    Stop Speaking
                  </Button>
                )}
              </div>
              
              <Button
                onClick={() => {
                  setProduct(prevProduct => ({
                    ...prevProduct,
                    description: transcript
                  }));
                  setIsOpen(false);
                }}
                disabled={!transcript.trim()}
                className="gap-2"
              >
                <Send size={16} />
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <form onSubmit={handleSubmit} className="p-4">
        <Card className="shadow-lg max-w-7xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <CardTitle className="text-2xl font-bold text-green-800">Product Information</CardTitle>
            <CardDescription>Enter the details for your product listing</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-6">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-lg font-medium">Basic Information</h3>
              </div>
              
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={product.price}
                      onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      name="unit"
                      value={product.unit}
                      onChange={(e) => setProduct({ ...product, unit: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Certifications Section */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Certifications</h3>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {product.certifications.map((cert, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {cert}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedCertifications = [...product.certifications];
                        updatedCertifications.splice(index, 1);
                        setProduct({ ...product, certifications: updatedCertifications });
                      }}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add certification"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                />
                <Button type="button" size="sm" onClick={() => {
                  if (newCertification.trim()) {
                    setProduct({
                      ...product,
                      certifications: [...product.certifications, newCertification.trim()]
                    });
                    setNewCertification("");
                  }
                }}>
                  <Plus size={18} />
                </Button>
              </div>
            </div>

            {/* Available Quantities Section */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Available Quantities</h3>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {product.availableQuantities.map((qty, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {qty}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedQuantities = [...product.availableQuantities];
                        updatedQuantities.splice(index, 1);
                        setProduct({ ...product, availableQuantities: updatedQuantities });
                      }}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add quantity option"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                />
                <Button type="button" size="sm" onClick={() => {
                  if (newQuantity.trim()) {
                    setProduct({
                      ...product,
                      availableQuantities: [...product.availableQuantities, newQuantity.trim()]
                    });
                    setNewQuantity("");
                  }
                }}>
                  <Plus size={18} />
                </Button>
              </div>
            </div>

            {/* Media Section */}
            <div className="space-y-6 pt-4 border-t">
              <h3 className="text-lg font-medium">Product Media</h3>
              
              {/* Video Upload */}
              <div className="space-y-2">
                <Label>Product Video</Label>
                <input 
                  type="file" 
                  accept="video/*" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setVideo(e.target.files[0]);
                    }
                  }} 
                  ref={videoInputRef}
                  className="hidden"
                />
                
                {video ? (
                  <div className="p-4 border rounded bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileVideo className="text-blue-500" />
                        <div>
                          <p className="font-medium">{video.name}</p>
                          <p className="text-sm text-gray-500">{(video.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setVideo(null)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-24 border-dashed flex flex-col items-center justify-center space-y-2"
                    onClick={() => videoInputRef.current.click()}
                  >
                    <Upload size={24} />
                    <span>Upload product video</span>
                  </Button>
                )}
              </div>
              
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Product Images</Label>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={(e) => {
                    if (e.target.files) {
                      const newFiles = Array.from(e.target.files);
                      setImages(prevImages => [...prevImages, ...newFiles]);
                    }
                  }} 
                  ref={imageInputRef}
                  className="hidden"
                />
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-24 border-dashed flex flex-col items-center justify-center space-y-2"
                  onClick={() => imageInputRef.current.click()}
                >
                  <Image size={24} />
                  <span>Add product images</span>
                </Button>
                
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded border flex items-center justify-center overflow-hidden">
                          <img 
                            src={URL.createObjectURL(image)} 
                            alt={`Product image ${index + 1}`} 
                            className="object-cover w-full h-full" 
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updatedImages = [...images];
                            updatedImages.splice(index, 1);
                            setImages(updatedImages);
                          }}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100"
                        >
                          <X size={16} className="text-red-500" />
                        </button>
                        <p className="text-xs truncate mt-1">{image.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 flex ml-3 gap-2 border-t p-4">
            <Button type="button" variant="outline">Cancel</Button>
            <Button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Product"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AddItems;