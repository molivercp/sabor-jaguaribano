import { ProductCard } from "./ProductCard";
import { useSearch } from "@/contexts/SearchContext";
import { useProducts } from "@/hooks/useProducts";
import { useMemo } from "react";
import { Loader2 } from "lucide-react";

export function BestSellers() {
  const { searchTerm } = useSearch();
  const { products, isLoading } = useProducts();

  const bestSellers = useMemo(
    () =>
      products
        .filter((p) => p.available !== false && p.best_seller === true)
        .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 3) // Limitar a 3 produtos
        .map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description || undefined,
          price: p.price,
          category: p.category as 'queijo' | 'variados' | 'doces',
          weight: p.weight || undefined,
          image: p.image_url || undefined,
          available: p.available,
        })),
    [products, searchTerm]
  );

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (bestSellers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-4xl font-bold text-secondary">
            Mais Vendidos
          </h2>
          <p className="text-lg text-muted-foreground">
            Os favoritos dos nossos clientes
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
