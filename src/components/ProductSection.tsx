import { categoryNames } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { useSearch } from "@/contexts/SearchContext";
import { useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

export function ProductSection() {
  const categories = ["queijo", "variados", "doces"] as const;
  const { searchTerm } = useSearch();
  const { products, isLoading } = useProducts();

  const allFilteredProducts = useMemo(
    () =>
      products
        .filter((p) => p.available !== false)
        .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
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

  const hasAnyProduct = allFilteredProducts.length > 0;

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (searchTerm && !hasAnyProduct) {
    return (
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold text-muted-foreground">
            Nenhum produto encontrado para "{searchTerm}"
          </h2>
          <p className="text-muted-foreground mt-2">
            Tente buscar por outro termo.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16" id="produtos" aria-labelledby="products-heading">
      <div className="container mx-auto">
        <h2 id="products-heading" className="sr-only">Nossos Produtos</h2>
        {categories.map((category) => {
          const categoryProducts = allFilteredProducts.filter((p) => p.category === category);

          if (categoryProducts.length === 0) {
            return null;
          }

          return (
            <div key={category} className="mb-16" id={category.toString()}>
              <h3 className="mb-8 text-center text-4xl font-bold text-secondary">
                {categoryNames[category]}
              </h3>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" role="list">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
