import { CartProvider } from "@/contexts/CartContext";
import { SEO } from "@/components/SEO";
import { PromoBanner } from "@/components/PromoBanner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { BestSellers } from "@/components/BestSellers";
import { ProductSection } from "@/components/ProductSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Sabor Jaguaribano",
    "description": "Produtos regionais artesanais do Ceará: queijo coalho, mel puro, castanhas, doces caseiros",
    "url": "https://lovable.app",
    "telephone": "+5585998627951",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Fortaleza",
      "addressRegion": "CE",
      "addressCountry": "BR"
    },
    "openingHours": "Tu,Th",
    "paymentAccepted": ["Dinheiro", "PIX", "Cartão"],
    "priceRange": "$$"
  };

  return (
    <CartProvider>
      <SEO
        title="Sabor Jaguaribano - Queijo Coalho Artesanal e Produtos Regionais do Ceará"
        description="Compre os melhores produtos regionais do Ceará: queijo coalho artesanal, queijo de manteiga, mel puro, castanhas caramelizadas, manteiga da terra e doces caseiros. Entrega em Fortaleza terças e quintas. Frete grátis acima de R$ 100."
        keywords="queijo coalho, queijo de manteiga, mel puro, castanha caramelizada, manteiga da terra, doce de leite, produtos regionais ceará, produtos artesanais fortaleza, queijo artesanal, comida nordestina, sabor jaguaribano"
        structuredData={structuredData}
      />
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
