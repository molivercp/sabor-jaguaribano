import { MapPin, Phone, Instagram } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-[500px] w-full">
        <img
          src={heroBanner}
          alt="Produtos regionais do Ceará"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/60" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl animate-fade-in">
              <h1 className="mb-4 text-5xl font-bold text-secondary-foreground md:text-6xl lg:text-7xl">
                Sabor Jaguaribano
              </h1>
              <p className="mb-6 text-xl text-secondary-foreground/90 md:text-2xl">
                O melhor do sertão nordestino!
              </p>
              <p className="mb-8 text-lg text-secondary-foreground/80 max-w-xl">
                Produtos regionais do Ceará com qualidade e tradição. Queijos artesanais, 
                mel puro, castanhas, doces caseiros e muito mais!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-background border-b py-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-4 text-foreground sm:flex-row sm:justify-center">
            <a
              href="https://instagram.com/saborjaguaribano"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span>@saborjaguaribano</span>
            </a>
            <span className="hidden sm:inline text-muted-foreground">|</span>
            <a
              href="tel:+5585998627951"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>(85) 99862-7951</span>
            </a>
            <span className="hidden sm:inline text-muted-foreground">|</span>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">Fortaleza - CE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
