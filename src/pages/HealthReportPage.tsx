import { useState } from "react";
import { ChevronLeft, Upload, FileText, Check, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { accessToken, BASE_URL } from "@/App";
import { Button } from "@/components/ui/button";
import { RupeeSymbol } from "@/utils/utility";

interface SuggestedItem {
  name: string;
  id: string;
  category: string;
  nutrient: string;
}

interface MatchingProduct {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  nutrient: string;
}

interface HealthReportResponse {
  extracted_text_preview: string;
  suggested_items: SuggestedItem[];
  matching_products: MatchingProduct[];
}

const HealthReportPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [response, setResponse] = useState<HealthReportResponse | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF file",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${BASE_URL}/api/health-recommendations/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze health report");
      }

      const data = await response.json();
      setResponse(data);
      toast({
        title: "Report Analyzed",
        description: "We've analyzed your health report and found some recommendations",
      });
    } catch (error) {
      console.error("Error uploading health report:", error);
      toast({
        title: "Error",
        description: "Failed to analyze health report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-(--bg-neutral) pb-[12vh]">
      <div className="flex items-center border-b border-gray-100 p-4">
        <ChevronLeft
          className="cursor-pointer text-gray-700"
          onClick={() => navigate(-1)}
        />
        <h1 className="flex-grow text-center text-xl font-bold">Health Report Analysis</h1>
        <div className="w-6"></div>
      </div>

      <div className="flex-grow p-4">
        {!response ? (
          <div className="mb-8">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold">Upload Health Report</h2>
              <p className="mb-6 text-sm text-gray-600">
                Upload your health report PDF to get personalized product recommendations based on your nutritional needs.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <div 
                    className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 ${
                      file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {file ? (
                      <>
                        <FileText size={48} className="mb-2 text-green-500" />
                        <p className="font-medium text-green-700">{file.name}</p>
                        <p className="mt-1 text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        <div className="mt-4 flex space-x-2">
                          <Button 
                            type="button" 
                            variant="outline"
                            size="sm"
                            onClick={() => setFile(null)}
                          >
                            Remove
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload size={48} className="mb-2 text-gray-400" />
                        <p className="mb-2 font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF (max. 10MB)</p>
                        <input
                          type="file"
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          accept=".pdf"
                          onChange={handleFileChange}
                        />
                      </>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full bg-green-700 py-3 font-medium text-white"
                  disabled={!file || isUploading}
                >
                  {isUploading ? "Analyzing..." : "Analyze Report"}
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-lg font-bold">Report Summary</h2>
              <p className="whitespace-pre-line text-sm text-gray-700">
                {response.extracted_text_preview}
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold">Nutritional Needs</h2>
              
              <div className="space-y-3">
                {response.suggested_items.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-start rounded-lg border border-gray-100 bg-gray-50 p-3"
                  >
                    <div className="mr-3 rounded-full bg-green-100 p-2">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Category: {item.category} | Rich in {item.nutrient}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold">Recommended Products</h2>
              
              {response.matching_products.length > 0 ? (
                <div className="space-y-4">
                  {response.matching_products.map((product) => (
                    <div 
                      key={product.id}
                      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                    >
                      <div className="flex items-center p-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-green-100">
                          <FileText className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium">{product.name}</h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-800">{product.category}</span>
                            <span className="mx-2">•</span>
                            <span>Rich in {product.nutrient}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-700">
                            {RupeeSymbol}{product.price}
                          </p>
                          <p className="text-xs text-gray-500">{product.stock} in stock</p>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 bg-gray-50 p-3">
                        <Button 
                          className="w-full rounded-full bg-green-700 text-sm font-medium text-white"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          View Product
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center">
                  <AlertTriangle className="mb-3 h-12 w-12 text-amber-400" />
                  <p className="text-gray-600">No matching products found</p>
                </div>
              )}
            </div>

            <Button
              className="w-full rounded-full bg-green-700 py-3 font-medium text-white"
              onClick={() => setResponse(null)}
            >
              Upload Another Report
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthReportPage;