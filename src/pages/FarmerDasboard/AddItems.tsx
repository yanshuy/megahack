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
    name: "",
    description: "",
    price: null,
    unit: "",
    certifications: [],
    category: "",
    availableQuantities: [],
  });

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [newCertification, setNewCertification] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

 


  
 const [speech, setSpeech] = useState(''); 
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span className="block text-center text-red-500 font-medium">Your browser does not support speech recognition.</span>;
    }

    const handleCopyText = () => {
        navigator.clipboard.writeText(transcript).then(() => {
            alert('Text copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

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


   const fetchGeminiData = async ()=>{
    console.log("loading....");
    
    const geminiApiKey = import.meta.env.VITE_GEMINI_KEY as string || '';
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,{
      
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
     "contents": [
  {
    "parts": [
      {
        "text": `Extract relevant details from the given voice message transcript and return a JSON object. Use the following JSON structure as a reference:\n\n{\n  \"name\": \"string\",\n  \"description\": \"string\",\n  \"price\": number,\n  \"unit\": \"string\",\n  \"certifications\": [\"array\"],\n  \"category\": \"string\",\n  \"availableQuantities\": [\"array\"]\n}\n\nExtract only the details explicitly mentioned in the transcript. Do not assume any values. If a field is not mentioned, keep the key but assign it an appropriate empty value: \n- For strings, use an empty string \"\".\n- For numbers, use 0.\n- For arrays, use an empty array [].\n\nIf a field is present in the transcript and a change is requested, update it accordingly. However, if a field is present but no change is requested, retain its original value. Additionally, if existing information in the transcript can help determine the value of another field, use that information intelligently.\n\nEnsure that the description is expanded naturally to make it more detailed and engaging. All extracted details must be formatted in proper English, even if they were originally in Hindi or Hinglish.\n\nVoice Message Transcript: ${transcript}\n\nOnly return the JSON output. Do not include any additional text, explanations, or formatting. ALSO GIVE CATEGORY,UNIT AT ANY COST ALSO CERTIFICATE IF POSSIBLE  ,I WANT FIELDS VALUE IN ENGLISH EVEN IF THE VOICE MESSAGE IS IN HINDI/HINGLISH CONVERT IT TO ENGLISH AT ANY COST`
      }
    ]
  }
]




    })
    })

    const data = await response.json()
    const json = data["candidates"][0]["content"]["parts"][0]["text"]
    let slicedJsonString = json.slice(7, -3); 
    let jsonObject = JSON.parse(slicedJsonString); 
    setProduct(jsonObject);
  }




  
  

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="fixed bottom-4 cursor-pointer rounded-3xl right-4 flex flex-col items-center justify-center">
        <div onClick={() => setIsOpen(true)} className="bg-slate-950 w-12 p-3 rounded-3xl">
          <Mic className="text-white"/>
        </div> 
        <p className="text-center">Smart Fill</p>
      </div>

      <Dialog  open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
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
         <div className=" mx-auto my-10 p-8 bg-white rounded-xl shadow-lg">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Smart Auto Fill</h2>
            </div>

            <div 
                className="min-h-48 p-5 bg-gray-50 rounded-lg border border-gray-200 mb-8 cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-300"
                onClick={handleCopyText}
            >
                {transcript ? (
                    <p className="text-gray-800">{transcript}</p>
                ) : (
                    <p className="text-gray-400 text-center italic">Your speech will appear here. Speak in Hindi or English</p>
                )}
            </div>

            <div className="flex justify-center gap-5">
                <button 
                    className="flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-full transition-all hover:bg-green-600 hover:shadow-md hover:-translate-y-1"
                    onClick={startListening}
                >
                    <span className="mr-2">🎤</span>
                    Start Listening
                </button>
                <button 
                    className="flex items-center px-6 py-3 bg-red-500 text-white font-semibold rounded-full transition-all hover:bg-red-600 hover:shadow-md hover:-translate-y-1"
                    onClick={SpeechRecognition.stopListening}
                >
                    <span className="mr-2">⏹️</span>
                    Stop Listening
                </button>
                <button 
                    className="flex items-center px-6 py-3 bg-red-500 text-white font-semibold rounded-full transition-all hover:bg-red-600 hover:shadow-md hover:-translate-y-1"
                    onClick={()=>{fetchGeminiData(), setIsOpen(false)}}
                >
                    <span className="mr-2">⏹️</span>
                    Submit
                </button>
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