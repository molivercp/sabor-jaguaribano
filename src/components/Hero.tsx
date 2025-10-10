import { MapPin, Phone, Instagram } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="animate-fade-in">
          <h1 className="mb-4 text-5xl font-bold text-secondary md:text-6xl lg:text-7xl">
            Sabor Jaguaribano
          </h1>
          <p className="mb-8 text-xl text-secondary/90 md:text-2xl">
            O melhor do sertão nordestino!
          </p>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-secondary/80">
            Produtos regionais do Ceará com qualidade e tradição. Queijos artesanais, 
            mel puro, castanhas, doces caseiros e muito mais!
          </p>
        </div>

        <div className="animate-slide-up flex flex-col items-center gap-4 text-secondary/90 sm:flex-row sm:justify-center">
          <a
            href="https://instagram.com/saborjaguaribano"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-secondary transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span>@saborjaguaribano</span>
          </a>
          <a
            href="tel:+5585998627951"
            className="flex items-center gap-2 hover:text-secondary transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>(85) 99862-7951</span>
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span className="text-sm">Fortaleza - CE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
