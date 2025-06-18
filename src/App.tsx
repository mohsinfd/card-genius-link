
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CardDataProvider } from "./contexts/CardDataContext";
import { CollectionProvider } from "./contexts/CollectionContext";
import { FilterProvider } from "./contexts/FilterContext";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import Index from "./pages/Index";
import Cards from "./pages/Cards";
import CardDetail from "./pages/CardDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CardDataProvider>
        <CollectionProvider>
          <FilterProvider>
            <BrowserRouter>
              <div className="w-full">
                <TopNav />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/cards" element={<Cards />} />
                  <Route path="/cards/:id" element={<CardDetail />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <BottomNav />
              </div>
            </BrowserRouter>
          </FilterProvider>
        </CollectionProvider>
      </CardDataProvider>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
