import { CartProvider } from "@/contexts/CartContext";
import { PromoBanner } from "@/components/PromoBanner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { BestSellers } from "@/components/BestSellers";
import { ProductSection } from "@/components/ProductSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <PromoBanner />
        <Header />
        <main className="flex-1">
          <Hero />
          <AboutSection />
          <BestSellers />
          <ProductSection />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
