import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Loader2,
  MicOff,
  Navigation2Off,
  Navigation2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { accessToken, BASE_URL } from "@/App";

export function VoiceCommandButton() {
  const [isListening, setIsListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);

  const handleVoiceCommand = async () => {
    // If already listening, stop the recognition
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    // Check if browser supports speech recognition
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in your browser",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    toast({
      title: "Listening",
      description: "Speak your command, or tap again to cancel",
    });

    recognition.start();

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      setProcessing(true);

      toast({
        title: "Processing command",
        description: `"${transcript}"`,
      });

      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${BASE_URL}/api/navigation/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ command: transcript }),
        });

        if (!response.ok) {
          throw new Error("Failed to process voice command");
        }

        const data = await response.json();

        if (data.redirect_url) {
          // Extract the path from the full URL
          const url = new URL(data.redirect_url);
          const pathWithQuery = url.pathname + url.search + url.hash;

          navigate(pathWithQuery);
          toast({
            title: "Command executed",
            description: "Navigating to requested page",
          });
        } else {
          toast({
            title: "Command processed",
            description: data.message || "No specific action required",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to process your voice command",
          variant: "destructive",
        });
      } finally {
        setProcessing(false);
        recognitionRef.current = null;
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setProcessing(false);
      recognitionRef.current = null;

      // Don't show error toast if it was aborted by the user
      if (event.error !== "aborted") {
        toast({
          title: "Error",
          description: `Recognition error: ${event.error}`,
          variant: "destructive",
        });
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };
  };

  return (
    <Button
      onClick={handleVoiceCommand}
      disabled={processing}
      className={`z-50 size-full rounded-full p-0 ${
        isListening
          ? "bg-red-600 hover:bg-red-700"
          : "bg-green-700 hover:bg-green-800"
      }`}
      aria-label={isListening ? "Stop voice command" : "Start voice command"}
    >
      {isListening ? (
        <div className="animate-pulse">
          <Navigation2Off className="size-6" />
        </div>
      ) : processing ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <Navigation2 className="size-6" />
      )}
    </Button>
  );
}
