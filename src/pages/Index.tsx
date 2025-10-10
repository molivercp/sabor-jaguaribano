import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <ProductSection />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
