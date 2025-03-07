import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatModalProps {
  farmerName: string;
  onClose: () => void;
}

interface Message {
  sender: "farmer" | "user";
  text: string;
}

export default function ChatModal({ farmerName, onClose }: ChatModalProps) {
  const messages: Message[] = [
    { sender: "farmer", text: "Hello! How can I help you today?" },
    {
      sender: "user",
      text: `Hi ${farmerName}, I'm interested in your Alphonso mangoes. Are they organic?`,
    },
    {
      sender: "farmer",
      text: "Yes, absolutely! Our mangoes are cultivated using organic farming practices. We use only natural fertilizers and pest control methods.",
    },
    { sender: "farmer", text: "Hello! How can I help you today?" },
    {
      sender: "user",
      text: `Hi ${farmerName}, I'm interested in your Alphonso mangoes. Are they organic?`,
    },
    {
      sender: "farmer",
      text: "Yes, absolutely! Our mangoes are cultivated using organic farming practices. We use only natural fertilizers and pest control methods.",
    },
    { sender: "farmer", text: "Hello! How can I help you today?" },
    {
      sender: "user",
      text: `Hi ${farmerName}, I'm interested in your Alphonso mangoes. Are they organic?`,
    },
    {
      sender: "farmer",
      text: "Yes, absolutely! Our mangoes are cultivated using organic farming practices. We use only natural fertilizers and pest control methods.",
    },
    { sender: "farmer", text: "Hello! How can I help you today?" },
    {
      sender: "user",
      text: `Hi ${farmerName}, I'm interested in your Alphonso mangoes. Are they organic?`,
    },
    {
      sender: "farmer",
      text: "Yes, absolutely! Our mangoes are cultivated using organic farming practices. We use only natural fertilizers and pest control methods.",
    },
    { sender: "farmer", text: "Hello! How can I help you today?" },
    {
      sender: "user",
      text: `Hi ${farmerName}, I'm interested in your Alphonso mangoes. Are they organic?`,
    },
    {
      sender: "farmer",
      text: "Yes, absolutely! Our mangoes are cultivated using organic farming practices. We use only natural fertilizers and pest control methods.",
    },
  ];

  return (
    <div className="bg-opacity-50 fixed inset-0 isolate z-[100] flex items-center justify-center bg-black">
      <div className="flex h-full w-full max-w-md flex-col bg-white">
        <div className="fixed top-0 flex h-16 w-full items-center justify-between border-b bg-white px-4">
          <h3 className="text-lg font-semibold">Chat with {farmerName}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="my-16 h-[calc(100vh-144px)] flex-grow overflow-y-auto p-4">
          {/* Chat messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.sender === "user" ? "ml-auto" : ""}`}
            >
              <p className="font-medium text-gray-700">
                {message.sender === "user" ? "You" : farmerName}
              </p>
              <p
                className={`rounded-lg p-2 text-gray-600 ${
                  message.sender === "user" ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                {message.text}
              </p>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 h-18 w-full border-t bg-white px-4">
          <div className="mt-3.5 flex">
            <Input
              className="mr-2 flex-grow px-3 py-5 text-lg focus:ring-green-100"
              placeholder="Type your message..."
            />
            <Button className="bg-green-700 px-3 py-5">Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
