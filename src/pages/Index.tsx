import { CartProvider } from "@/contexts/CartContext";
import { PromoBanner } from "@/components/PromoBanner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
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
          <ProductSection />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
