import { LocationSearch } from "./Components/LocationSearch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <div className="flex justify-between items-center bg-gray-300 py-4 px-8">
        <h3 className="bold text-white">Hyojin Kim</h3>
        <h1 className="text-3xl bold text-white">Weather App</h1>
        <button>About PM Accelerator</button>
      </div>

      <QueryClientProvider client={queryClient}>
        <LocationSearch />
      </QueryClientProvider>
    </>
  );
}
