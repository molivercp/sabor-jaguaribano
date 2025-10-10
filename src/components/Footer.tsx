import { MapPin, Phone, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-secondary py-12 text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold">Sabor Jaguaribano</h3>
            <p className="text-sm opacity-90">
              Produtos regionais do Ceará com qualidade e tradição desde sempre.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Contato</h4>
            <div className="space-y-2 text-sm">
              <a
                href="tel:+5585998627951"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Phone className="h-4 w-4" />
                (85) 99862-7951
              </a>
              <a
                href="https://instagram.com/saborjaguaribano"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Instagram className="h-4 w-4" />
                @saborjaguaribano
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Localização</h4>
            <a
              href="https://maps.google.com/?q=R.+Gonçalves+Lêdo,+491+-+Praia+de+Iracema,+Fortaleza+-+CE"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-sm hover:opacity-80 transition-opacity"
            >
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>
                R. Gonçalves Lêdo, 491<br />
                Praia de Iracema<br />
                Fortaleza - CE, 60110-261
              </span>
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-secondary-foreground/20 pt-8 text-center text-sm opacity-75">
          <p>© 2025 Sabor Jaguaribano. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
