import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar, Footer } from "./components";
import { HomeHub } from "./pages/HomeHub";
import { PortfolioDemo } from "./demos/portfolio/PortfolioDemo";
import { EcommerceDemo } from "./demos/ecommerce/EcommerceDemo";
import { RestaurantDemo } from "./demos/restaurant/RestaurantDemo";
import { BusinessDemo } from "./demos/business/BusinessDemo";
import { BlogDemo } from "./demos/blog/BlogDemo";
import { BookingDemo } from "./demos/booking/BookingDemo";
import { SocialDemo } from "./demos/social/SocialDemo";
import { ChatDemo } from "./demos/chat/ChatDemo";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#0c0c0e] text-[#fafafa]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomeHub />} />
              <Route path="/demos/portfolio" element={<PortfolioDemo />} />
              <Route path="/demos/ecommerce" element={<EcommerceDemo />} />
              <Route path="/demos/restaurant" element={<RestaurantDemo />} />
              <Route path="/demos/business" element={<BusinessDemo />} />
              <Route path="/demos/blog" element={<BlogDemo />} />
              <Route path="/demos/booking" element={<BookingDemo />} />
              <Route path="/demos/social" element={<SocialDemo />} />
              <Route path="/demos/chat" element={<ChatDemo />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
