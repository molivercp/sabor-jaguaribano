import { MapPin, Phone, Instagram } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-label="Banner principal">
      {/* Hero Image */}
      <div className="relative h-[500px] w-full">
        <img
          src={heroBanner}
          alt="Queijo coalho artesanal, mel puro e produtos regionais do Ceará - Sabor Jaguaribano"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
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
                mel puro, castanhas caramelizadas, doces caseiros e muito mais!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-background border-b py-4">
        <div className="container mx-auto">
          <address className="flex flex-col items-center gap-4 text-foreground sm:flex-row sm:justify-center not-italic">
            <a
              href="https://instagram.com/saborjaguaribano"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
              aria-label="Siga-nos no Instagram"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
              <span>@saborjaguaribano</span>
            </a>
            <span className="hidden sm:inline text-muted-foreground" aria-hidden="true">|</span>
            <a
              href="tel:+5585998627951"
              className="flex items-center gap-2 hover:text-primary transition-colors"
              aria-label="Ligar para Sabor Jaguaribano"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span>(85) 99862-7951</span>
            </a>
            <span className="hidden sm:inline text-muted-foreground" aria-hidden="true">|</span>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm">Fortaleza - CE</span>
            </div>
          </address>
        </div>
      </div>
    </section>
  );
}
