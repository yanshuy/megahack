import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OnboardingScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full min-h-screen flex-col bg-(--bg-neutral)">
      <div className="flex items-center p-4">
        <ChevronLeft className="text-gray-700" />
        <div className="flex-grow"></div>
        <button className="font-medium text-green-600">Skip</button>
      </div>

      <div className="flex flex-grow flex-col items-center px-6 pt-16">
        <h1 className="mb-2 text-center text-3xl font-semibold">
          Let's Get Started On Your Journey
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Tell us who you are, so we can tailor your Farmers Market experience.
        </p>

        <div className="mt-4 grid w-full grid-cols-2 gap-4">
          <button className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-3 py-6 shadow-[0px_0px_1px_1px] shadow-gray-200 outline-offset-2 focus:outline-2 focus:outline-green-700">
            <div className="mb-3 flex size-[5.5rem] items-center justify-center rounded-full bg-yellow-500">
              {/* <img
                src="/placeholder.svg?height=80&width=80"
                alt="Farmer icon"
                className="h-16 w-16"
              /> */}
            </div>
            <h3 className="mb-1.5 font-semibold">I'm A Farmer</h3>
            <p className="text-center text-xs leading-[1.5] text-gray-500">
              For those who grow the goodness.
            </p>
          </button>

          <button className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-3 py-6 shadow-[0px_0px_1px_1px] shadow-gray-200 outline-offset-2 focus:outline-2 focus:outline-green-700">
            <div className="mb-3 flex size-[5.5rem] items-center justify-center rounded-full bg-yellow-300">
              {/* <img
                src="/placeholder.svg?height=80&width=80"
                alt="Farmer icon"
                className="h-16 w-16"
              /> */}
            </div>
            <h3 className="mb-1.5 font-semibold">I'm A Foodie</h3>
            <p className="text-center text-xs leading-[1.5] text-gray-500">
              For those who savor the goodness.
            </p>
          </button>
        </div>
      </div>

      <div className="p-6 pb-10">
        <button
          className="w-full rounded-full bg-green-700 py-3 font-medium text-white"
          onClick={() => navigate("/marketplace")}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
