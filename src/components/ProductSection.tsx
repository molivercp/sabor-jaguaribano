import { products, categoryNames } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { useSearch } from "@/contexts/SearchContext";
import { useMemo } from "react";

export function ProductSection() {
  const categories = ["queijo", "variados", "doces"] as const;
  const { searchTerm } = useSearch();

  const allFilteredProducts = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const hasAnyProduct = allFilteredProducts.length > 0;

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
    <section className="py-16">
      <div className="container mx-auto">
        {categories.map((category) => {
          const categoryProducts = allFilteredProducts.filter((p) => p.category === category);

          if (categoryProducts.length === 0) {
            return null;
          }

          return (
            <div key={category} className="mb-16" id={category.toString()}>
              <h2 className="mb-8 text-center text-4xl font-bold text-secondary">
                {categoryNames[category]}
              </h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
